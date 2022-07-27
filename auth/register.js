const router = require ("express").Router();
const User = require ("./../models/User")



router.post("/register", async (req, res) =>{
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    try {
        const savedUser = newUser.save();
        console.log(savedUser)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router