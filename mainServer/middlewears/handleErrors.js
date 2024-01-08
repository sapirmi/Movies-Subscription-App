function handleErrors(err){
    return err.response.data
}

module.exports = {handleErrors}