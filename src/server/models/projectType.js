const mongoose = require("mongoose")

const projectTypeSchema = mongoose.Schema({
    label:  String,        
    value:  String
  
}, {timestamps: true})

const ProjectType = mongoose.model("ProjectType", projectTypeSchema)


module.exports = ProjectType;