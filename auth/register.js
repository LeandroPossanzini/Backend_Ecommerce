const router = require ("express").Router();
const User = require ("./../models/User")
const CryptoJS = require("crypto-js")


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
        console.log(savedUser)
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router