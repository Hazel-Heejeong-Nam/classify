import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { UserContext } from '../contexts/UserContext'
import { useContext } from 'react'
import Link from 'next/link'

const Navbar = () => {
  const userPages = ['Recommendations', 'Generate', 'Personal Info', 'Log']
  const guestPages = ['Register', 'Login']
  const { user, setUser } = useContext(UserContext)

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
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
