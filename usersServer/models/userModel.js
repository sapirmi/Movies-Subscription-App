const mong = require("mongoose")
const bcrypt = require("bcrypt")
const env = require("../config/env.json")

const userSchema = new mong.Schema({
    username: {type: String,
        required: [true, "Please enter username"],
        unique: [true, "This username is already exists, please try again"]},
    password: {type: String},
    role: {type: String, default: "BASIC"}},
    { versionKey: false })

userSchema.pre('findOneAndUpdate', async function(next) {
    const update = this.getUpdate();
    if (update.password) {
        const salt = await bcrypt.genSalt(10);
        update.password = await bcrypt.hash(update.password, salt);
    }
    next();
});

const user = mong.model('user', userSchema);
module.exports = user;