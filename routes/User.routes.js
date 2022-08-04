const {authorization} = require("../middlewares/authorization")
const routerUser = require ("express").Router();
const { isAdmin } = require("../handlers/isAdmin");
const { verifyToken } = require("../middlewares/verifyToken");
const {getUserByID, getAllUsers, updateUsers,deleteUser} = require("../controllers/User.controllers")


routerUser
//solo si es el admin
.get("/:id", isAdmin , getUserByID )
.get("/", isAdmin , getAllUsers )
.delete("/:id", verifyToken , deleteUser )
//cualquier usuario
.put("/:id", authorization, updateUsers )




module.exports = routerUser