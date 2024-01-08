const express = require("express")
const movBLL = require("../BLL/movieBLL")
const {checkAccess} = require("../middlewears/checkAccess")

// API - http://localhost:3000/movs

const movRouter = express.Router()
movRouter.use(checkAccess)

movRouter.get("/", async(req, res) =>{
    if(req.user.permissions.includes("View Movies")){
        const movies = await movBLL.getAllMovies()
        res.send(movies)
    }else{
        res.status(401).send({message: "You are not permitted to perform this action"})
    }
})

movRouter.get("/movies", async(req, res) =>{
    if(req.user.permissions.includes("View Movies")){
        const movies = await movBLL.getMoviesNoSubs()
        res.send(movies)
    }else{
        res.status(401).send({message: "You are not permitted to perform this action"})
    }
})

movRouter.get("/:id", async(req, res) =>{
    if(req.user.permissions.includes("View Movies")){
        const {id} = req.params
        const movie = await movBLL.getMovieById(id)
        res.send(movie)
    }else{
        res.status(401).send({message: "You are not permitted to perform this action"})
    }
})

movRouter.post("/", async(req, res) =>{
    if(req.user.permissions.includes("Create Movies")){
        try{
            const obj = req.body
            const movie = await movBLL.addMovie(obj)
            res.status(200).json({"message": "Movie Created!"})
        }catch(err){
            res.status(401).send(err)
        }
    }else{
        res.status(401).send({message: "You are not permitted to perform this action"})
    }    
})

movRouter.put("/:id", async(req, res) => {
    if(req.user.permissions.includes("Update Movies")){
        try{
            const obj = req.body
            const {id} = req.params
            const movie = await movBLL.updateMovie(id, obj)
            res.status(200).json({"message": "Movie Updated!"})
        }catch(err){
            res.status(401).send(err)
        }
    }else{
        res.status(401).send({message: "You are not permitted to perform this action"})
    }
})

movRouter.delete("/:id", async(req, res) => {
    if(req.user.permissions.includes("Delete Movies")){
        try{
            const {id} = req.params
            const movie = await movBLL.deleteMovie(id)
            res.status(200).json({"message": "Movie Deleted!"})
        }catch(err){
            res.status(401).send(err)
        }
    }else{
        res.status(401).send({message: "You are not permitted to perform this action"})
    }
})

module.exports = movRouter