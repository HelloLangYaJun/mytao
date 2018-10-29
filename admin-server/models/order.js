const mongoose = require("mongoose");
const user = new mongoose.Schema({
    

    date: { type: Date, default: Date.now },     
}, {versionKey: false,timestamps: {createAt: "createTime", updateAt: "updateTime"}})

module.exports = mongoose.model("order", order)