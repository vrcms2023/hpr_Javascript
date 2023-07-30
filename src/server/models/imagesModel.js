const mongoose = require("mongoose")

const imagesModelSchema = mongoose.Schema({
    projectID: String,
    updateBy :String,
    path : String,
    originalname : String,
    contentType : String,
    category : String
}, {timestamps: true})

const ImagesModel = mongoose.model("ImagesModel", imagesModelSchema)

module.exports = ImagesModel;