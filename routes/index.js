const router = require('express').Router()
const routerCart = require('./Carts.routes')
const routerProduct = require('./Products.routes')
const routerUser = require('./User.routes')
const routerOrder = require('./Order.routes')
router
.use('/api/shoppingcartproducts', routerCart)
.use('/api/products', routerProduct)
.use('/login', routerUser)
.use('/api/orders', routerOrder)

module.exports = router