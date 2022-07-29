const { verifyToken } = require("./../middlewares/verifyToken")

const isAdmin = (req,res, next) =>{
    verifyToken(req,res, () => {
        if(req.user.isAdmin){
            next()
        }else {
            res.status(403).json("NO_SOS_ADMIN")
        }
    })
}

module.exports = {isAdmin}