const Wallet = require("../models/wallet.model")


exports.registerWallet = async(req,res) =>{


    try{

    const walletObj = {
        userId : req.user._id,
        accountNumber : req.body.accountNumber,
        walletPin : req.body.walletPin
    }

    const wallet = await Wallet.create(walletObj)
    console.log("new wallet registered")
    return res.status(201).send(wallet)
}catch(err){
    console.log("Error while creating new wallet",err);
    return res.status(500).send({
        message : "Internal server error"
    })
}
} 

exports.addMoney = async(req,res) =>{

    const user = req.user
    const wallet = await Wallet.findOne({userId:user._id})
    if(wallet){
        if(wallet.walletPin == req.body.walletPin){
            wallet.walletBalance = req.body.walletBalance != undefined ? req.body.walletBalance + wallet.walletBalance: wallet.walletBalance
            const updatedWallet = await wallet.save()
            return res.status(200).send({
                message : "money added to wallet successfully",
                moneyAdded : req.body.walletBalance,
                Money : Math.abs(updatedWallet.walletBalance - req.body.walletBalance),
                totalAmount : updatedWallet.walletBalance
            })
        }else{
            return res.status(400).send({
                message : "Wrong Pin! Please try again"
            })
        }
    }else{
        return res.status(400).send({
            message : "Wallet doesn't exist"
        })
    }
}

