const router = require ("express").Router();
const User = require ("./../models/User")
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")

router.post("/", async (req, res) =>{
    try {
        const user = await User.findOne({email:req.body.email});
        !user && res.status(401).json("EMAIL_INCORRECTO")

        const hash = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const passwordNew = hash.toString(CryptoJS.enc.Utf8);

        const accessToken = jwt.sign({
            id:user._id,
            isAdmin: user.isAdmin,
        }, 
        process.env.JWT_SECRET_KEY,
        {expiresIn:"3d"}
        );

        passwordNew !== req.body.password && res.status(401).json("PASSWORD_INCORRECTO");

        // desestructuro el usuario para no pasar la contraseña encriptada
        const {password , ...restoUser} = user._doc

        res.status(200).json({...restoUser, accessToken})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router