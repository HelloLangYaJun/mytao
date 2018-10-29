const mongoose = require("mongoose");
const user = new mongoose.Schema({
    username: String,
    identity:{
        type: String,
        default: '普通会员',
        require:true,
    },
    integral:{
        type: Number,
        default: '50',
        require:true,
    },
    password: String,
    avatar: {
        type: String,
        default: 'http://pic.eastlady.cn/uploads/tp/201604/64/38.jpg',
        require:true,
    },
    address:{
        type: String,
    },
    order:[
        {
            type:mongoose.Schema.Types.ObjectId,
            timestamps: {createAt: "createTime", updateAt: "updateTime"},
            ref:'order'
        }
    ],
    collectshop:[
        {
           type:mongoose.Schema.Types.ObjectId,
           timestamps: {createAt: "createTime", updateAt: "updateTime"},
           ref:'shop'
        }
    ],
    loveshop:[
        {
           type:mongoose.Schema.Types.ObjectId,
           timestamps: {createAt: "createTime", updateAt: "updateTime"},
           ref:'shop'
        }
    ],
    lookshop:[
        {
           type:mongoose.Schema.Types.ObjectId,
           timestamps: {createAt: "createTime", updateAt: "updateTime"},
         
           ref:'shop'
        }
    ],      
}, {versionKey: false,timestamps: {createAt: "createTime", updateAt: "updateTime"}})

module.exports = mongoose.model("user", user)