const mongoose = require("mongoose");
const order = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        timestamps: { createAt: "createTime", updateAt: "updateTime" },
        ref: 'user'
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        timestamps: { createAt: "createTime", updateAt: "updateTime" },
        ref: 'shop'
    },
    type: {
        type: Number,
        default: 1,
        require: true
    },
    goods: {
        goodsname: {
            type: String,
            require: true
        },
        num: {
            type: Number,
            default: 1,
            require: true
        }
    },
}, { versionKey: false, timestamps: { createAt: "createTime", updateAt: "updateTime" } })

module.exports = mongoose.model("order", order)