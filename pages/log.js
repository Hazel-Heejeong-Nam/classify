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
    'African Studies (AFRC ST)',
    'American Indian Studies (AM IND)',
    'American Sign Language (ASL)',
    'Ancient Near East (AN N EA)',
    'Anthropology (ANTHRO)',
    'Arabic (ARABIC)',
    'Archaeology (ARCHEOL)',
    'Architecture and Urban Design (ARCHUD)',
    'Armenian (ARMENIA)',
    'Art (ART)',
    'Art History (ART HIS)',
    'Arts Education (ARTSED)',
    'Asian (ASIAN)',
    'Asian American Studies (ASIA AM)',
    'Astronomy (ASTR)',
    'Atmospheric and Oceanic Sciences (AO SCI)',
    'Bioengineering (BIOENGR)',
    'Bioinformatics (Graduate) (BIOINFO)',
    'Biological Chemistry (BIOLCH)',
    'Biomathematics (BIOMATH)',
    'Biomedical Research (BMDRES)',
    'Biostatistics (BIOSTAT)',
    'Central and East European Studies (CEE ST)',
    'Chemical Engineering (CH ENGR)',
    'Chicana/o and Central American Studies (CCAS)',
    'Chemistry and Biochemistry (CHEM)',
    'Chinese (CHIN)',
    'Civil and Environmental Engineering (CEE)',
    'Classics (CLASSIC)',
    'Clusters (CLUSTER)',
    'Communication (COMM)',
    'Community Engagement and Social Change (CESC)',
    'Community Health Sciences (COMHLT)',
    'Comparative Literature (COM LIT)',
    'Computational and Systems Biology (CS BIO)',
    'Computer Science (COM SCI)',
    'Conservation of Cultural Heritage (CLT HTG)',
    'Dance (DANCE)',
    'Design / Media Arts (DESMA)',
    'Digital Humanities (DGT HUM)',
    'Disability Studies (DIS STD)',
    'Dutch (DUTCH)',
    'Earth, Planetary, and Space Sciences (EPS SCI)',
    'Ecology and Evolutionary Biology (EE BIOL)',
    'Economics (ECON)',
    'Education (EDUC)',
    'Electrical and Computer Engineering (EC ENGR)',
    'Engineering (ENGR)',
    'English (ENGL)',
    'English as A Second Language (ESL)',
    'English Composition (ENGCOMP)',
    'Environment (ENVIRON)',
    'Environmental Health Sciences (ENV HLT)',
    'Epidemiology (EPIDEM)',
    'Ethnomusicology (ETHNMUS)',
    'European Languages and Transcultural Studies (ELTS)',
    'Filipino (FILIPNO)',
    'Film and Television (FILM TV)',
    'French (FRNCH)',
    'Gender Studies (GENDER)',
    'Geography (GEOG)',
    'Gerontology (GRNTLGY)',
    'German (GERMAN)',
    'Global Health (GLB HLT)',
    'Global Jazz Studies (GJ STDS)',
    'Global Studies (GLBL ST)',
    'Graduate Student Professional Development (GRAD PD)',
    'Greek (GREEK)',
    'Health Policy and Management (HLT POL)',
    'HLT ADM (HLT ADM)',
    'Hebrew (HEBREW)',
    'Hindi-Urdu (HIN-URD)',
    'History (HIST)',
    'Honors Collegium (HNRS)',
    'Human Genetics (HUM GEN)',
    'Hungarian (HNGAR)',
    'Indigenous Languages of the Americas (IL AMER)',
    'Indo-European Studies (I E STD)',
    'Indonesian (INDO)',
    'Information Studies (INF STD)',
    'International and Area Studies (I A STD)',
    'International Migration Studies (I M STD)',
    'International Development Studies (INTL DV)',
    'Iranian (IRANIAN)',
    'Islamic Studies (ISLM ST)',
    'Italian (ITALIAN)',
    'Japanese (JAPAN)',
    'Korean (KOREA)',
    'Labor Studies (LBR STD)',
    'Latin (LATIN)',
    'Latin American Studies (LATN AM)',
    'Law (LAW)',
    'Lesbian, Gay, Bisexual, Transgender, and Queer Studies (LGBTQS)',
    'Life Sciences (LIFESCI)',
    'Linguistics (LING)',
    'Management (MGMT)',
    'Management-Executive MBA (MGMTEX)',
    'Management-Full-Time MBA (MGMTFT)',
    'Management-Fully-Employed MBA (MGMTFE)',
    'Management-Global Executive MBA Asia Pacific (MGMTGEX)',
    'Management-Master of Financial Engineering (MGMTMFE)',
    'Management-Master of Science in Business Analytics (MGMTMSA)',
    'Management-PhD (MGMTPHD)',
    'Materials Science and Engineering (MAT SCI)',
    'Mathematics (MATH)',
    'Mechanical and Aerospace Engineering (MECHAE)',
    'Medicine (MED)',
    'Microbiology, Immunology, and Molecular Genetics (MIMG)',
    'Military Science (MIL SCI)',
    'Molecular and Medical Pharmacology (M PHARM)',
    'Molecular Biology (MOL BIO)',
    'Molecular Toxicology (MOL TOX)',
    'Molecular, Cell, and Developmental Biology (MCD BIO)',
    'Molecular, Cellular, and Integrative Physiology (MCIP)',
    'Music (MUSC)',
    'Music Industry (MSC IND)',
    'Musicology (MUSCLG)',
    'Naval Science (NAV SCI)',
    'Near Eastern Languages (NR EAST)',
    'Neurobiology (NEURBIO)',
    'Neuroscience (NEUROSC)',
    'Neuroscience (Graduate) (NEURO)',
    'Nursing (NURSING)',
    'Oral Biology (ORL BIO)',
    'Pathology and Laboratory Medicine (PATH)',
    'Philosophy (PHILOS)',
    'Physics (PHYSICS)',
    'Physics and Biology in Medicine (PBMED)',
    'Physiological Science (PHYSCI)',
    'Political Science (POL SCI)',
    'Portuguese (PORTGSE)',
    'Program in Computing (COMPTNG)',
    'Psychiatry and Biobehavioral Sciences (PSYCTRY)',
    'Psychology (PSYCH)',
    'Public Affairs (PUB AFF)',
    'Public Health (PUB HLT)',
    'Public Policy (PUB PLC)',
    'Quantum Science and Technology (QNT SCI)',
    'Religion, Study of (RELIGN)',
    'Research Practice (RES PRC)',
    'Russian (RUSSN)',
    'Scandinavian (SCAND)',
    'Science Education (SCI EDU)',
    'Semitic (SEMITIC)',
    'Serbian/Croatian (SRB CRO)',
    'Slavic (SLAVC)',
    'Social Science (SOC SC)',
    'Social Thought (SOC THT)',
    'Social Welfare (SOC WLF)',
    'Society and Genetics (SOC GEN)',
    'Sociology (SOCIOL)',
    'South Asian (S ASIAN)',
    'Southeast Asian (SEASIAN)',
    'Spanish (SPAN)',
    'Statistics (STATS)',
    'Swahili (SWAHILI)',
    'Thai (THAI)',
    'Theater (THEATER)',
    'Turkic Languages (TURKIC)',
    'University Studies (UNIV ST)',
    'Urban Planning (URBN PL)',
    'Vietnamese (VIETMSE)',
    'World Arts and Cultures (WL ARTS)',
    'Yiddish (YIDDSH)',
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
                <form onSubmit={addRating}>
                  <Stack spacing={3}>
                    <Autocomplete
                      value={department}
                      onChange={(event, newValue) => {
                        setDepartment(newValue)
                        console.log(newValue)
                        if (newValue === '' || newValue === null) {
                          setCourse('')
                          setCourse_iv('')
                        }
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
