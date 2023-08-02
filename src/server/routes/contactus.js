const express = require('express')
const ContactUS = require("../models/contactus.js")

const router = express.Router()


router.post("/updateContactDetails", async (req, res, next) => {
    const project = req.body; 

    const dbContactUS = new ContactUS({
        firstName: project.firstName,
        lastName: project.lastName,
        email: project.email,
        phone: project.phone,
        message :project.message
    })
    dbContactUS.save();
       
    
    return res.json({message: "Success", contactus: dbContactUS})

       
})


module.exports = router