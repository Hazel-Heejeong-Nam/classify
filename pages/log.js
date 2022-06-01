import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  Button,
  Card,
  Container,
  Grid,
  Stack,
  Typography,
  Rating,
  Autocomplete,
  TextField,
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import { createTheme, ThemeProvider } from '@mui/material/styles'

export default function Log() {
  const { user } = useContext(UserContext)
  const [courses, setCourses] = useState('')
  const [department, setDepartment] = useState('')
  const [department_courses, setDepartment_courses] = useState('')
  const [department_iv, setDepartment_iv] = useState('')
  const [course, setCourse] = useState('')
  const [course_iv, setCourse_iv] = useState('')
  const [year, setYear] = useState('')
  const [year_iv, setYear_iv] = useState('')
  const [quarter, setQuarter] = useState('')
  const [quarter_iv, setQuarter_iv] = useState('')
  const [rating, setRating] = useState('')
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
      cardcolor: {
        main: '#b5bdc9',
      },
    },
  })
  const possibleYears = [
    '2022',
    '2021',
    '2020',
    '2019',
    '2018',
    '2017',
    '2016',
    '2015',
    '2014',
  ]
  const possibleQuarters = ['Fall', 'Winter', 'Spring']
  const departments = [
    'Aerospace Studies (AERO ST)',
    'African American Studies (AF AMER)',
  ]

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    let username
    if (user) username = user['username']
    else return
    async function getClasses() {
      const res = await fetch(
        `http://localhost:3000/api/userclasses?username=${username}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((res) => res.json())
        .then((courses) => setCourses(courses))
    }
    async function getDepClasses() {
      const res = await fetch(
        `http://localhost:3000/api/departmentclasses?dep=${department}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((res) => res.json())
        .then((courses) => setDepartment_courses(courses))
    }
    getClasses()
    if (department) getDepClasses()
  })

  const addRating = (e) => {
    e.preventDefault()
    if (course === '' || year === '' || quarter === '' || rating === '') return
    const data = {
      course: course,
      year: year,
      quarter: quarter,
      rating: rating,
      username: user.username,
    }
    let res = fetch(`/api/userclasses`, {
      method: 'POST',
      body: JSON.stringify({
        data,
      }),
    })
    console.log(data)
  }

  return (
    <ThemeProvider theme={ucla}>
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
                <form onSubmit={addRating}>
                  <Stack spacing={3}>
                    <Autocomplete
                      value={department}
                      onChange={(event, newValue) => {
                        setDepartment(newValue)
                      }}
                      inputValue={department_iv}
                      onInputChange={(event, newValue) => {
                        setDepartment_iv(newValue)
                      }}
                      options={departments}
                      renderInput={(params) => (
                        <TextField {...params} label='Department' />
                      )}
                    />
                    <Autocomplete
                      disabled={!department || department === ''}
                      value={course}
                      onChange={(event, newValue) => {
                        setCourse(newValue)
                      }}
                      inputValue={course_iv}
                      onInputChange={(event, newValue) => {
                        setCourse_iv(newValue)
                      }}
                      options={department_courses}
                      renderInput={(params) => (
                        <TextField {...params} label='Course' />
                      )}
                    />
                    <Grid
                      container
                      direction='row'
                      justifyContent='space-between'
                      alignItems='center'
                    >
                      <Grid item xs={5}>
                        <Autocomplete
                          value={year}
                          onChange={(event, newValue) => {
                            setYear(newValue)
                          }}
                          inputValue={year_iv}
                          onInputChange={(event, newValue) => {
                            setYear_iv(newValue)
                          }}
                          options={possibleYears}
                          renderInput={(params) => (
                            <TextField {...params} label='Year' />
                          )}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Autocomplete
                          value={quarter}
                          onChange={(event, newValue) => {
                            setQuarter(newValue)
                          }}
                          inputValue={quarter_iv}
                          onInputChange={(event, newValue) => {
                            setQuarter_iv(newValue)
                          }}
                          options={possibleQuarters}
                          renderInput={(params) => (
                            <TextField {...params} label='Quarter' />
                          )}
                        />
                      </Grid>
                    </Grid>
                    <TextField
                      name='rating'
                      value={rating}
                      onChange={(e) => {
                        e.preventDefault()
                        setRating(e.target.value)
                      }}
                      label='Rating'
                    />
                    <Button variant='contained' type='submit' color='uclablue'>
                      ADD COURSE
                    </Button>
                  </Stack>
                </form>
              </Card>
              {courses && (
                <Card sx={{ minWidth: '350px', padding: '30px', m: '30px' }}>
                  <Stack spacing={3}>
                    {courses.map((course) => (
                      <Typography key={course.course + course.rating}>
                        {course['year']} : {course['quarter']}:{' '}
                        {course['course']}: {course['rating']}
                      </Typography>
                    ))}
                  </Stack>
                </Card>
              )}
            </Grid>
          </Container>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
