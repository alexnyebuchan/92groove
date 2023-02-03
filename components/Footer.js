import { useContext } from 'react';
import AudioPlayer from './AudioPlayer';
import styles from '@/styles/Footer.module.css';
import { AudioContext } from '../context/AudioContext';

function Footer() {
  const { state } = useContext(AudioContext);

  return (
    <div className={styles.footer}>
      {state.audio && <AudioPlayer />}

      <div className="container flex">
        <p>&copy; 92 Groove 2023</p>
      </div>
    </div>
  );
}

export default Footer;
