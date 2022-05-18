import Head from 'next/head'
import Navbar from '../components/Navbar'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import FormInput from '../components/FormInput'
import { useForm } from 'react-hook-form'
import { Button, Card, Container, Grid, Stack } from '@mui/material'
import FormAutocomplete from '../components/FormAutocomplete'
import Footer from '../components/Footer'

export default function Register() {
  const router = useRouter()
  const { control, handleSubmit } = useForm()

  // TODO: add the rest of the majors
  // Separated list of majors for easy editing (theoretically)
  const LSMajors = [
    'African American Studies (B.A.)',
    'African and Middle Eastern Studies (B.A.)',
    'American Indian Studies (B.A.)',
    'American Literature and Culture (B.A.)',
    'Ancient Near East and Egyptology (B.A.)',
    'Anthropology (B.A.)',
    'Anthropology (B.S.)',
    'Arabic (B.A.)',
  ]

  const AAMajors = [
    'Architectural Studies (B.A.)',
    'Art (B.A.)',
    'Dance (B.A.)',
  ]

  const possibleMajors = LSMajors.concat(AAMajors)
  const possibleYears = ['Freshmen', 'Sophomore', 'Junior', 'Senior']

  // TODO: redirect to main page if already logged in
  // useEffect(() => {
  //   if (user) router.push('/')
  // })

  // TODO: redirect to login after successful submission
  const register = (data) => {
    // router.push('/login')
    let res = fetch(`/api/register`, {
      method: 'POST',
      body: JSON.stringify({
        data,
      }),
    })
    console.log(data)
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
              <form onSubmit={handleSubmit(register)}>
                <Stack spacing={3}>
                  <FormInput name='name' control={control} label='Name' />
                  <FormInput
                    name='username'
                    control={control}
                    label='Username'
                  />
                  <FormInput
                    name='email'
                    control={control}
                    label='UCLA Email'
                  />
                  <FormInput
                    name='password'
                    control={control}
                    label='Password'
                    type='password'
                  />
                  <FormInput
                    name='confPassword'
                    control={control}
                    label='Confirm Password'
                    type='password'
                  />
                  <FormAutocomplete
                    name='major'
                    control={control}
                    label='Major'
                    options={possibleMajors}
                  />
                  {/* TODO: reevaluate if year is needed, since year doesn't really mean much*/}
                  <FormAutocomplete
                    name='year'
                    control={control}
                    label='Year'
                    options={possibleYears}
                  />
                  <Button variant='outlined' type='submit'>
                    REGISTER
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
