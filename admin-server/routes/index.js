const {Router} = require("express")
const router = Router()
const path = require('path')

const users = require('./users')
const shops = require('./shop')
const order = require('./order')
router.use('/user',users)
router.use('/shop',shops)
router.use('/order',order)
module.exports = router;