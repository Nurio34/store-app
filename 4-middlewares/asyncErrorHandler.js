
const asyncErrorHandler = async(err,req,res,next) =>{
    res.status(500).send("Error detected bu asyncErrorHandler")
    next()
}

module.exports = asyncErrorHandler