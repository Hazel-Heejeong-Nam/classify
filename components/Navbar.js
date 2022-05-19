import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { UserContext } from '../contexts/UserContext'
import { useContext } from 'react'
import Link from 'next/link'
import { createTheme, ThemeProvider } from '@mui/material/styles'


const ucla = createTheme({
  palette: {
    uclablue: {
      main: '#1a64db',
      contrastText: '#ffe438'
    },
    uclayellow: {
      main: '#ffe438',
      contrastText: '#1a64db'
    },
  },
});

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

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <ThemeProvider theme={ucla}>
    <AppBar position='static'>
      <Toolbar>
        <Link href='/'>Classify</Link>
        {user && (
          <Box sx={{ mr: '0', ml: 'auto' }}>
            {userPages.map((page) => (
              <Button
                sx={{ mr: '5px', display: 'inline-block' }}
                key={page}
                variant='contained'
                color= "uclayellow"
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
    </ThemeProvider>
  )
}

export default Navbar
