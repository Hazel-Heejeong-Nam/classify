import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Card, Container, Grid, Stack } from '@mui/material'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../contexts/UserContext'

export default function Recommendations() {
  const { user } = useContext(UserContext)
  const [recommendation, setRecommendation] = useState(null)
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
      .then((rec) => setRecommendation(Array(rec.recs)[0]))
  }
  useEffect(() => {
    if (user) getRecs()
  }, [user])
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
          <Stack spacing={3}>
            <Container>
              <Card sx={{ minWidth: '350px', padding: '30px', m: '30px' }}>
                <Grid
                  container
                  direction='column'
                  alignItems='center'
                  justifyContent='center'
                >
                  {/*<p>*/}
                  {/*  Click 'Get' and wait. I will let you know when the result is*/}
                  {/*  ready!*/}
                  {/*</p>*/}
                  {/*<Button variant='contained' type='submit' onClick={getRecs}>*/}
                  {/*  GET RECOMMENDATION*/}
                  {/*</Button>*/}
                  {recommendation && (
                    <div style={{}}>
                      <p>Here are your recommendations: </p>
                      <ul>
                        {recommendation.map((rec, index) => {
                          return (
                            <li>
                              {' '}
                              Because you liked {rec[0]} :
                              <ul>
                                {rec[1].map((item, i) => {
                                  return (
                                    <li>
                                      {' '}
                                      {item[1]} : {(100 * item[2]).toFixed(1)} %
                                      match
                                    </li>
                                  )
                                })}
                              </ul>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )}
                </Grid>
              </Card>
            </Container>
          </Stack>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
