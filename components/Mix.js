import Image from 'next/image';
import { saveAs } from 'file-saver';

import { useContext } from 'react';

import { AudioContext } from '../context/AudioContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { API_URL } from '@/config';

import {
  faCartShopping,
  faPlay,
  faDownload,
} from '@fortawesome/free-solid-svg-icons';

import grooveLogo from '../public/images/grooveLogo.png';

const Mix = ({ mix }) => {
  const { dispatch } = useContext(AudioContext);

  const audioUrl = mix.audio.data.attributes.url;
  console.log(audioUrl);

  const saveFile = () => {
    saveAs(audioUrl);
  };

  const handleClick = () => {
    dispatch({
      type: 'SET_LOADING',
    });
    dispatch({
      type: 'GET_MIX',
      payload: {
        title: mix.title,
        audio: audioUrl,
      },
    });
  };

  return (
    <div className="mix flex">
      <div className="mix-info">
        {/* Image */}
        <Image
          src={
            mix.image.data !== null
              ? mix.image.data.attributes.formats.small.url
              : grooveLogo
          }
          alt="mix picture"
          width={1000}
          height={1000}
        />
        {/* Text */}
        <span>
          <h4>
            {mix.cat < 10 ? '00' : '0'}
            {mix.cat}
          </h4>
          <h1>{mix.title}</h1>
          <p>{mix.description}</p>
        </span>
      </div>
      {/* Links */}
      <div className="mix-links">
        <ul>
          <li>
            <a target="_blank" id="faIcon">
              <FontAwesomeIcon
                className="playDlBtn"
                id="faIcon"
                target="_blank"
                icon={faPlay}
                onClick={handleClick}
              />
            </a>
          </li>
          <li>
            <a target="_blank" id="faIcon">
              <FontAwesomeIcon
                className="playDlBtn"
                id="faIcon"
                target="_blank"
                icon={faDownload}
                onClick={saveFile}
              />
            </a>
          </li>
        </ul>
        <button>
          <a className="cassetteBtn" href={mix.link} id="faIcon">
            Buy Cassette{' '}
            <FontAwesomeIcon
              id="faIcon"
              target="_blank"
              icon={faCartShopping}
            />
          </a>
        </button>
      </div>
    </div>
  );
};

export default Mix;
