const routerImages = require ("express").Router();
const {isAdmin} = require("../handlers/isAdmin")
const {upload, uploadFile} = require("./../handlers/upload")

routerImages
.post("/" , upload, uploadFile, isAdmin);


module.exports = routerImages