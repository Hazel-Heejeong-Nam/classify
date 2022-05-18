import '../styles/globals.css'
import { useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import * as jwt from 'jsonwebtoken-esm'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const found = JSON.parse(localStorage.getItem('user'))
    if (found) {
      try {
        jwt.verify(found.token, 'classify')
      } catch (e) {
        console.log('wrong token')
      }
      setUser(found)
    }
  }, [])
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}

export default MyApp
