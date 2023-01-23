import React, { useState, useEffect, useRef, useContext } from 'react';
import { AudioContext } from '../context/AudioContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

const AudioPlayer = () => {
  // Context
  const { state, dispatch } = useContext(AudioContext);

  //State
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Reference
  const audioPlayer = useRef(); //audio component
  const progressBar = useRef(); // progress bar
  // progressBar.current = state.
  const animationRef = useRef(); // animation

  useEffect(() => {
    setIsPlaying(state.playing);
    animationRef.current = requestAnimationFrame(whilePlaying);
    const seconds = Math.floor(
      !isNaN(audioPlayer.current.duration) ? audioPlayer.current.duration : 0
    );
    console.log(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
    if (state.playing) {
      audioPlayer.current.play();
    } else if (!state.playing && state.audio) {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }, [state.playing]);

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
    <center className="audioPlayer">
      {state.title && <p className="currentPlaying"> {state.title}</p>}

      <span className="playItems">
        <audio ref={audioPlayer} src={state.audio} preload="metadata" />
        <button className="playPause" onClick={togglePlayPause}>
          {state.playing ? (
            <FontAwesomeIcon id="faIcon" target="_blank" icon={faPause} />
          ) : (
            <FontAwesomeIcon
              className="play"
              id="faIcon"
              target="_blank"
              icon={faPlay}
            />
          )}
        </button>

        {/* current time */}
        <div className="currentTime">{calculateTime(currentTime)}</div>

        {/* Progress bar */}
        <div>
          <input
            className="progressBar"
            type="range"
            defaultValue="0"
            ref={progressBar}
            onChange={changeRange}
          />
        </div>
        {/* duration */}
        <div className="duration">
          {!isNaN(duration) && calculateTime(duration)}
        </div>
      </span>
    </center>
  );
};

export default AudioPlayer;
