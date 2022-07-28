const express = require("express")
const { default: mongoose } = require("mongoose")
const app = express()
const dotenv = require ("dotenv")
const userRoute = require("./routes/user")
const registerUser = require("./auth/register")
const loginUser = require("./auth/login")


dotenv.config();
app.use(express.json())
mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("*****Base de datos conectada*****"))
    .catch((e) => console.log(e))


    
app.use("/registro" , registerUser)
app.use("/login" , loginUser)
app.use("/login", userRoute )    

app.listen(process.env.PORT || 5000, () => {
    console.log("Servidor ok")
})