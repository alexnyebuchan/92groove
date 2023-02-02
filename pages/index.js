import Layout from '../components/Layout';
import Mixes from '../components/Mixes';

import { API_URL } from '@/config/index';

import { useReducer } from 'react';
import { AudioContext } from '../context/AudioContext';
import audioReducer from '../context/AudioReducer';

export default function HomePage({ mixes }) {
  const initialState = {
    title: '92 GROOVE',
    audio: null,
    loading: false,
    playing: false,
  };

  const [state, dispatch] = useReducer(audioReducer, initialState);

  return (
    <AudioContext.Provider value={{ state, dispatch }}>
      <Layout>
        <Mixes mixes={mixes} />
      </Layout>
    </AudioContext.Provider>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/mixes?sort=cat:ASC&populate=*`);
  const jsonRes = await res.json();
  const mixes = jsonRes.data;

  return {
    props: { mixes },
  };
}
