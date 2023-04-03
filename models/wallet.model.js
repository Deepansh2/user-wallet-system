const mongoose = require("mongoose");


const walletSchema = new mongoose.Schema({

    userId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "user"
    },
    accountNumber : {
        type : Number,
        required : true
    },
    walletBalance : {
        type : Number,
        default : 0
    },
    walletPin : {
        type : Number,
        required : true,
        minLength:6,
        maxLength : 6
    }
},{versionKey:false})

module.exports = mongoose.model("wallet",walletSchema)