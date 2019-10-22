const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemeSchema = new Schema({
    title: String,
    link: String,
    postdate: Date,
    likes: Number,
    poster: String,
    tags: [String],
    template: [String],
})

const Meme = mongoose.model('Meme', MemeSchema);

module.exports = Meme;