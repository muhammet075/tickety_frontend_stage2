import Head from 'next/head';
import Hero from '@/components/hero';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Tickety</title>
        <meta name="description" content="Tickety App" />
      </Head>
      <Hero/>
    </div>
  )
}
