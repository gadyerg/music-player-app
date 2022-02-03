const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    cover: String,
    song: {
        type: String,
        required: true
    }
});

const Song = new mongoose.model('Song', songSchema);

module.exports = Song;