
const bcrypt = require("bcryptjs")
const User = require("../models/user.model");
const jwt = require("jsonwebtoken")
const authConfig = require("../configs/auth.config")
const constants = require("../utils/constants")

exports.signup = async (req,res) =>{


    try{

    const userObj = {
        name : req.body.name,
        userId : req.body.userId,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password,8),
        userType : req.body.userType,
        userStatus : req.body.userStatus
    }

    
    const userCreated = await User.create(userObj);

    const response = {
        name : userCreated.name,
        userId : userCreated.userId,
        email : userCreated.email,
        userType : userCreated.userType,
        userStatus : userCreated.userStatus,
        createdAt : userCreated.createdAt,
        updatedAt : userCreated.updatedAt
    }
    console.log("user created with name :",`${userCreated.name}`)
    res.status(201).send(response);
}catch(err){
    console.log("Error while signup the user",err);
    return res.status(500).send({
        message : "Internal server error"
    })
}

}

exports.signin = async (req,res) =>{

    try{
    const user = await User.findOne({userId : req.body.userId});

    if(user == null){
        return res.status(400).send({
            message : "Failed ! user doesn't exist"
        })
    }

    const isValidPassword = bcrypt.compareSync(req.body.password,user.password);

    if(!isValidPassword){
        return res.status(401).send({
            message : "Wrong Password"
        })
    }
    if(user.userStatus == constants.userStatus.pending){
        return res.status(400).send({
            message : "Not approved by admin yet"
        })
    }

    const token = jwt.sign({id : user.userId},authConfig.secret,{expiresIn:6000})
    const response = {
        name : user.name,
        userId : user.userId,
        email : user.email,
        userType : user.userType,
        userStatus : user.userStatus,
        accessToken : token
    }
    console.log(`${user.userType}`,`${user.name}`,"logged In")
    return res.status(200).send(response)
}catch(err){
    console.log("error while login",err);
    return res.status(500).send({
        message : "Internal server error"
    })
}
}