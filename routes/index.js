const router = require('express').Router()
const routerCart = require('./Carts.routes')
const routerProduct = require('./Products.routes')
const routerUser = require('./User.routes')

router
.use('/api/shoppingcartproducts', routerCart)
.use('/api/products', routerProduct)
.use('/login', routerUser)


module.exports = router