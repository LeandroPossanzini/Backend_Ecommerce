const router = require('express').Router()
const routerCart = require('./Carts.routes')
const routerProduct = require('./Products.routes')
const routerUser = require('./User.routes')
const routerOrder = require('./Order.routes')
const getInfo = require('../controllers/Info.controller')

router
.get('/info', getInfo)
.use('/api/shoppingcartproducts', routerCart)
.use('/api/products', routerProduct)
.use('/login', routerUser)
.use('/api/orders', routerOrder)

module.exports = router