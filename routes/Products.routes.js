const routerProduct = require ("express").Router();
const {createProduct, updateProducts, getByID,deleteByID, getAll }= require('../controllers/Products.controllers')
const { isAdmin } = require("../handlers/isAdmin");
const { upload , uploadFile} = require("../handlers/upload");
const { verifyToken } = require("../middlewares/verifyToken");


routerProduct
 //SOLO SI ES ADMIN Y ESTA LOGEADO
.post("/upload" , upload, uploadFile, isAdmin)
.post("/", verifyToken ,isAdmin ,createProduct )
.put("/:id", verifyToken ,isAdmin , updateProducts )
.get("/:id", verifyToken, isAdmin ,getByID )
.delete("/:id", verifyToken, isAdmin , deleteByID )
//SIN LOGUEO Y SIN SER ADMIN
.get("/", getAll )

module.exports = routerProduct