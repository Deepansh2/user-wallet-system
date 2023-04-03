const userController = require("../controllers/auth.controller")
const {verifySignUp} = require("../middlewares")
module.exports = (app) =>{

    app.post("/uws/api/signup",[verifySignUp.verifySignUpBodies],userController.signup);
    app.post("/uws/api/signin",[verifySignUp.verifySignInBodies],userController.signin);
}