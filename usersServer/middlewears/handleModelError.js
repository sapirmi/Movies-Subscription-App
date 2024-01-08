function handleError(err){
    if (err.code === 11000 || err.code === 11001){
        return "Username already exists, please try different Username." 
    }
    if (err.name === "ValidationError"){
        return "Username is required."
    } else {
        return { err }
    }
  }

module.exports = {handleError}