import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { UserContext } from '../contexts/UserContext'
import { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Navbar = () => {
  const userPages = [
    'Recommendations',
    'Generate Schedules',
    'Personal Information',
    'Quarter Course Log',
  ]
  const userPageLinks = {
    Recommendations: 'recommendations',
    Generate_Schedules: 'generate',
    Personal_Information: 'personal',
    Quarter_Course_Log: 'log',
  }
  const guestPages = ['Register', 'Login']
  const { user, setUser } = useContext(UserContext)
  const router = useRouter()
  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
    router.push('/')
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Link href='/'>Classify</Link>
        {user && (
          <Box sx={{ mr: '0', ml: 'auto' }}>
            {userPages.map((page) => (
              <Button
                sx={{ mr: '5px', display: 'inline-block' }}
                key={page}
                variant='outlined'
                color='inherit'
                href={`/${userPageLinks[page.replaceAll(' ', '_')]}`}
              >
                {page}
              </Button>
            ))}
            <Button
              sx={{ mr: '5px', display: 'inline-block' }}
              key='logout'
              variant='outlined'
              color='inherit'
              onClick={handleLogout}
            >
              LOG OUT
            </Button>
          </Box>
        )}
        {!user && (
          <Box sx={{ mr: '0', ml: 'auto' }}>
            {guestPages.map((page) => (
              <Button
                sx={{ mr: '5px', display: 'inline-block' }}
                key={page}
                variant='outlined'
                color='inherit'
                href={`${page.toLowerCase()}`}
              >
                {page}
              </Button>
            ))}
          </Box>
        )}
        <Typography>{user?.username ?? 'Guest Bruin'}</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
