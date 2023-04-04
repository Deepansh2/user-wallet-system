const mongoose = require("mongoose");

const passbookSchema = new mongoose.Schema({

    userId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "user"
    },
    sendTo : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "user"
    },
    receivedFrom:{
        type : mongoose.SchemaTypes.ObjectId,
        ref : "user"
    },
    creditMoney : {
        type : Number
    },
    debitMoney : {
        type : Number
    },
    createdAt:{
        type : Date,
        immutable : true,
        default : ()=>{
            return Date.now()
        }
    },
    updatedAt:{
        type : Date,
        default : ()=>{
            return Date.now()
        }
    }
},{versionKey:false})

module.exports = mongoose.model("passbook",passbookSchema)