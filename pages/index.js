import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Container, Grid, Stack } from '@mui/material'
import { UserContext } from '../contexts/UserContext'
import { useContext } from 'react'
import { Box } from '@mui/system'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const { user } = useContext(UserContext)
  let router = useRouter()

  useEffect(() => {
    if (user) router.push('/recommendations')
  })

  return (
    <div>
      <Head>
        <title>Classify</title>
        <meta name='description' content='Classify - Spotify for Classes' />
        <link rel='icon' href='/logo2.jpg' />
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
            <Grid
              container
              direction='column'
              alignItems='center'
              justifyContent='center'
            >
              <Box
                component='img'
                sx={{
                  height: 600,
                  width: 800,
                }}
                src='https://postfiles.pstatic.net/MjAyMjA2MDJfODMg/MDAxNjU0MTIyMjcwNzE3.2fThIQuTaZl2OOT3uba6gGl6gd-N_JCWGtpJXlqYDIAg.N-WoprcIWBYp_Q_BT1sC1uOEiwYw9EiqbSLIHNR3x-Ug.JPEG.hatbi2000/welcome.jpg?type=w773'
              />
            </Grid>
          </Stack>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
