import React from 'react';

const SongContext = React.createContext({
    song: null,
    currentSongList: [{}]
});

export default SongContext;