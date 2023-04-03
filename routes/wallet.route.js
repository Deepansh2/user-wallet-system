const walletController = require("../controllers/wallet.controller");
const {wallet,authJwt} = require("../middlewares")
module.exports = (app) =>{

    app.post("/uws/api/wallet/register",[authJwt.verifyToken,wallet.walletVerify],walletController.registerWallet)
    app.post("/uws/api/wallet/addMoney",[authJwt.verifyToken],walletController.addMoney)
    app.post("/uws/api/wallet/sendMoney",[authJwt.verifyToken],walletController.sendMoney)
}