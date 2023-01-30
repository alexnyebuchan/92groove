import Image from 'next/image';

import styles from '@/styles/Header.module.css';
import grooveLogo from '../public/images/grooveLogoThree.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faInstagram,
  faSoundcloud,
  faBandcamp,
} from '@fortawesome/free-brands-svg-icons';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className="container flex">
        <Image src={grooveLogo} alt="92 Groove" id="img" />
        <p>
          Contact: <a href="mailto: 92groove@gmail.com">92groove@gmail.com</a>
        </p>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://www.instagram.com/al_zanders/?hl=en"
              id="faIcon"
            >
              <FontAwesomeIcon id="faIcon" target="_blank" icon={faInstagram} />
            </a>
          </li>
          <li>
            <a href="https://soundcloud.com/discover" id="faIcon">
              <FontAwesomeIcon
                id="faIcon"
                target="_blank"
                icon={faSoundcloud}
              />
            </a>
          </li>
          <li>
            <a href="https://bandcamp.com/" id="faIcon">
              <FontAwesomeIcon id="faIcon" target="_blank" icon={faBandcamp} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
