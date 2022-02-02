import { useContext } from 'react';
import SongContext from '../store/song-context';
import Form from '../components/Form/Form';

function AddSong() {
    const ctx = useContext(SongContext);
    ctx.song.audio.pause();
    ctx.song.audio.currentTime = 0;

    return (
        <Form />
    )
}

export default AddSong;