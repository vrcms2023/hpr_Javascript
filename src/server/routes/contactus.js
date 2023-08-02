const express = require('express')
const ContactUS = require("../models/contactus.js")
const nodemailer = require('nodemailer');

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

    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: 'jetti.trade@gmail.com',
    //       pass: 'Kesava@Varnika@2015@2014'
    //     }
    //   });

    // const mailOptions = {
    //     from: 'jetti.trade@gmail.com',
    //     to: 'designerkrishna@gmail.com',
    //     subject: 'Sending Email using Node.js',
    //     text: 'That was easy!'
    //     };

    // transporter.sendMail(mailOptions, function(error, info){
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log('Email sent: ' + info.response);
    //     }
    //   });
       
    
    return res.json({message: "Success", contactus: dbContactUS})

       
})


module.exports = router