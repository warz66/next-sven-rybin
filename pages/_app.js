import '../styles/minireset.min.css'
import '../styles/globals.css'
import '../styles/react-dropdown.css'
import SimpleReactLightbox from 'simple-react-lightbox'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond&family=Playfair+Display:wght@400;600;700&family=Spartan:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet"/>
      </Head>
      <SimpleReactLightbox>
        <div className={"light_mode"}>
          <Component {...pageProps} />
        </div>
      </SimpleReactLightbox>
    </>
  );
}

export default MyApp
