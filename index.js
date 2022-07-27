const express = require("express")
const { default: mongoose } = require("mongoose")
const app = express()
const moongose = require ("mongoose")
const dotenv = require ("dotenv")
const userRoute = require("./routes/user")


dotenv.config();

mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("*****Base de datos conectada*****"))
    .catch((e) => console.log(e))

app.use(express.json())
    
app.use("/registro" , userRoute)
app.use("/login" , userRoute)    

app.listen(process.env.PORT || 5000, () => {
    console.log("Servidor ok")
})