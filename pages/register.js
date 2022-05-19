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
    'Asian American Studies (B.A.)',
    'Asian Humanities (B.A.)',
    'Asian Languages and Linguistics (B.A.)',
    'Asian Religions (B.A)',
    'Asian Studies (B.A.) ',
    'Business Economics (B.A.) ',
    'Central and East European Languages and Cultures (B.A.)',
    'Chicana and Chicano Studies (B.A.)',
    'Chinese (B.A.)',
    'Classical Civilization (B.A.)',
    'Communication (B.A.) ',
    'Comparative Literature (B.A.)',
    'Ecology, Behavior, and Evolution (B.S.) ',
    'Economics (B.A.) ',
    'English (B.A.)',
    'European Language and Transcultural Studies (B.A.)',
    'European Languages and Transcultural Studies with French and Francophone (B.A.)',
    'European Languages and Transcultural Studies with German (B.A.)',
    'European Languages and Transcultural Studies with Italian (B.A.)',
    'European Languages and Transcultural Studies with Scandinavian (B.A.)',
    'European Studies (B.A.) ',
    'Gender Studies (B.A.)',
    'Geography (B.A.)',
    'Geography/Environmental Studies (B.A.)',
  ]

  const AAMajors = [
    'Architectural Studies (B.A.)',
    'Art History (B.A.)',
    'Dance (B.A.)',
  ]

  const STEMMajors = [
    'Astrophysics (B.S.)',
    'Atmospheric and Oceanic Sciences (B.S.)',
    'Atmospheric and Oceanic Sciences/Mathematics (B.S.)',
    'Biochemistry (B.S.)',
    'Biology (B.S.)',
    'Biophysics (B.S.)',
    'Chemistry (B.S.)',
    'Chemistry/Materials Science (B.S.)',
    'Climate Science (B.S.) ',
    'Cognitive Science (B.S.) ',
    'Computational and Systems Biology (B.S.)',
    'Earth and Environmental Science (B.A.)',
    'Environmental Science (B.S.)',
  ]

  const aa = LSMajors.concat(AAMajors)
  const possibleMajors = aa.concat(STEMMajors)
  const possibleYears = ['Freshmen', 'Sophomore', 'Junior', 'Senior']

  // TODO: redirect to main page if already logged in
  // useEffect(() => {
  //   if (user) router.push('/')
  // })

  const register = (data) => {
    let res = fetch(`/api/register`, {
      method: 'POST',
      body: JSON.stringify({
        data,
      }),
    })
    console.log(data)
    router.push('/login')
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
