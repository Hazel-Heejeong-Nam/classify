import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button, Card, Container, Grid, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { UserContext } from '../contexts/UserContext'
import { useContext, useState } from 'react'
import { Box } from '@mui/system'

var recom = null
export default function Home() {
  const { user } = useContext(UserContext)
  const [recommendation, setRecommendation] = useState(null)
  async function getClasses() {
    const res = await fetch('http://localhost:3000/api/classes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
    console.log(res)
    recom = res
  }
  async function getRecs() {
    const res = await fetch(
      `http://localhost:3000/api/userrecs?username=${user.username}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((rec) => setRecommendation(Object.keys(rec)[0]))
    alert('Result now available!')
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
            {user && !recommendation && (
              <Container>
                <Grid
                  container
                  direction='column'
                  alignItems='center'
                  justifyContent='center'
                >
                  <p>
                    Click 'Get' and wait. I will let you know when the result is
                    ready!
                  </p>
                  <Box
                    component='img'
                    sx={{
                      height: 380,
                      width: 540,
                    }}
                    src='welcome.jpg'
                  />
                  <Button variant='contained' type='submit' onClick={getRecs}>
                    GET RECOMMENDATION
                  </Button>
                </Grid>
              </Container>
            )}
            {user && recommendation && (
              <p>Here is your recommendation: {recommendation}</p>
            )}
            {!user && (
              <p>
                Please create an account or log into your account to see a
                recommendation!
              </p>
            )}
          </Stack>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
