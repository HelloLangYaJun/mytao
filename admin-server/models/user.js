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
    chat:[
        {
            //商店id
            objectShop:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'shop'
            },
            shop:{
                type:Object
            },
            //发送人id
            objectFrom:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'user'
            },
            From:{
                type:Object
            },
             //接收人id
            objectTo:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'user'
            },
            To:{
                type:Object
            },
            //未接收信息
            noLooknum:{
                type: Number,
                default:0,
            },
            content:[
                {
                    type:{
                        type:Boolean,
                    },
                   content:{
                    type: String,
                    default: '',
                    require:true, 
                   },               
                }
            ]  ,
            updatedAt: { type: Date, default: Date.now }        
        },    
    ],
    collectshop:[
        {
           type:mongoose.Schema.Types.ObjectId,
           ref:'shop'
        }
    ],
    loveshop:[
        {
           type:mongoose.Schema.Types.ObjectId,
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