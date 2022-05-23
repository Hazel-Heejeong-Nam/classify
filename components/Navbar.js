import { IconButton, Container, AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { UserContext } from '../contexts/UserContext'
import { useContext } from 'react'
import Link from 'next/link'
import { createTheme, ThemeProvider } from '@mui/material/styles'


const ucla = createTheme({
  palette: {
    uclablue: {
      main: '#a7becf',
      contrastText: '#000000'
    },
    uclayellow: {
      main: '#f5c238',
      contrastText: '#000000'
    },
    fadeyellow: {
      main : '#fcd260',
      contrastText: '#000000'
    }
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
    <AppBar position='static' sx={{ 
      bgcolor: "black", 
      borderBottom : 5,
      borderColor :'#c99906'}}>
      <Container maxWidth = "xl">
        <Toolbar disableGutters>
          <Box
            component = "img"
            sx={{
              height: 40,
              width: 40,
            }}
            src= 'logo.png'
          />
          <Link href='/'>
            <Box sx ={{ 
              fontWeight: 'bold',
              fontSize : 33, 
              margin : 2
            }}>
              CLASSify
            </Box>
          </Link>
          {user && (
            <Box sx={{ mr: '0', ml: 'auto' }}>
              {userPages.map((page) => (
                <Button
                  sx={{ mr: '5px', display: 'inline-block' }}
                  key={page}
                  variant='contained'
                  color= "fadeyellow"
                  href={`/${userPageLinks[page.replaceAll(' ', '_')]}`}
                >
                  {page}
                </Button>
              ))}
              <Button
                sx={{ mr: '5px', display: 'inline-block' }}
                key='logout'
                variant='contained'
                color='uclablue'
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
                  variant='contained'
                  color='fadeyellow'
                  href={`${page.toLowerCase()}`}
                >
                  {page}
                </Button>
              ))}
            </Box>
          )}
          <Typography>{user?.username ?? 'Guest Bruin'}</Typography>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Navbar

