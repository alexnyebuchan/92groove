import Head from 'next/head';
import AudioPlayer from './AudioPlayer';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>92 Groove</title>
        <meta name="description" content="xxx" />
        <meta name="keywords" content="yyy" />
      </Head>
      <Header />
      {children}
      <AudioPlayer />
    </div>
  );
}

Layout.defaultProps = {
  keywords: 'deep house, underground house',
};
