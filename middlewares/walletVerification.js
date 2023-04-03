const Wallet = require("../models/wallet.model")



function numDigits(x) {
    return (Math.log10((x ^ (x >> 31)) - (x >> 31)) | 0) + 1;
  }



const walletVerify = async (req,res,next) =>{

    const wallet = await Wallet.findOne({userId:req.user._id})
    if(wallet){
        return res.status(400).send({
            message : "Wallet already exist with this Id"
        })
    }
    
    if(!req.body.walletPin){
        return res.status(400).send({
            message : "Failed! wallet Pin is not provided"
        })
    }else{
        if(numDigits(req.body.walletPin) != 6){
            return res.status(400).send({
                message : "Failed! Pin should be of 6 digits"
            })
        }
    }

    if(!req.body.accountNumber){
        return res.status(400).send({
            message : "Failed! account number is not provided"
        })
    }else{
        if(numDigits(req.body.accountNumber) != 9){
            return res.status(400).send({
                message : "Failed! Account Number should be of 11 digits"
            })
        }
    }
    next()
}

const wallet = {
    walletVerify : walletVerify
}

module.exports= wallet