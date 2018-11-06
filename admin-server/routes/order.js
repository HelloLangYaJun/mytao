const {Router} = require('express');
const router  = Router();
const order =require('../models/order')
router.post('/',async (req, res, next) => {
    try{

    }catch(err){
        next(err)
    }
})

module.exports = router
