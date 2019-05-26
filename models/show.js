const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Show = db.model('show', {
    num: Number,
    name: String,
    performer: String,
    needed: {
        mic: String,
        music: String,
        curtain: String,
        light: String,
        other: String
    },
    img: String
});

module.exports = Show;