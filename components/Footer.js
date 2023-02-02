import AudioPlayer from './AudioPlayer';
import styles from '@/styles/Footer.module.css';

function Footer() {
  return (
    <div className={styles.footer}>
      <AudioPlayer />
      <div className="container flex">
        <p>&copy; 92 Groove 2023</p>
      </div>
    </div>
  );
}

export default Footer;
