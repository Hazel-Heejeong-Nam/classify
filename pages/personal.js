import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import FormInput from '../components/FormInput'
import { useForm } from 'react-hook-form'
import { Button, Card, Container, Grid, Stack } from '@mui/material'
import FormAutocomplete from '../components/FormAutocomplete'

export default function Personal() {
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
          <Card sx={{ minWidth: '350px', padding: '30px', m: '30px' }}>
            <Stack spacing={3}>
              <p>1. Set your major</p>
              <FormAutocomplete
                name='major'
                control={control}
                label='Major'
                options={possibleMajors}
              />
              <p>2. Set your grade</p>
              <FormAutocomplete
                name='year'
                control={control}
                label='Year'
                options={possibleYears}
              />
            </Stack>
          </Card>
          <Button variant='outlined' type='submit'>
            SAVE
          </Button>         
        </Container>
      </main>
      <Footer />
    </div>
  )
}

