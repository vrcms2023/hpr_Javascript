const mongoose = require("mongoose")

const realEstateProjectSchema = mongoose.Schema({
    projectCategoryID: {
        type: String,
        required: true,
    },
    projectCategoryName: {
        type: String,
        required: true,
    },
    projectCategoryValue: {
        type: String,
        required: true,
    },
    projectTitle: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String       
    },
    updatedBy: {
        type: String
    },
    userID: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    isActive : {
        type: Boolean,
        required : true
    }
   
  
}, {timestamps: true})

const RealEstateProject = mongoose.model("RealEstateProject", realEstateProjectSchema)

module.exports = RealEstateProject;