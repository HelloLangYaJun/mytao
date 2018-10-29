const mongoose = require("mongoose");
const shop = new mongoose.Schema({
    shopkeeper:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    shopname:{
        type:String,
        require:true
    },
    shopdetail:{
        type:String,
        require:true
    },
    goodstype:{
        type:Number,
        require:true 
    },
    shoptype:{
        type:Number,
        require:true 
    },
    goods:[
        {
            goodsname:{
                type:String,
            },
            goodsimg:{
                type:String,
            },
            goodsprice:{
                type:Number,
            }
        }
    ],
    shopimg:{
        type:String,
        require:true
    },
    shopimgs:[
        {
            type:String,  
        }
    ],
    order:[
        {
            type:mongoose.Schema.Types.ObjectId,
            timestamps: {createAt: "createTime", updateAt: "updateTime"},
            ref:'order'
        }
    ],
    
}, {versionKey: false,timestamps: {createAt: "createTime", updateAt: "updateTime"}})

module.exports = mongoose.model("shop", shop)