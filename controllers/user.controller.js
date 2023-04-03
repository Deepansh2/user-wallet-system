const User = require("../models/user.model");
const objectConvertor = require("../utils/objectConvertor")
const constants = require("../utils/constants")

exports.findAll = async (req, res) => {

    try {

        const queryObj = {};
        const queryStatusQP = req.query.userStatus;
        const queryTypesQP = req.query.userType;
        if (queryTypesQP) {
            queryObj.userType = queryTypesQP
        }
        if (queryStatusQP) {
            queryObj.userStatus = queryStatusQP
        }
        const users = await User.find(queryObj);

        return res.status(200).send(objectConvertor.userResponse(users))
    } catch (err) {
        console.log("Error while finding all the users", err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}


exports.findByUserId = async (req, res) => {

    try {
        const user = await User.find({ userId: req.params.id });

        return res.status(200).send(objectConvertor.userResponse(user))
    } catch (err) {
        console.log("Error while finding user by userId", err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}

exports.update = async (req, res) => {

    try {
        const user = await User.findOne({ userId: req.params.id });


        user.userType = req.body.userType != undefined ? req.body.userType : user.userType;
        user.userStatus = req.body.userStatus != undefined ? req.body.userStatus : user.userStatus;
        user.name = req.body.name != undefined ? req.body.name : user.name;
        user.email = req.body.email != undefined ? req.body.email : user.email;
        const updatedUser = await user.save();

        return res.status(200).send({
            name: updatedUser.name,
            userId: updatedUser.userId,
            email: updatedUser.email,
            userType: updatedUser.userType,
            userStatus: updatedUser.userStatus
        })
    } catch (err) {
        console.log("Error while updating user", err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}