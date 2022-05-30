import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import FormInput from '../components/FormInput'
import { useForm } from 'react-hook-form'
import { Slider, Button, Card, Container, Grid, Stack } from '@mui/material'
import FormAutocomplete from '../components/FormAutocomplete'
import { createTheme, ThemeProvider } from '@mui/material/styles'

export default function Generate() {
  const majorclassnum = ['1','2','3','4']
  const geclassnum = ['1','2','3','4']
  const { control, handleSubmit } = useForm()
  const ucla = createTheme({
    palette: {
      uclablue: {
        main: '#162330',
        contrastText: '#ffffff'
      },
      uclayellow: {
        main: '#c99906',
        contrastText: '#1a64db'
      },
      cardcolor : {
        main : '#b5bdc9'
      }
    },
  });

  return (
    <ThemeProvider theme = {ucla}>
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
              <p>1. Choose how many major classes you want to take next quarter.</p>
                <Stack spacing={3}></Stack>
                  <FormAutocomplete
                      name='majorclassnum'
                      control={control}
                      label='Choose number'
                      options={majorclassnum}
                    />
              <p>2. Choose how many GE classes you want to take next quarter.</p>
                <Stack spacing={3}></Stack>
                  <FormAutocomplete
                    name='geclassnum'
                    control={control}
                    label='Choose number'
                    options={geclassnum}
                  />
              <p>3. Please check an expectation of your work load.</p>
                <Stack spacing={3}></Stack>
                  <Slider
                    aria-label="Work Load"
                    defaultValue={50}
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={10}
                    max={100}
                  />
              <p>3. Please check an expectation of easiness.</p>
                <Stack spacing={3}></Stack>
                  <Slider
                    aria-label="Easiness"
                    defaultValue={50}
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={10}
                    max={100}
                  />
              <Button variant='contained' type='submit' color = 'uclablue'>
                SAVE
              </Button>         
            </Card>        
          </Container>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
