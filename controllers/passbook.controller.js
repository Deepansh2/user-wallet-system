
const Passbook = require("../models/passbook.model")
const constant = require("../utils/constants")

exports.createPassbook = async(req,res) =>{

    try{
    const passbookObj = {
        userId : req.body.userId,
        sendTo : req.body.sendTo,
        receivedFrom : req.body.receivedFrom,
        creditMoney : req.body.creditMoney,
        debitMoney : req.body.debitMoney
    }

    const passbook = await Passbook.create(passbookObj)
    return passbook
}catch(err){
    console.log("Error while creating passbook",err);
    return res.status(500).send({
        message : "Internal server error"
    })
}
}


exports.findAllTransaction = async(req,res) =>{

    try{
    const user = req.user
    const queryObj = {}
    const userTransaction = user.transactions
    if(user.userType == constant.userTypes.user){
        queryObj["_id"] = {$in:userTransaction}
    }
    const transactions = await Passbook.find(queryObj)
    return res.status(200).send(transactions)
    }catch(err){
        console.log("Error while finding all transaction",err);
        return res.status(500).send({
            message : "Internal server error"
        })
    }
}