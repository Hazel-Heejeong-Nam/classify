import Head from 'next/head'
import Navbar from '../components/Navbar'

export default function Home() {
  async function getClasses() {
    const res = await fetch('http://localhost:3000/api/classes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())

    console.log(res)
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
        <button onClick={getClasses}>get</button>
      </main>

      <footer></footer>
    </div>
  )
}
