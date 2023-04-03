const User = require("../models/user.model");


const verifySignUpBodies = async (req, res,next) => {

    if (!req.body.name) {
        return res.status(400).send({
            message: "Failed ! user name is not passed"
        })
    }

    if (!req.body.userId) {
        return res.status(400).send({
            message: "Failed ! userId is not passed"
        })
    }
    const user = await User.findOne({ userId: req.body.userId });
    if (user) {
        return res.status(401).send({
            message: "Failed ! userId is already exist"
        })
    }

    if (!req.body.email) {
        return res.status(400).send({
            message: "Failed ! user email is not provided"
        })
    }

    if (!isValidEmail(req.body.email)) {
        return res.status(400).send({
            message: "Failed ! email passes is not valid"
        })
    }

    if (!req.body.password) {
        return res.status(400).send({
            message: "Failed ! user password is not provided"
        })
    }

    next()
}
const isValidEmail = (email) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

const verifySignInBodies = (req, res,next) => {

    if (!req.body.userId) {
        return res.status(400).send({
            message: "Failed ! userId is not passed"
        })
    }

    if (!req.body.password) {
        return res.status(403).send({
            message: "Failed ! password is not provided"
        })
    }
    next()
}

const verifySignUpAndSignInBodies = {
    verifySignUpBodies: verifySignUpBodies,
    verifySignInBodies: verifySignInBodies
}
module.exports = verifySignUpAndSignInBodies