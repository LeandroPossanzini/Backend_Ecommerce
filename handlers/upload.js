const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads")
    },
    filename: function(req, file, cb){
        console.log(file)
        cb(null, file.originalname )
    }
})

const upload = multer({ storage:storage })

exports.upload = upload.single("miFoto")

exports.uploadFile = (req,res) =>{
    res.send({data:"El Archivo se subio correctamente"})
}