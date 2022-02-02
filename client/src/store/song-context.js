import React from 'react';

const SongContext = React.createContext({
    song: new Audio()
});

export default SongContext;