import Layout from '../components/Layout';

import { useReducer } from 'react';
import { AudioContext } from '../context/AudioContext';
import audioReducer from '../context/AudioReducer';

export default function HomePage() {
  const initialState = {
    title: null,
    audio: null,
    loading: true,
    playing: false,
  };

  const [state, dispatch] = useReducer(audioReducer, initialState);

  return (
    <AudioContext.Provider value={{ state, dispatch }}>
      <Layout>
        <h1>Hi</h1>
      </Layout>
    </AudioContext.Provider>
  );
}
