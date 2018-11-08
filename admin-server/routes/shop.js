const {Router} = require("express");
const router = Router();
const shop = require('../models/shop')
var axios =require('axios')
router.get('/',(req,res)=>{
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
  })

  router.get('/type',(req,res)=>{
 
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
    
  })

  //获取某一类
  router.post('/find',(req,res)=>{
    let {shoptype,goodstype}=req.body
    
    let obj={}
    if(goodstype){
      obj.goodstype=goodstype
    }
    if(shoptype){
      obj.shoptype=shoptype
    }
      shop.find(obj).then(data=>{
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
  })
// 搜索框查询（正则查询）
router.post('/regfind', (req, res) =>{
             let{findstr}=req.body
           
             let a=new RegExp( `^.*${findstr}.*$`)//存在是否存在以传入的title为内容的正则
             // let a=new RegExp(`^${req.params.title}`)
             // authorMsg:req.session.user._id
            shop.find({shopdetail:a}, function (err, data) {
            if(err){
                res.json({
                    code: 401,
                    msg:'未找到'
                })
            }
            else{
                res.json({
                    code: 200,
                    data
                })
            }
         });
   
  })

  router.get('/:id',(req,res)=>{
  
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
