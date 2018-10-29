const {Router} = require("express");
const router = Router();
const shop = require('../models/shop')
router.get('/',(req,res)=>{
    if(req.session.user){
      shop.find({}).then(data=>{
        res.json({
            code: 200,
            data,
            msg: '成功'
        }) 
      }).catch(err=>{
        res.json({
            code: 400,
            err,
            msg: '失败'
        }) 
      })
    }
    else{
      res.json({
          code: 400,
          msg: '未登录'
      })
    }
  })
  
  router.get('/:id',(req,res)=>{
    if(req.session.user){
    //    console.log(req.params.id) 
      shop.findOne({_id:req.params.id}).then(data=>{
        res.json({
            code: 200,
            data,
            msg: '成功'
        }) 
      }).catch(err=>{
        res.json({
            code: 400,
            err,
            msg: '失败'
        }) 
      })
    }
    else{
      res.json({
          code: 400,
          msg: '未登录'
      })
    }
  })
  
  router.post('/add',(req,res)=>{
      let{
        shopname,
        shopdetail,
        shopimg,
        shopimgs,
        shoptype,
        goodstype,
        goods,
      }= req.body;

    if(req.session.user){
        shop.create({
            shopkeeper:req.session.user._id,
            shopname,
            shopdetail,
            shopimg,
            shopimgs,
            shoptype,
            goodstype,
            goods, 
        }).then(data=>{
            res.json({
                code: 200,
                data,
                msg: '添加成功'
            })
        }).catch(err=>{
            res.json({
                code: 400,
                err,
                msg: '添加失败'
            })
        })
    }
    else{
      res.json({
          code: 400,
          msg: '未登录'
      })
    }
  })

module.exports = router;
