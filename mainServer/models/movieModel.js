const mong = require('mongoose');

const movieSchema = new mong.Schema({
    name: {type: String, 
        required: [true, "You must enter a movie name."]},
    genres: {type: Array,
        validate: {validator: function(value){return value && value.length > 0}, 
                    message: "You must enter at least one movie genre."}},
    image: {type: String},
    premiered: {type: Date,
        required: [true, "You must enter a movie premier date."]}},
    { versionKey: false })

const movie = mong.model('movie', movieSchema);
module.exports = movie;