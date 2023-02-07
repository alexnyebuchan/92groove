import React, { useState, useEffect, useRef, useContext } from 'react';

import { AudioContext } from '../context/AudioContext';

import styles from '@/styles/AudioPlayer.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faPause,
  faPlay,
  faVolumeHigh,
  faVolumeMute,
} from '@fortawesome/free-solid-svg-icons';

const AudioPlayer = () => {
  //State
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);
  const [showVolume, setShowVolume] = useState(false);

  // Context
  const { state, dispatch } = useContext(AudioContext);

  // Reference
  const audioPlayer = useRef(); //audio component
  const progressBar = useRef(); // progress bar
  const animationRef = useRef(); // animation

  useEffect(() => {
    if (state.playing) {
      audioPlayer.current.play();
    } else if (!state.playing && state.audio) {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
    const currentAudio = audioPlayer.current;
    currentAudio.onloadeddata = () => {
      animationRef.current = requestAnimationFrame(whilePlaying);
      const seconds = Math.floor(
        !isNaN(audioPlayer.current.duration) ? audioPlayer.current.duration : 0
      );
      setDuration(seconds);
      progressBar.current.max = seconds;
    };
  }, [state]);

  const calculateTime = (secs) => {
    const hours = Math.floor(secs / 3600);
    const returnedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const minutes = Math.floor(secs / 60);
    const calculatedMinutes = minutes >= 60 ? minutes - 60 : minutes;
    const returnedMinutes =
      calculatedMinutes < 10 ? `0${calculatedMinutes}` : `${calculatedMinutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    if (returnedHours < 1) {
      return `${returnedMinutes}:${returnedSeconds}`;
    } else {
      return `${returnedHours}:${returnedMinutes}:${returnedSeconds}`;
    }
  };

  const togglePlayPause = () => {
    const prevValue = state.playing;
    dispatch({
      type: 'TOGGLE_PLAY',
      payload: {
        playing: !prevValue,
      },
    });
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      '--seek-before-width',
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    audioPlayer.current.volume = event.target.value / 100;
  };

  const handleVolumeButton = () => {
    const prevValue = showVolume;
    setShowVolume(!prevValue);
  };

  return (
    <center className={styles.audioPlayer}>
      <div className={styles.infoVol}>
        {state.loading && (
          <>
            <p className={styles.currentPlay}>Loading... </p>
          </>
        )}
        {state.audio && (
          <>
            <p className={styles.currentPlay}>
              Currently Playing: {state.title}
            </p>
          </>
        )}
        <div>
          <a href="#" onClick={handleVolumeButton}>
            {volume > 0 ? (
              <FontAwesomeIcon
                className={styles.volumeBtn}
                id="faIcon"
                target="_blank"
                icon={faVolumeHigh}
              />
            ) : (
              <FontAwesomeIcon
                className={styles.volumeBtn}
                id="faIcon"
                target="_blank"
                icon={faVolumeMute}
              />
            )}
          </a>

          {showVolume && (
            <div className={styles.volume}>
              <input
                className={styles.volumeInput}
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>
          )}
        </div>
      </div>

      <span className={styles.playItems}>
        <audio
          ref={audioPlayer}
          src={state.audio}
          preload="metadata"
          id="audioFile"
        />
        <button className={styles.playPause} onClick={togglePlayPause}>
          {state.playing ? (
            <FontAwesomeIcon id="faIcon" target="_blank" icon={faPause} />
          ) : (
            <FontAwesomeIcon
              className={styles.play}
              id="faIcon"
              target="_blank"
              icon={faPlay}
            />
          )}
        </button>

        <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

        <div>
          <input
            className={styles.progressBar}
            type="range"
            defaultValue="0"
            ref={progressBar}
            onChange={changeRange}
          />
        </div>

        <div className={styles.duration}>
          {!isNaN(duration) && calculateTime(duration)}
        </div>
      </span>
    </center>
  );
};

export default AudioPlayer;
