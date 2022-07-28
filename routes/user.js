const User = require("../models/User");
const {authorization} = require("./../middleware/authorization")
const router = require ("express").Router();
const CryptoJS = require ("crypto-js")

//UPDATE
router.put("/:id", authorization, async (req, res) =>{
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
})

module.exports = router