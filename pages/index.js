import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/home.module.css'
import Hero from '../components/home/hero/Hero'
import Biographie from '../components/home/biographie/Biographie'
import Expositions from '../components/home/expositions/Expositions'
import Galeries from '../components/home/galeries/Galeries'
import Contact from '../components/home/contact/Contact'

export default function Home() {
  return (
    <>

      <Head>
        <title>Accueil | Sven Rybin</title>
      </Head>

      <Hero/>

      <Biographie/>

      <Expositions/>

      <Galeries/>
      
      <Contact/>

    </>
  )
}
