const verifySignUp = require("./verifySignUp");
const authJwt = require("./aut.jwt");
const wallet = require("./walletVerification")

module.exports = {
    verifySignUp,
    authJwt,
    wallet
}