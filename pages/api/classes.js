import puppeteer from 'puppeteer'
import _ from 'lodash'
import { writeJsonFile } from 'write-json-file'

export default async function handler(req, res) {
  async function scrapeClassData() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    let dep = 'Computer Science'
    dep = dep.replace(' ', '+')
    console.log(dep)
    await page.goto(
      `https://registrar.ucla.edu/academics/course-descriptions?search=${dep}`
    )
    await page.waitForSelector('.course-descriptions-search', {
      visible: true,
    })
    await page.screenshot({ path: 'example.png' })
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

        courses[course_name] = { units: units, desc: desc }
      }
      return courses
    })
    return classes
  }
  async function scrapeClasses() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    let dep = 'Computer Science'
    dep = dep.replace(' ', '+')

    await page.goto(
      `https://sa.ucla.edu/ro/public/soc/Results?SubjectAreaName=Civil+and+Environmental+Engineering+(C%26EE)&t=22S&sBy=subject&subj=C%26EE+++&catlg=&cls_no=&undefined=Go&btnIsInIndex=btn_inIndex`
    )

    await page.evaluate(() =>
      document
        .querySelector(
          '#block-mainpagecontent > div > div > div > div > ucla-sa-soc-app'
        )
        .shadowRoot.querySelector('#expandAll')
        .click()
    )
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
              course_lec_disc_blocks[k].getElementsByClassName('sectionColumn')
            discussions[`Discussion ${disc_sect[0].innerText}`] = {
              Units: disc_units[0].innerText,
              Time: disc_time[0].innerText ?? 'undefined',
              Days: disc_days[0].innerText ?? 'undefined',
            }
          }
          courses[course_name[0].innerText][`Lecture ${j + 1}`] = {
            Units: course_units[0].innerText,
            Time: course_time[0].innerText ?? 'undefined',
            Days: course_days[0].innerText ?? 'undefined',
            Discussions: discussions,
          }
        }
      }
      return courses
    })
    await page.goto(
      `https://registrar.ucla.edu/academics/course-descriptions?search=Management`
    )
    await page.waitForSelector('.course-descriptions-search', {
      visible: true,
    })
    await page.screenshot({ path: 'example.png' })
    let class_des = await page.evaluate(() => {
      const course_blocks = document.querySelectorAll('div.course-record')
      let course_d = {}
      for (const course of course_blocks) {
        const course_name = course
          .querySelector('h3')
          .innerText.trim()
          .replace('. ', ' - ')
        const units = course.getElementsByTagName('p')[0].innerText
        const desc = course.getElementsByTagName('p')[1].innerText
        course_d[course_name] = { Description: desc }
      }
    })
    return classes
  }
  let item = await scrapeClasses()
  let coocoo = await scrapeClassData()
  let items = _.merge(item, coocoo)
  for (let key of Object.keys(items)) {
    if (!('Lecture 1' in items[key])) delete items[key]
  }
  await writeJsonFile('CEE_S22.json', JSON.stringify(items))
  res.status(200).json(items)
}
