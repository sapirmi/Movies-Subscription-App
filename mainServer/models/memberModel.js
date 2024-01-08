const mong = require('mongoose');

const memberSchema = new mong.Schema({
    name: {type: String},
    email: {type: String},
    city: {type: String}},
    { versionKey: false })

const member = mong.model('member', memberSchema);
module.exports = member;