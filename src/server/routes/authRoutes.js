const express = require('express')
const bcrypt = require("bcrypt")
const User = require("../models/user.js")
const jwt = require("jsonwebtoken")
const {registrationValidation, loginValidation } = require("../common/validation")

const router = express.Router()


router.post("/register", async (req, res) => {
    const user = req.body;

    const takenUserEmail = await User.findOne({email: user.email.toLowerCase()})

    const validationError = registrationValidation(user).error

    if (validationError) {
        return res.json({message: validationError.details[0].message})
    } else if (takenUserEmail) {
        return res.json({message: "User has already registerd"})
    } else {
        user.password = await bcrypt.hash(req.body.password, 10)

        const dbUser = new User({
            userName: user.userName.toLowerCase(),
            password: user.password,
            email : user.email,
            confirmPassword: user.confirmPassword,
        })

        dbUser.save()
        return res.json({message: "Success"})
    }
})


router.post("/login", (req, res) => {
    
    const userLoggingIn = req.body;

    if (!userLoggingIn) return res.json({message: "Server Error"})

    const validationError = loginValidation(userLoggingIn).error

    if (validationError) {
        return res.json({message: validationError.details[0].message})
    } else {
        User.findOne({email: userLoggingIn.email.toLowerCase()})
        .then(dbUser => {
            if (!dbUser) {
                return res.json({message: "Invalid email or Password"})
            }
            bcrypt.compare(userLoggingIn.password, dbUser.password)
            .then(isCorrect => {
                if (isCorrect) {
                    const payload = {
                        id: dbUser._id,
                        email: dbUser.email
                    }
                    jwt.sign(
                        payload, 
                        process.env.PASSPORTSECRET,
                        {expiresIn: 86400},
                        (err, token) => {
                            return res.json({message: "Success", token: "Bearer " + token, userName: dbUser.userName })
                        }
                    )
                } else {
                    return res.json({message: "Invalid email or Password"})
                }
            })

        })
    }
})











module.exports = router