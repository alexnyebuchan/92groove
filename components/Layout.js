import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';
import { useContext } from 'react';
import { AudioContext } from '@/context/AudioContext';

export default function Layout({ children }) {
  const { state } = useContext(AudioContext);
  return (
    <div>
      <Head>
        <title>{state.title}</title>
        {/* <meta name="description" content="xxx" />
        <meta name="keywords" content="yyy" /> */}
      </Head>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  keywords: 'deep house, underground house',
};
