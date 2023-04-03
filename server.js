// extra validation for password like alphanumeric ,number,special character,minLength
const express = require("express");
const app = express();
const serverConfig = require("./configs/server.config");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const dbConfig = require("./configs/db.config");
const bcrypt = require("bcryptjs")

const User = require("./models/user.model")
const Wallet = require("./models/wallet.model")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))


mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error",()=>{ // on is an event listener 
    console.log("error while connecting mongodb")
})
db.once("open",()=>{
    console.log("Connected to mongodb");
    init()
})

async function init(){

    try{
    await User.collection.drop()


    // const user = await User.findOne({userId : "admin"})
    const adminUser = await User.create({
        name : "deepanshu",
        userId : "admin",
        password : bcrypt.hashSync("deep1",8),
        email : "deepanshusing54@gmail.com",
        userType : "ADMIN"
    })
    const user = await User.create({
        name : "deepanshu",
        userId : "user",
        password : bcrypt.hashSync("deep1",8),
        email : "deepanshusing54@gmail.com",
        userType : "USER"
    })
    console.log(adminUser)
}catch(err){
    console.log("error while creating admin",err);
    res.status(500).send({
        message : "Internal server error"
    })
}
}


require("./routes/user.route")(app);
require("./routes/auth.route")(app);
require("./routes/wallet.route")(app)


app.listen(serverConfig.PORT,()=>{
    console.log("Started the server at Port number :",serverConfig.PORT)
});