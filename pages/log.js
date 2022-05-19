import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button, Card, Container, Grid, Stack, Typography } from '@mui/material'
import FormInput from '../components/FormInput'
import { useForm } from 'react-hook-form'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'

export default function Log() {
  const { control, handleSubmit } = useForm()
  const { user } = useContext(UserContext)
  const [courses, setCourses] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    let username
    if (user) username = user['username']
    else return
    console.log(username)
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
    getClasses()
    console.log(courses)
  })

  const addRating = (data) => {
    data = { ...data, username: user.username }
    let res = fetch(`/api/userclasses`, {
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
              <form onSubmit={handleSubmit(addRating)}>
                <Stack spacing={3}>
                  <FormInput name='course' control={control} label='Course' />
                  <FormInput name='rating' control={control} label='Rating' />
                  <Button variant='outlined' type='submit'>
                    ADD COURSE
                  </Button>
                </Stack>
              </form>
            </Card>
            {courses && (
              <Card sx={{ minWidth: '350px', padding: '30px', m: '30px' }}>
                <form onSubmit={handleSubmit(addRating)}>
                  <Stack spacing={3}>
                    {courses.map((course) => (
                      <Typography>
                        {course['course']}: {course['rating']}
                      </Typography>
                    ))}
                  </Stack>
                </form>
              </Card>
            )}
          </Grid>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
