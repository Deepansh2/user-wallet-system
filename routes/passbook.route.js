const passbookController = require("../controllers/passbook.controller");


module.exports = (app ) =>{

    app.get("/uws/api/transaction",passbookController.findAllTransaction)
}