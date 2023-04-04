const mongoose = require("mongoose");
const constants = require("../utils/constants")

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        minLength : 10,
        unique : true,
    },
    password : {
        type : String,
        required : true
    },
    userType : {
        type : String,
        required : true,
        default : constants.userTypes.customer,
        enum : [constants.userTypes.customer,constants.userTypes.admin]
    },
    userStatus : {
        type : String,
        required : true,
        default : constants.userStatus.approved,
        enum : [constants.userStatus.pending,constants.userStatus.approved,constants.userStatus.rejected]
    },
    transactions:{
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "passbook"
    },
    createdAt : {
        type : Date,
        immutable : true,
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
});

module.exports = mongoose.model("user",userSchema)