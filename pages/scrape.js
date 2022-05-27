import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button, Container, Grid, Stack } from '@mui/material'
import { UserContext } from '../contexts/UserContext'
import { useContext, useState } from 'react'

export default function Scrape() {
  const [dep, setDep] = useState('')
  const [link, setLink] = useState('')
  const [prefix, setPrefix] = useState('')
  const [pages, setPages] = useState('')
  async function getClasses() {
    const res = await fetch(
      `http://localhost:3000/api/classes?pages=${pages}&prefix=${prefix}&dep=${dep}&link=${link.replaceAll(
        '&',
        '*'
      )}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => res.json())
    console.log(res)
  }
  const onDepChange = (e) => {
    setDep(e.target.value)
  }
  const onLinkChange = (e) => {
    setLink(e.target.value)
  }
  const onPrefixChange = (e) => {
    setPrefix(e.target.value)
  }
  const onPagesChange = (e) => {
    setPages(e.target.value)
  }

  return (
    <div>
      <Head>
        <title>Classify</title>
        <meta name='description' content='Classify - Spotify for Classes' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <main>
        <Container>
          <Grid
            container
            direction='column'
            alignItems='center'
            justifyContent='center'
          ></Grid>
          <Stack spacing={3}>
            <Container>
              <Grid
                container
                direction='column'
                alignItems='center'
                justifyContent='center'
              >
                <label>Department</label>
                <input value={dep} onChange={onDepChange} />
                <label>Link</label>
                <input value={link} onChange={onLinkChange} />
                <label>Prefix</label>
                <input value={prefix} onChange={onPrefixChange} />
                <label>Pages</label>
                <input value={pages} onChange={onPagesChange} />
                <Button variant='contained' type='submit' onClick={getClasses}>
                  SCRAPE
                </Button>
              </Grid>
            </Container>
          </Stack>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
