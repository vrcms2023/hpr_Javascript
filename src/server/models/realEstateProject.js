const mongoose = require("mongoose")

const realEstateProjectSchema = mongoose.Schema({
    projectTypeID: {
        type: String,
        required: true,
    },
    projectTypeName: {
        type: String,
        required: true,
    },
    projectTitle: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    }
   
  
}, {timestamps: true})

const RealEstateProject = mongoose.model("RealEstateProject", realEstateProjectSchema)

module.exports = RealEstateProject;