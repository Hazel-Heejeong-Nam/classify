import puppeteer from 'puppeteer'
import _ from 'lodash'
import { writeJsonFile } from 'write-json-file'
import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  async function scrapeClassData() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    let dep = req.query.dep
    dep = dep.replaceAll(' ', '+')
    console.log(dep)
    await page.goto(
      `https://registrar.ucla.edu/academics/course-descriptions?search=${dep}`
    )
    await page.waitForSelector('.course-descriptions-search', {
      visible: true,
    })
    await page.screenshot({ path: 'example.png', fullPage: true })
    let classes = await page.evaluate(() => {
      const course_blocks = document.querySelectorAll('div.course-record')
      let courses = {}
      for (const course of course_blocks) {
        const course_name = course
          .querySelector('h3')
          .innerText.trim()
          .replace('. ', ' - ')
        const units = course.getElementsByTagName('p')[0].innerText
        const desc = course.getElementsByTagName('p')[1].innerText

        courses[course_name] = {
          Units: parseFloat(units.substring(units.indexOf(':') + 2)),
          Description: desc,
        }
      }
      return courses
    })
    return classes
  }
  async function scrapeClasses() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`${req.query.link.replaceAll('*', '&')}`)
    let all_classes = {}
    let next_page = 2
    await page.evaluate(() =>
      document
        .querySelector(
          '#block-mainpagecontent > div > div > div > div > ucla-sa-soc-app'
        )
        .shadowRoot.querySelector('#expandAll')
        .click()
    )
    while (next_page <= parseInt(req.query.pages) + 1) {
      await page.waitForSelector('pierce/.class-title', {
        visible: true,
      })
      await page.evaluate(() =>
        document
          .querySelector(
            '#block-mainpagecontent > div > div > div > div > ucla-sa-soc-app'
          )
          .shadowRoot.querySelector('#expandAll')
          .click()
      )
      await page.waitForTimeout(4000)
      await page.screenshot({ path: 'example.png', fullPage: true })
      let classes = await page.evaluate(() => {
        const all_courses = document
          .querySelector(
            '#block-mainpagecontent > div > div > div > div > ucla-sa-soc-app'
          )
          .shadowRoot.querySelector('#resultsTitle')
        const course_blocks = all_courses.getElementsByClassName('class-title')
        let courses = {}
        for (let i = 0; i < course_blocks.length; ++i) {
          const course_name = course_blocks[i].getElementsByClassName('head')
          const course_lec_blocks = course_blocks[i].getElementsByClassName(
            'row-fluid data_row primary-row'
          )
          courses[course_name[0].innerText] = {}
          for (let j = 0; j < course_lec_blocks.length; ++j) {
            const course_days =
              course_lec_blocks[j].getElementsByClassName('dayColumn')
            const course_time =
              course_lec_blocks[j].getElementsByClassName('timeColumn')
            const course_units =
              course_lec_blocks[j].getElementsByClassName('unitsColumn')

            const course_lec_disc_blocks = course_lec_blocks[
              j
            ].getElementsByClassName('row-fluid data_row secondary-row')
            let discussions = {}
            for (let k = 0; k < course_lec_disc_blocks.length; ++k) {
              const disc_days =
                course_lec_disc_blocks[k].getElementsByClassName('dayColumn')
              const disc_time =
                course_lec_disc_blocks[k].getElementsByClassName('timeColumn')
              const disc_units =
                course_lec_disc_blocks[k].getElementsByClassName('unitsColumn')
              const disc_sect =
                course_lec_disc_blocks[k].getElementsByClassName(
                  'sectionColumn'
                )
              const index_of_time = disc_time[0].innerText
                .replaceAll('\n', '')
                .trim()
                .search(/\d/)
              discussions[
                `Discussion ${
                  disc_sect[0].innerText
                    .replaceAll('\n', '')
                    .replaceAll('\u21b5', '')
                    .trim() ?? 'undefined'
                }`
              ] = {
                // Units: disc_units[0].innerText,
                Time:
                  disc_time[0].innerText
                    .replaceAll('\n', '')
                    .trim()
                    .substring(index_of_time) ?? 'undefined',
                Days:
                  disc_days[0].innerText.replaceAll('\n', '').trim() ??
                  'undefined',
              }
            }
            const index_of_time = course_time[0].innerText
              .replaceAll('\n', '')
              .trim()
              .search(/\d/)
            courses[course_name[0].innerText][`Lecture ${j + 1}`] = {
              // Units: course_units[0].innerText,
              Time:
                course_time[0].innerText
                  .replaceAll('\n', '')
                  .trim()
                  .substring(index_of_time) ?? 'undefined',
              Days:
                course_days[0].innerText.replaceAll('\n', '').trim() ??
                'undefined',
              Discussions: discussions,
            }
          }
        }
        return courses
      })
      all_classes = { ...all_classes, ...classes }
      if (next_page === parseInt(req.query.pages) + 1) break
      await page.evaluate(
        (next_page) =>
          document
            .querySelector(
              '#block-mainpagecontent > div > div > div > div > ucla-sa-soc-app'
            )
            .shadowRoot.querySelector(
              `#divPagination > div:nth-child(2) > ul > li:nth-child(${next_page}) > button`
            )
            .click(),
        next_page
      )
      next_page++
    }

    await page.evaluate(() =>
      document
        .querySelector(
          '#block-mainpagecontent > div > div > div > div > ucla-sa-soc-app'
        )
        .shadowRoot.querySelector('#expandAll')
        .click()
    )

    return all_classes
  }

  let item = await scrapeClasses()
  let coocoo = await scrapeClassData()
  let items = _.merge(item, coocoo)
  for (let key of Object.keys(items)) {
    if (!('Lecture 1' in items[key])) delete items[key]
  }
  const client = await clientPromise
  await client.connect()
  const db = client.db('classify')
  const title = `${req.query.dep} (${req.query.prefix})`
  await db
    .collection('classes')
    .findOneAndUpdate(
      { department: title },
      { $set: { classes: items } },
      { upsert: true }
    )
  // await writeJsonFile('CEE_S22.json', JSON.stringify(items))
  res.status(200).json(items)
}
