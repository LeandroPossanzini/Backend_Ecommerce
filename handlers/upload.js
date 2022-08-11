const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads")
    },
    filename: function(req, file, cb){
        cb(null, file.originalname )
    }
})

const upload = multer({ storage:storage })
exports.upload = upload.single("miFoto")


exports.uploadFile = (req,res, next) =>{
    const file = req.file
    res.send({data:"El Archivo se subio correctamente", Url:`${file.destination}/${file.filename}`})
}