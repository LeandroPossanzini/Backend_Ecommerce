const User = require("../models/User");
const CryptoJS = require ("crypto-js");


//OBTENER USUARIO POR ID
async function getUserByID(req, res){
    try {
         const user = await User.findById(req.params.id)
         const { password, ...restoUser } = user._doc
         res.status(200).json(restoUser)
    } catch (error) {
         res.status(500).json(error)
    }
}
//OBTENER TODOS LOS USUARIOS
async function getAllUsers(_req, res){
    try {
         const users = await User.find()
         res.status(200).json(users)
    } catch (error) {
         res.status(500).json(error)
    }
}
//UPDATE USER
async function updateUsers(req, res) {
    if(req.body.password){
         req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
    }
    try {
         const updateUser = await User.findByIdAndUpdate(req.params.id, {
             $set: req.body
         }, {new:true});
         res.status(200).json(updateUser)
    } catch (error) {
         res.status(500).json(error)
    }
 }

 // DELETE User
async function deleteUser(req, res){
    try {
         await User.findByIdAndDelete(req.params.id)
         res.status(200).json("El usuario fue eliminado...")
    } catch (error) {
         res.status(500).json(error)
    }
}
module.exports={
    getUserByID,
    getAllUsers,
    updateUsers,
    deleteUser
}