const subModel = require("../models/subModel")

//post request
async function addSub(obj){
    const sub = new subModel(obj)
    await sub.save() 
}

//put request
async function updateSub(id, obj){
    const sub = await subModel.findOne({memberId: id})
    if(sub){
        const newSub = {memberId: id, movies: [...sub.movies, obj]}
        await subModel.findOneAndUpdate({memberId: id}, newSub)
    }else{
        const newSub =new subModel({memberId: id, movies: [obj]})
        await newSub.save()
    }
}

module.exports = {addSub, updateSub}