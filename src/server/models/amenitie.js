const mongoose = require("mongoose")

const amenitiesSchema = mongoose.Schema({
    projectID: String,
    updateBy :String,
    amenitie : String,
    feature : String,
    googleMap:String
}, {timestamps: true})

const Amenities = mongoose.model("Amenities", amenitiesSchema)

module.exports = Amenities;