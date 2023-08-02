const mongoose = require("mongoose")

const contactUsSchema = mongoose.Schema({
    firstName: String,
    lastName :String,
    email:String,
    phone:String,   
    message : String
}, {timestamps: true})

const ContactUS = mongoose.model("ContactUS", contactUsSchema)

module.exports = ContactUS;