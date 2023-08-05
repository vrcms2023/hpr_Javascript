const mongoose = require("mongoose")

const appNewsSchema = mongoose.Schema({
    projectID: String,
    updateBy :String,
    newstitle : String,
    description : String,
    imageUrl:String,
    imageId : String,
    originalname: String
}, {timestamps: true})

const AppNews = mongoose.model("AppNews", appNewsSchema)

module.exports = AppNews;