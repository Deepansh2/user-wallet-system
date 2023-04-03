const userController = require("../controllers/user.controller")
const {authJwt} = require("../middlewares")
module.exports = (app) =>{

    app.get("/uws/api/users",[authJwt.verifyToken],userController.findAll);
    app.get("/uws/api/user/:id",[authJwt.verifyToken,authJwt.isValidUserIdInReqParam],userController.findByUserId);
    app.put("/uws/api/user/:id",[authJwt.verifyToken,authJwt.isValidUserIdInReqParam],userController.update)
}