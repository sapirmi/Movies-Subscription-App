const memberModel = require("../models/memberModel")
const subModel = require("../models/subModel")
const {group} = require("../middlewears/groupBy")

//get all members data (with subs) from all 3 collections
async function getAllMembers(){
  const members = await subModel.aggregate([
      {
        $unwind: '$movies', 
      },
      {
          $addFields: {
            'movies.movieId': { $toObjectId: '$movies.movieId' },
            "memberId": {$toObjectId: '$memberId'}
          },
        },
      {
          $lookup: {
            from: 'members',
            localField: 'memberId',    
            foreignField: '_id',           
            as: 'memberInfo',                   
          },
        },
      {
          $lookup: {
            from: 'movies',
            localField: 'movies.movieId',    
            foreignField: '_id',           
            as: 'movieInfo',                   
          },
        },
     ])
  return members}

//get all members (with and without subs)
async function getTotalMembers(){
  const subs = await getAllMembers()
  const newSubs = subs.map(sub => ({_id: sub.memberId, name: sub.memberInfo[0].name, email: sub.memberInfo[0].email,
    city: sub.memberInfo[0].city, movies: [{subDate: sub.movies.date, name: sub.movieInfo[0].name, 
    movieId: sub.movies.movieId}]}))
  const groupSubs = Object.values(group(newSubs, "_id", "movies"))
  const members = await memberModel.find()
  const subsIds = subs.map(sub => sub.memberId.toString())
  const noSubMembers = members.filter(member => !subsIds.includes(member._id.toString()))
  return [...groupSubs, ...noSubMembers]
}

//get by id request
async function getMemberById(id, subs){
  if(subs === "true"){
    const members = await getTotalMembers()
    return members.filter(member => member._id.toString() === id)
  }else{
    const member = await memberModel.findById(id)
    return member
  }
}

//post request
async function addMember(obj){
    const member = new memberModel(obj)
    await member.save()
}

//delete request
async function deleteMember(id){
  await memberModel.findByIdAndDelete(id)
  await subModel.findOneAndDelete({memberId: id})
}

//put request
async function updateMember(id, obj){
  await memberModel.findByIdAndUpdate(id, obj)
}

module.exports = {addMember, getMemberById, getAllMembers, getTotalMembers, deleteMember, updateMember}