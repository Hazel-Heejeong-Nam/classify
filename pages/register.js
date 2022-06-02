import Head from 'next/head'
import Navbar from '../components/Navbar'
import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import FormInput from '../components/FormInput'
import { useForm } from 'react-hook-form'
import { Button, Card, Container, Grid, Stack } from '@mui/material'
import FormAutocomplete from '../components/FormAutocomplete'
import Footer from '../components/Footer'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { UserContext } from '../contexts/UserContext'

export default function Register() {
  const { user } = useContext(UserContext)
  const router = useRouter()
  const { control, handleSubmit } = useForm()

  const ucla = createTheme({
    palette: {
      uclablue: {
        main: '#162330',
        contrastText: '#ffffff',
      },
      uclayellow: {
        main: '#c99906',
        contrastText: '#1a64db',
      },
    },
  })
  const LSMajors = [
    'African American Studies (B.A.)',
    'African and Middle Eastern Studies (B.A.)',
    'American Indian Studies (B.A.)',
    'American Literature and Culture (B.A.)',
    'Ancient Near East and Egyptology (B.A.)',
    'Anthropology (B.A.)',
    'Anthropology (B.S.)',
    'Arabic (B.A.)',
    'Art History (B.A.)',
    'Asian American Studies (B.A.)',
    'Asian Humanities (B.A.)',
    'Asian Languages and Linguistics (B.A.)',
    'Asian Religions (B.A)',
    'Asian Studies (B.A.) ',
    'Astrophysics (B.S.)',
    'Atmospheric and Oceanic Sciences (B.S.)',
    'Atmospheric and Oceanic Sciences/Mathematics (B.S.)',
    'Biochemistry (B.S.)',
    'Biology (B.S.)',
    'Biophysics (B.S.)',
    'Business Economics (B.A.) ',
    'Central and East European Languages and Cultures (B.A.)',
    'Chemistry (B.S.)',
    'Chemistry/Materials Science (B.S.)',
    'Chicana and Chicano Studies (B.A.)',
    'Chinese (B.A.)',
    'Classical Civilization (B.A.)',
    'Climate Science (B.S.) ',
    'Cognitive Science (B.S.) ',
    'Communication (B.A.) ',
    'Comparative Literature (B.A.)',
    'Computational and Systems Biology (B.S.)',
    'Earth and Environmental Science (B.A.)',
    'Ecology, Behavior, and Evolution (B.S.) ',
    'Economics (B.A.) ',
    'English (B.A.)',
    'Environmental Science (B.S.)',
    'European Language and Transcultural Studies (B.A.)',
    'European Languages and Transcultural Studies with French and Francophone (B.A.)',
    'European Languages and Transcultural Studies with German (B.A.)',
    'European Languages and Transcultural Studies with Italian (B.A.)',
    'European Languages and Transcultural Studies with Scandinavian (B.A.)',
    'European Studies (B.A.) ',
    'Gender Studies (B.A.)',
    'Geography (B.A.)',
    'Geography/Environmental Studies (B.A.)',
    'Geology (B.S.)',
    'Geology/Engineering Geology (B.S.)',
    'Geophysics (B.S.)',
    'Global Studies (B.A.)',
    'Greek (B.A.)',
    'Greek and Latin (B.A.)',
    'History (B.A.)',
    'Human Biology and Society (B.A.)',
    'Human Biology and Society (B.S.)',
    'International Development Studies (B.A.)',
    'Iranian Studies (B.A.)',
    'Japanese (B.A.)',
    'Jewish Studies (B.A.)',
    'Korean (B.A.)',
    'Labor Studies (B.A.)',
    'Latin (B.A.)',
    'Latin American Studies (B.A.)',
    'Linguistics (B.A.)',
    'Linguistics and Anthropology (B.A.)',
    'Linguistics and Asian Languages and Cultures (B.A.)',
    'Linguistics and Computer Science (B.A.)',
    'Linguistics and English (B.A.)',
    'Linguistics and French (B.A.)',
    'Linguistics and Italian (B.A.)',
    'Linguistics and Philosophy (B.A.)',
    'Linguistics and Psychology (B.A.)',
    'Linguistics and Scandinavian Languages (B.A.)',
    'Linguistics and Spanish (B.A.)',
    'Linguistics, Applied (B.A.)',
    'Marine Biology (B.S.)',
    'Mathematics (B.S.)',
    'Mathematics, Applied (B.S.)',
    'Mathematics/Applied Science (B.S.)',
    'Mathematics, Data Theory (B.S.)',
    'Mathematics/Economics (B.S.)',
    'Mathematics, Financial Actuarial (B.S)',
    'Mathematics for Teaching (B.S.)',
    'Mathematics of Computation (B.S.)',
    'Microbiology, Immunology, and Molecular Genetics (B.S.)',
    'Middle Eastern Studies (B.A.)',
    'Molecular, Cell, and Developmental Biology (B.S.)',
    'Neuroscience (B.S.)',
    'Nordic Studies (B.A.)',
    'Philosophy (B.A.)',
    'Physics (B.A.)',
    'Physics (B.S.)',
    'Physiological Science (B.S.)',
    'Political Science (B.A.)',
    'Portuguese and Brazilian Studies (B.A.)',
    'Psychobiology (B.S.) ',
    'Psychology (B.A.) ',
    'Religion, Study of (B.A.)',
    'Russian Language and Literature (B.A.)',
    'Russian Studies (B.A.)',
    'Sociology (B.A.)',
    'Southeast Asian Studies (B.A.) ',
    'Spanish (B.A.)',
    'Spanish and Community and Culture (B.A.)',
    'Spanish and Linguistics (B.A.)',
    'Spanish and Portuguese (B.A.)',
    'Statistics (B.S.) ',
    'Individual Field of Concentration (B.A./ B.S.)',
  ]

  const AAMajors = [
    'Architectural Studies (B.A.)',
    'Art(B.A.)',
    'Dance (B.A.)',
    'Design | Media Arts (B.A.)',
    'World Arts and Cultures (B.A.)',
    'Individual Field of Concentration in the Arts and Architecture (B.A.)',
  ]

  const Engineering = [
    'Aerospace Engineering (B.S.)',
    'Bioengineering (B.S.)',
    'Chemical Engineering (B.S.)',
    'Civil Engineering (B.S.)',
    'Computer Engineering (B.S.) new',
    'Computer Science (B.S.)',
    'Computer Science and Engineering (B.S.)',
    'Electrical Engineering (B.S.)',
    'Materials Engineering (B.S.)',
    'Mechanical Engineering (B.S.)',
  ]
  const aa = LSMajors.concat(AAMajors)
  const possibleMajors = aa.concat(Engineering)
  const possibleYears = ['Freshmen', 'Sophomore', 'Junior', 'Senior']

  useEffect(() => {
    if (user) router.push('/')
  })

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
    <ThemeProvider theme={ucla}>
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
                    <Button variant='contained' type='submit' color='uclablue'>
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
    </ThemeProvider>
  )
}
