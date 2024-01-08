const mong = require('mongoose');

const subSchema = new mong.Schema({
    memberId: {type: String},
    movies: [{
        movieId: {type: String, required: [true, "You must choose a movie."]},
        date: {type: Date, required: [true, "You must enter a subscription date."]}
    }]},
    { versionKey: false })

const sub = mong.model('subscription', subSchema);
module.exports = sub;