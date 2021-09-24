import '../styles/minireset.min.css'
import '../styles/globals.css'
import '../styles/react-dropdown.css'
import SimpleReactLightbox from 'simple-react-lightbox'
import Head from 'next/head'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import RetourHaut from '../components/retour-haut/RetourHaut'
import React, { useState } from 'react'

export const ModeContext = React.createContext();

function MyApp({ Component, pageProps }) {
  const [mode, setMode] = useState(true);

  function handleMode() {
    setMode(!mode);
  }

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond&family=Playfair+Display:wght@400;600;700&family=Spartan:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet"/>
        <meta name="description" content="Sven Oscar Rybin né le 14 juin 1914 à Stockolm, en Suède, et mort le 28 mai 2012 à Antibes, en France. Peintre consacrant son art à la contemplation de l'univers, il appellera l'interprétation de cet imaginaire, l'art cosmique. Il composa plus de 2500 toiles tout au long de sa vie."/>
        {/*<meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"/>*/}
        <link rel="icon" href="/favicon.png" />
        <title>{"Sven Rybin - L'Art pictural inspiré des phénomènes cosmiques."}</title>
      </Head>
      <SimpleReactLightbox>
        <ModeContext.Provider value={mode}>
          <div className={`app ${mode ? 'light_mode' : 'dark_mode'}`}>
            <Header mode={mode} handleMode={handleMode}/>
            <Component {...pageProps} />
            <Footer/>
            <RetourHaut/>
          </div>
        </ModeContext.Provider>
      </SimpleReactLightbox>
    </>
  );
}

export default MyApp
