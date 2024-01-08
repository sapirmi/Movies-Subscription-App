const movieModel = require("../models/movieModel")
const subModel = require("../models/subModel")
const memberBLL = require("./memberBLL")
const {group} = require("../middlewears/groupBy")


//organize output for sub comp in all movies page
async function getMovieSubs(){
  const subs = await memberBLL.getAllMembers()
  const moviesSubs =  subs.map((item) => ({genres: item.movieInfo[0].genres, image: item.movieInfo[0].image,
  name: item.movieInfo[0].name, premiered: item.movieInfo[0].premiered, _id: item.movies.movieId,
  subs: [{memberId: item.memberInfo[0]._id, name: item.memberInfo[0].name, date: item.movies.date}]}))
  const groupMovies = group(moviesSubs, "_id", "subs")
  return Object.values(groupMovies)
}

//get request - movies with subs
async function getAllMovies(){
  const movies = await movieModel.find()
  const subsMovies = await getMovieSubs()

  const movieIds = subsMovies.map(sub => sub._id.toString())
  const noSubMovies = movies.filter(movie => !movieIds.includes(movie._id.toString()))
  return [...subsMovies, ...noSubMovies]
}

async function getMoviesNoSubs(){
  const movies = await movieModel.find()
  return movies
}

//post request
async function addMovie(obj){
    const movie = new movieModel(obj)
    if(movie){
      await movie.save()
    }
}

//get by id request
async function getMovieById(id){
  const movie = await movieModel.findById(id)
  return movie
}

//put request
async function updateMovie(id, obj){
  await movieModel.findByIdAndUpdate(id, obj)
}

//delete request
async function deleteMovie(id){
  try {
    await movieModel.findByIdAndDelete(id)
    const result = await subModel.updateMany(
      { 'movies.movieId': id },
      { $pull: { movies: { movieId: id } } }
    );
  } catch (error) {
    return error
  }}

module.exports = {addMovie, getAllMovies, getMovieById, updateMovie, deleteMovie, getMoviesNoSubs}