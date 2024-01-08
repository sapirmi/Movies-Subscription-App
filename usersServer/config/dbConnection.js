const mong = require("mongoose")

function connectDB(){
    mong.connect("mongodb://127.0.0.1:27017/ProjectData")
    .then(() => console.log("connected to db (userServer)"))
    .catch((err) => console.log(err))
}

module.exports = connectDB