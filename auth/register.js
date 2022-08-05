const router = require ("express").Router();
const User = require ("./../models/User")
const CryptoJS = require("crypto-js")
const sendEmail = require("../mail/emailUserRegister")

router.post("/", async (req, res) =>{
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
        lastname: req.body.lastname,
        phone: req.body.phone,
        url: req.body.url
    })

    try {
        const savedUser = await newUser.save();
        sendEmail.sendEmail(savedUser)
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router