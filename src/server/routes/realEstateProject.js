const express = require('express')
const RealEstateProject = require("../models/realEstateProject")
const verifyJWT = require("../common/verifyJWT.js")
const {porjectValidation } = require("../common/validation.js")

const router = express.Router()

router.post("/addProject", verifyJWT, async (req, res) => {
    
    const project = req.body;

    const validationError = porjectValidation(project).error
  
    if (validationError) {
        return res.json({message: validationError.details[0].message})
    }  else {
       
        const dbRealEstateProject = new RealEstateProject({
            projectTypeID: project.projectTypeID,
            projectTypeName: project.projectTypeName,
            projectTitle: project.projectTitle,
            userName: project.userName,
            userID: project.userID,
            status: project.status,
        })

        dbRealEstateProject.save()
        return res.json({message: "Success", project: dbRealEstateProject})
    }
})

module.exports = router