const express = require('express')
const Specification = require("../models/specification.js")
const verifyJWT = require("../common/verifyJWT.js")

const router = express.Router()

router.get("/getSpecificationsById/:id", verifyJWT, async (req, res, next) => {   
   
    const query = { "projectID": req.params.id };
    const data = await Specification.find(query);   
    return res.json({message: data.length > 0 ? "Success" :  "Record not found" , specification: data[0]})
})

router.post("/addAndUpdateSpecifications", verifyJWT, async (req, res, next) => {
    
    const project = req.body;    
    let dbSpecification = "";
    
    const query = { "projectID": project.projectID };
    const update = {
        "$set": {
            "projectID": project.projectID,
            "updatedBy": project.updatedBy,
            "specifications": project.specifications
        }
      };
    const options = { returnNewDocument: true };    
    const data = await Specification.find(query);   
    

    if(data.length > 0) {
        dbSpecification = Specification.findOneAndUpdate(query, update, options)
        .then(updatedDocument => {return updatedDocument})
        .catch(err => console.error(`Failed to find and update document: ${err}`))
    } else {
        dbSpecification = new Specification({
            projectID: project.projectID,
            updatedBy: project.updatedBy,
            specifications: project.specifications
        })
        dbSpecification.save();     
    }
    return res.json({message: "Success", specification: dbSpecification})
    
})


module.exports = router