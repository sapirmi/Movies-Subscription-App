function handleRouterErrors(res){
    const errs = []
    for(key in res.errors){
        errs.push(res.errors[key].message);
    }
    return errs.join(" ")
}

module.exports = {handleRouterErrors}