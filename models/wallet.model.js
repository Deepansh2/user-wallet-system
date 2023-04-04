const mongoose = require("mongoose");


const walletSchema = new mongoose.Schema({

    userId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "user"
    },
    accountNumber : {
        type : Number,
        required : true,
        unique : true
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
    },
    createdAt : {
        type : Date,
        immutable:true,
        default : ()=>{
            return Date.now()
        }
    },
    updatedAt : {
        type : Date,
        default : ()=>{
            return Date.now()
        }
    }
},{versionKey:false})

module.exports = mongoose.model("wallet",walletSchema)