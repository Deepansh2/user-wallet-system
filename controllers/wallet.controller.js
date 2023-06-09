const Wallet = require("../models/wallet.model")
const { createPassbook } = require("./passbook.controller")


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

    try{
    const user = req.user
    const wallet = await Wallet.findOne({userId:user._id})
    if(wallet){
        if(wallet.walletPin == req.body.walletPin){
            wallet.walletBalance = req.body.walletBalance != undefined ? req.body.walletBalance + wallet.walletBalance: wallet.walletBalance
            const updatedWallet = await wallet.save()

            req.body = {
                userId : user._id,
                sendTo : user._id,
                received : user._id,
                creditMoney :req.body.walletBalance
            }

            response = {
                message : "Data added in passbook"
            }
        
            const ans = await createPassbook(req,response)
            user.transactions.push(ans._id)
            await user.save()
            return res.status(200).send({
                message : "money added to wallet successfully",
                moneyAdded : req.body.creditMoney,
                Money : Math.abs(updatedWallet.walletBalance - req.body.creditMoney),
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
}catch(err){
    console.log("Error while adding money into wallet",err);
    return res.status(500).send({
        message : "Internal server error"
    })
}
}


exports.sendMoney = async(req,res) =>{

    try{
    const user = req.user
    const wallet = await Wallet.findOne({userId:user._id})
    if(wallet){
        if(wallet.walletPin == req.body.walletPin){
            const receiverWallet = await Wallet.findOne({accountNumber:req.body.accountNumber})
            if(wallet.walletBalance >= req.body.moneySend){
                if(receiverWallet){
                    receiverWallet.walletBalance = req.body.moneySend != undefined?req.body.moneySend+receiverWallet.walletBalance:receiverWallet.walletBalance;
                    wallet.walletBalance = req.body.moneySend != undefined ? wallet.walletBalance-req.body.moneySend : wallet.walletBalance
                    const updatedWallet = await wallet.save()
                    await receiverWallet.save()
                    req.body = {
                        userId : user._id,
                        sendTo : receiverWallet._id,
                        debitMoney :req.body.moneySend
                    }
                    
                    response = {
                        message : "Data added in passbook"
                    }
                    const ans = await createPassbook(req,response)
                    user.transactions.push(ans._id)
                    await user.save()
                    return res.status(200).send({
                        message : "money send to wallet successfully",
                        moneySend : req.body.debitMoney,
                        money : wallet.walletBalance+req.body.debitMoney,
                        totalAmount : updatedWallet.walletBalance
                    })
                }else{
                    return res.status(400).send({
                        message : "Please try and check account number again"
                    })
                }
            }else{
                return res.status(400).send({
                    message : "insufficient balance",
                    totalBalance : wallet.walletBalance,
                    sendingMoney:req.body.moneySend
                })
            }

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
}catch(err){
    console.log("Error while sending money to another user",err);
    return res.status(500).send({
        message : "Internal server error"
    })
}
}