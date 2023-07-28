const mongoose = require("mongoose")

const specificationSchema = mongoose.Schema({
    projectID: String,
    updateBy :String,
    specifications : [
        {
            title : String,
            feature : String        
        }
    ]
}, {timestamps: true})

const Specification = mongoose.model("Specification", specificationSchema)

// mongoose.set("debug", (collectionName, method, query, doc) => {
//     console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
// });
module.exports = Specification;