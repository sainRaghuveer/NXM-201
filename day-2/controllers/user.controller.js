// Import the User model
const { userModel } = require('../models/user.model');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const bcrypt = require('bcrypt');

// User signup
exports.signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const userExist = await userModel.findOne({ email });
        if (userExist) {
            res.send("email exist, login please")
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.status(400).send({ "msg": "please enter valid credentials", "status": false })
                } else {
                    if (name == "" || email == "" || password == "") {
                        res.status(400).send({ "msg": "Please fill all credentials", "status": false })
                    } else {
                        const user = new userModel({ name, email, password: hash, role });
                        user.save();
                        res.status(200).send({ "msg": "User registered successful", "status": true })
                    }
                }
            });
        }
    } catch (error) {
        console.log({ "msg": error.message });
    }
};


// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExist = await userModel.findOne({ email });
        if (userExist) {
            bcrypt.compare(password, userExist.password, async (err, result) => {
                if (result) {
                    var token = jwt.sign({ userExist: userExist._id }, process.env.secret, { expiresIn: "3h" });
                    res.send({ "msg": "user logged in successful", "token": token, "status": true })

                } else {
                    res.status(400).send({ "msg": "Wrong password or email", "status": false })
                }
            });
        } else {
            res.status(400).send({ "msg": "Wrong email", "status": false })
        }
    } catch (error) {
        console.log({ "msg": error.message });
        res.status(400).send({ "msg": "Wrong email", "status": false })
    }
};
