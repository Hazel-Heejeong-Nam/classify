import '../styles/globals.css'
import { useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const found = JSON.parse(localStorage.getItem('user'))
    if (found) {
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
