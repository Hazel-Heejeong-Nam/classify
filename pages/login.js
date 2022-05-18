import Head from 'next/head'
import Navbar from '../components/Navbar'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import FormInput from '../components/FormInput'
import { useForm } from 'react-hook-form'
import { Button, Card, Container, Grid, Stack } from '@mui/material'
import { UserContext } from '../contexts/UserContext'
import Footer from '../components/Footer'

export default function Login() {
  const { user, setUser } = useContext(UserContext)
  const router = useRouter()
  const { control, handleSubmit } = useForm()

  // TODO: redirect to main page if already logged in
  // useEffect(() => {
  //   if (user) router.push('/')
  // })

  // TODO: redirect to main page after successful submission
  const login = async (data) => {
    // router.push('/')
    console.log(data)
    let res = await fetch(`/api/login`, {
      method: 'POST',
      body: JSON.stringify({
        data,
      }),
    })
    if (!res.ok) {
      console.log('wrong info buddy')
      return
    }
    const { token, username } = await res.json()
    const user = { username: username, token: token }
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
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
            <Card sx={{ minWidth: '350px', padding: '30px', m: '30px' }}>
              <form onSubmit={handleSubmit(login)}>
                <Stack spacing={3}>
                  <FormInput
                    name='username'
                    control={control}
                    label='Username'
                  />
                  <FormInput
                    name='password'
                    control={control}
                    label='Password'
                    type='password'
                  />
                  <Button variant='outlined' type='submit'>
                    LOG IN
                  </Button>
                </Stack>
              </form>
            </Card>
          </Grid>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
