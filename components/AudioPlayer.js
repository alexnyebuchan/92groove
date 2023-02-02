import React, { useState, useEffect, useRef, useContext } from 'react';

import { AudioContext } from '../context/AudioContext';

import styles from '@/styles/AudioPlayer.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

const AudioPlayer = () => {
  // Context
  const { state, dispatch } = useContext(AudioContext);

  //State
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Reference
  const audioPlayer = useRef(); //audio component
  const progressBar = useRef(); // progress bar
  const animationRef = useRef(); // animation

  useEffect(() => {
    setTimeout(() => {
      animationRef.current = requestAnimationFrame(whilePlaying);
      const seconds = Math.floor(
        !isNaN(audioPlayer.current.duration) ? audioPlayer.current.duration : 0
      );
      setDuration(seconds);
      progressBar.current.max = seconds;

      if (state.playing) {
        audioPlayer.current.play();
      } else if (!state.playing && state.audio) {
        audioPlayer.current.pause();
        cancelAnimationFrame(animationRef.current);
      }
    }, '500');
  }, [state]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
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

  return (
    <center className={styles.audioPlayer}>
      {state.loading && (
        <>
          <p className="currentPlaying">Loading... </p>
        </>
      )}
      {state.audio && (
        <>
          <p className="currentPlaying">Currently Playing: {state.title}</p>
        </>
      )}
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
      {/* <AudioView
        styles={styles}
        audio={state.audio}
        togglePlayPause={togglePlayPause}
        calculateTime={calculateTime}
      /> */}
    </center>
  );
};

export default AudioPlayer;
