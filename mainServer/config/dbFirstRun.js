const axios = require("axios")
const memberBLL = require("../BLL/memberBLL")
const movieBLL = require("../BLL/movieBLL")

const memberURL = "https://jsonplaceholder.typicode.com/users"
const moviesURL = "https://api.tvmaze.com/shows"

async function getDataToDB(){
    const {data: subs} = await axios.get(memberURL)
    subs.forEach(async (item) => {
        await memberBLL.addMember({name: item.name, email: item.email, city: item.address.city})
    })

    const {data: movies} = await axios.get(moviesURL)
    movies.forEach(async (movie) => {
        await movieBLL.addMovie({name: movie.name, genres: movie.genres,
            image: movie.image.medium, premiered: movie.premiered})
    })
    console.log("data in db");
}

module.exports = getDataToDB