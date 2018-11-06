
const {Router} = require("express");
const router = Router();
const user = require('../models/user')
const shop =require('../models/shop')
router.get('/',(req,res)=>{
  if(req.session.user){
      user.findOne({username:req.session.user.username}).then(data=>{
        res.json({
            code: 200,
            data:data,
            msg: '已登录'
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


//获取消息
router.get('/message',(req,res)=>{
    if(req.session.user){
        user.findOne({username:req.session.user.username})
        .select('-password')
        .then(data=>{
            for(let i=0;i<data.chat.length;i++){
               shop.findOne({_id:data.chat[i].objectShop}).then(data1=>{
                   data.chat[i].shop=data1
                   user.findOne({_id:data.chat[i].objectFrom}).then(data2=>{
                    data.chat[i].From=data2
                    user.findOne({_id:data.chat[i].objectTo}).then(data3=>{
                        data.chat[i].To=data3
                        // data.save()
                        if(i==data.chat.length-1){
                            back()
                        }
                    })
                })
               })  
            }
            if(!data.chat.length){
                    res.json({
                        code: 200,
                        data,
                        msg: '没有数据'
                    })
            }
        function back(){
            res.json({
                code: 200,
                data:data,
                msg: '已登录'
            })
        }
        })
    }
  
    else{
      res.json({
          code: 400,
          msg: '未登录'
      })
    }
  })
//注册
router.post('/regist', (req, res) => {
    let {username, password} = req.body;
    if(username&&password){
        user.findOne({username}).then(data=>{
            if(data){
               res.json({
                   code: 401,
                   msg: '该身份已注册'
               })
            }
            else{
               user.create({
                   username,
                   password,
                    }).then((data) => {
                   res.json({
                       code: 200,
                       data,
                       msg: '注册成功'
                   })
               })
            }
        })
    }
    else{
        res.json({
            code: 402,
            msg: '信息填写不完整'
        })
    }
})
//添加消息窗口
router.post('/addchatwin',(req,res)=>{
    let{fromid,toid,shopid}=req.body
    if(req.session.user){
        user.findOne({_id:req.session.user._id}).then(data=>{
            var flag=true
            for(let i=0;i<data.chat.length;i++){
                if(data.chat[i].objectShop==shopid&&data.chat[i].objectFrom==fromid&&data.chat[i].objectTo==toid){
                    flag=false
                    res.json({
                        code: 200,
                        msg: '存在对话窗口'
                    }) 
                    return
                }
            }
            if(flag){
                data.chat.push({
                    objectShop:shopid,
                    objectFrom:fromid,
                    objectTo:toid,
                    noLooknum:0,
                    content:[]
                })
                user.findOne({_id:toid}).then(data2=>{
                    data2.chat.push({
                        objectShop:shopid,
                        objectFrom:fromid,
                        objectTo:toid,
                        noLooknum:0,
                        content:[]
                    })
                    data.save()
                    data2.save()
                    res.json({
                        code: 200,
                        msg: '成功新建对话窗口'
                    }) 
                })
            }
        })
    }
    else{
        res.json({
            code: 400,
            msg: '未登录'
        })   
    }
})


//添加消息
router.post('/addchat', (req,res)=>{
    if(req.session.user){
       let{fromid,toid,shopid,content,type}=req.body
       user.findOne({_id:req.session.user._id}).then(data=>{
       for(let i=0;i<data.chat.length;i++){
        if(data.chat[i].objectShop==shopid&&data.chat[i].objectFrom==fromid&&data.chat[i].objectTo==toid){
            data.chat[i].content.push({
                type,
                content
            })
            data.chat[i].noLooknum+=1,
            data.save()
            if(fromid==req.session.user._id){
                user.findOne({_id:toid}).then(data2=>{
                    data2.chat[i].content.push({
                        type:!type,
                        content
                    })
                    data2.chat[i].noLooknum+=1,
                    data2.save()
                    res.json({
                        code: 200,
                        msg: '发送成功'
                    })  
                   })
            }
            else{
                user.findOne({_id:fromid}).then(data2=>{
                    data2.chat[i].content.push({
                        type:!type,
                        content
                    })
                    data2.chat[i].noLooknum+=1,
                    data2.save()
                    res.json({
                        code: 200,
                        msg: '发送成功'
                    })  
                   }) 
            }
         
        }
       }

       })
    }
    else{
        res.json({
            code: 400,
            msg: '未登录'
        })  
    }
})

//添加或取消关注店铺
router.post('/love',(req,res)=>{
    if(req.session.user){
       let {shopid,type}=req.body
   if(type){
    user.update({_id:req.session.user._id},{$push:{loveshop:shopid}}).then(
        data=>{
         res.json({
             code: 200,
             data,
             msg: '添加成功'
         })
        }
    ).catch(err=>{
     res.json({
         code: 400,
         err,
         msg: '添加失败'
     })
    })
   }
   else{
    user.update({_id:req.session.user._id},{$pull:{loveshop:shopid}}).then(
        data=>{
         res.json({
             code: 200,
             data,
             msg: '取消成功'
         })
        }
    ).catch(err=>{
     res.json({
         code: 400,
         err,
         msg: '添加失败'
     })
    })
   }
    }
    else{
      res.json({
          code: 400,
          msg: '未登录'
      })
    }

})
//添加或取消收藏店铺
router.post('/collection',(req,res)=>{
    if(req.session.user){
       let {shopid,type}=req.body
   if(type){
    user.update({_id:req.session.user._id},{$push:{collectshop:shopid}}).then(
        data=>{
         res.json({
             code: 200,
             data,
             msg: '添加成功'
         })
        }
    ).catch(err=>{
     res.json({
         code: 400,
         err,
         msg: '添加失败'
     })
    })
   }
   else{
    user.update({_id:req.session.user._id},{$pull:{collectshop:shopid}}).then(
        data=>{
         res.json({
             code: 200,
             data,
             msg: '取消成功'
         })
        }
    ).catch(err=>{
     res.json({
         code: 400,
         err,
         msg: '添加失败'
     })
    })
   }
    }
    else{
      res.json({
          code: 400,
          msg: '未登录'
      })
    }

})

router.get('/logout',(req,res)=>{
    if(req.session.user){
        req.session.destroy();
        res.json({
            code: 200,
            msg: '退出登录成功'
        })
    }
    else{
      res.json({
          code: 400,
          msg: '未登录'
      })
    }
  })
//修改个人信息
router.post('/user/updateinfo',(req,res)=>{
    let{username,avatar} = req.body
      user.update({id:req.session.user.id},{$set:{username:username,avatar:avatar}}).then(data=>{
          console.log(data)
        res.json({
            code: 200,
            data,
            msg: '修改成功'
        })
      }).catch(err=>{
        res.json({
            code: 400,
            msg: '修改失败'
        })
      })
  })


//更新密码
router.post('/updatepsd',(req,res)=>{
    let {newpsd, oldpsd} = req.body;
    if(req.session.user.password==oldpsd){
        user.update({id:req.session.user.id},{$set:{password:newpsd}}).then(data=>{
            req.session.destroy();
            res.json({
                code: 200,
                data,
                msg: '修改成功，请重新登录'
            })
        })
    }
    else{
        res.json({
            code: 400,
            msg: '密码错误'
        })
    }
})

//登录
router.post('/login', (req, res) => {
    let {username, password} = req.body;
    user.findOne({username}).then((data) => {
        if (!data) {
            res.json({
                code: 401,
                msg: '该用户名不存在'
            })
        }
        else if (data.password != password) {
            res.json({
                code: 401,
                msg: '密码不正确'
            })
        }
        else if (data.password == password) {
            req.session.user = data;
            res.json({
                code: 200,
                data,
                msg: '登录成功'
            })
        }
    })
})


module.exports = router;
