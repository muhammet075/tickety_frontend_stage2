import Head from 'next/head';
import Header from '@/components/header';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return(
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
      <meta name="format-detection" content="telephone=no"/>
      <meta name="description" content="Tickety"/>
      <meta property="og:title" content="Tickety" />
      <meta name="keywords" content="Tickety"/>
      <meta property="og:url" content="https://www.tickety.com/"/>
      <meta property="og:image" content="/oglogo.png"/>
    </Head>
    <Header/>
    <main>
      <Component {...pageProps} />
    </main>
  </>
  )
}

export default MyApp;
