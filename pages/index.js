import Head from 'next/head'
import styles from '../styles/home.module.css'
import React, { useEffect } from 'react'
import Hero from '../components/home/hero/Hero'
import Biographie from '../components/home/biographie/Biographie'
import Expositions from '../components/home/expositions/Expositions'
import Galeries from '../components/home/galeries/Galeries'
import Contact from '../components/home/contact/Contact'

export default function Home() {

  useEffect(() => {
    const loadScriptByURL = (id, url, callback) => {
    const isScriptExist = document.getElementById(id);
   
    if (!isScriptExist) {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;
      script.id = id;
      script.onload = function () {
        if (callback) callback();
      };
      document.body.appendChild(script);
    }
   
      if (isScriptExist && callback) callback();
    }
   
    // load the script by passing the URL
    loadScriptByURL("recaptcha-key", `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CLE_GRECAPTCHA_API}`, function () {
      console.log("Script loaded!");
    });
  },[]);

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
