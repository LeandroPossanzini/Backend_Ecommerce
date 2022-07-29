const { verifyToken } = require("./verifyToken")

const authorization = (req,res, next) =>{
    verifyToken(req,res, () => {
        if( req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else {
            res.status(403).json("PERMISO_DENEGADO")
        }
    })
}

module.exports = { authorization }