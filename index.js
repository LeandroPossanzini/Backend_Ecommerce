const express = require("express")
const { default: mongoose } = require("mongoose")
const app = express()
const dotenv = require ("dotenv")
const userRoute = require("./routes/user")
const registerUser = require("./auth/register")
const loginUser = require("./auth/login")
const products = require("./routes/products")
const carts = require("./routes/carts")
const orders = require("./routes/order")
const Message = require("./models/Message")

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


dotenv.config();
app.use(express.json())
mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("*****Base de datos conectada*****"))
    .catch((e) => console.log(e))

// WEBSOCKET
const mensajes = []
io.on('connection', socket => {

    socket.emit('mensajes', mensajes)
    socket.on('nuevoMensaje', mensaje => {
        mensajes.push(mensaje)
        io.sockets.emit('mensajes', mensajes)
        const guardar = async () =>{
            const newMessage = new Message(mensaje)
            try {
                const guardar = await newMessage.save()
            } catch (error) {
                console.log(error)
            }
        }
        guardar()
    })
})


app.use(express.static('public'))     
app.use("/registro" , registerUser)
app.use("/login" , loginUser)
app.use("/login", userRoute )    
app.use("/api/products", products)
app.use("/api/shoppingcartproducts", carts)
app.use("/api/orders", orders)

httpServer.listen(process.env.PORT || 5000, () => {
    console.log("Servidor ok")
})