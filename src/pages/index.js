import Head from 'next/head';
import Hero from '@/components/hero';
import Partners from "@/components/partners";
import Ticketscontainer from '@/components/ticketscontainer';
import NextEvents from '@/components/nextevents';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Tickety</title>
        <meta name='description' content='Tickety App' />
      </Head>
      <Hero />
      <Partners />
      <Ticketscontainer />
      <NextEvents />
    </div>
  );
}
 