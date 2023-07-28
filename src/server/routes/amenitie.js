const express = require('express')
const Amenitie = require("../models/amenitie.js")
const verifyJWT = require("../common/verifyJWT.js")

const router = express.Router()

router.get("/getAmenitiesById/:id", verifyJWT, async (req, res, next) => {   

    const query = { "projectID": req.params.id };
    const data = await Amenitie.find(query);   
    return res.json({message: data.length > 0 ? "Success" :  "Record not found" , amenitie: data[0]}) 
   
})

router.post("/addAndUpdateAmenities", verifyJWT, async (req, res, next) => {
    const project = req.body;    
    let dbAmenitie = "";
    
    const query = { "projectID": project.projectID };
    const update = {
        "$set": {
            "projectID": project.projectID,
            "updatedBy": project.updatedBy,
            "amenitie": project.amenitieslist.amenitie,
            "feature": project.amenitieslist.feature
        }
      };
    const options = { returnNewDocument: true };    
    const data = await Amenitie.find(query);   
    

    if(data.length > 0) {
        dbAmenitie = Amenitie.findOneAndUpdate(query, update, options)
        .then(updatedDocument => {return updatedDocument})
        .catch(err => console.error(`Failed to find and update document: ${err}`))
    } else {
        dbAmenitie = new Amenitie({
            projectID: project.projectID,
            updatedBy: project.updatedBy,
            amenitie: project.amenitieslist.amenitie,
            feature: project.amenitieslist.feature
        })
        dbAmenitie.save();
       
    }
    return res.json({message: "Success", amenitie: dbAmenitie})

       
})


module.exports = router