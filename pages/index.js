import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/home.module.css'
import Hero from '../components/home/hero/Hero'

export default function Home() {
  return (
    <>
      <Head>
        <title>Accueil | Sven Rybin</title>
      </Head>

      <Hero/>
    </>
  )
}
