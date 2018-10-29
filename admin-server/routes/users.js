const {Router} = require("express");
const router = Router();
const user = require('../models/user')
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
