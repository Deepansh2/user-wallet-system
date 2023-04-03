
const jwt = require("jsonwebtoken")
const authConfig = require("../configs/auth.config")
const User = require("../models/user.model")
const constants = require("../utils/constants")

const verifyToken = (req,res,next) =>{

    const token = req.headers["x-access-token"]

    if(!token){
        return res.status(403).send({
            message : "token is not provided ! Access probated"
        })
    }
    jwt.verify(token,authConfig.secret, (err,decoded) =>{
        if(err){
            return res.status(403).send({
                message : "Failed ! token is not valid"
            })
        }
        req.userId = decoded.id
        next();
    })

}

const isAdmin = async (req,res,next) =>{
    const user = await User.findOne({userId : req.userId})

    if(user && user.userType == constants.userTypes.admin){
        next()
    }
    else{
        return res.status(403).send({
            message : "Only admin allow to call this endPoint"
        })
    }
}

const isValidUserIdInReqParam = async (req,res,next) =>{

    const user  = await User.findOne({userId : req.params.id});
    if(!user){
        return res.status(400).send({
            message : "userId passed in params doesn't exist"
        })
    }
    next()
}

const isAdminOrOwner = async (req,res,next) =>{
    
    const user = await User.findOne({userId:req.userId});

    if(user.userType == constants.userTypes.admin || user.userId == req.params.id){
        next()
    }
    else{
        return res.status(400).send({
            message : "Only admin or the owner can make this request"
        })
    }
}

const verifyAccessToken = {
    verifyToken : verifyToken,
    isAdmin : isAdmin,
    isAdminOrOwner : isAdminOrOwner,
    isValidUserIdInReqParam : isValidUserIdInReqParam

}
module.exports = verifyAccessToken