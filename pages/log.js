import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Log() {
  return (
    <div>
      <Head>
        <title>Classify</title>
        <meta name='description' content='Classify - Spotify for Classes' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <main></main>
      <Footer />
    </div>
  )
}
