const mongoose = require("mongoose")

const projectcategoriesSchema = mongoose.Schema({
    label:  String,        
    value:  String  
}, {timestamps: true})

const ProjectCategories = mongoose.model("ProjectCategories", projectcategoriesSchema)

module.exports = ProjectCategories;