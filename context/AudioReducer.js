const audioReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        title: 'Loading...',
        loading: true,
        playing: false,
      };
    case 'GET_MIX':
      return {
        ...state,
        title: action.payload.title,
        audio: action.payload.audio,
        loading: false,
        playing: true,
      };
    case 'TOGGLE_PLAY':
      return {
        ...state,
        loading: false,
        playing: action.payload.playing,
      };

    default:
      return state;
  }
};

export default audioReducer;
