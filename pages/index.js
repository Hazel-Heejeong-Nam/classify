import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button, Card, Container, Grid, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'

var recom = null
export default function Home() {
  async function getClasses() {
    const res = await fetch('http://localhost:3000/api/classes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
    console.log(res)
    recom = res
    alert('Result now available! For this demo, please check console to see the result!')
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
          >
          </Grid>
          <Stack spacing={3}> 
            <p>Click 'Get' and wait. I will let you know when the result is ready!</p>
          </Stack>
          <Button variant='outlined' type='submit' onClick={getClasses}>
            GET
          </Button> 
        </Container>
      </main>
      <Footer />
    </div>
  )
}
