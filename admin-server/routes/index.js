const {Router} = require("express")
const router = Router()
const path = require('path')

const users = require('./users')
const shops = require('./shop')
router.use('/user',users)
router.use('/shop',shops)
module.exports = router;