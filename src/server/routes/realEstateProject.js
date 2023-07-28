const express = require('express')
const RealEstateProject = require("../models/realEstateProject")
const verifyJWT = require("../common/verifyJWT.js")
const {porjectValidation } = require("../common/validation.js")

const router = express.Router()


router.post("/addProject", verifyJWT, async (req, res, next) => {
    
    const project = req.body;

    const validationError = porjectValidation(project).error
  
    if (validationError) {
        return res.json({message: validationError.details[0].message})
    }  else {
       
        const dbRealEstateProject = new RealEstateProject({
            projectCategoryID: project.projectCategoryID,
            projectCategoryName: project.projectCategoryName,
            projectCategoryValue: project.projectCategoryValue,
            projectTitle: project.projectTitle,
            createdBy: project.createdBy,
            updatedBy: project.createdBy,
            userID: project.userID,
            status: project.status,
            description:'',
            isActive: true
        })

        dbRealEstateProject.save()
        return res.json({message: "Success", project: dbRealEstateProject})
    }
})

/**
 * update project
 */
router.post("/updateProject", verifyJWT, async (req, res, next) => {

    const project = req.body;    
    
    const query = { "_id": project._id };

    const update = {
        "$set": {
            "projectTitle": project.projectTitle, 
            "updatedBy": project.updatedBy, 
            "description": project.description
        }
      };
    const options = { returnNewDocument: true };

    return RealEstateProject.findOneAndUpdate(query, update, options)
        .then(updatedDocument => {return updatedDocument})
        .catch(err => console.error(`Failed to find and update document: ${err}`))
});

/*
* get Dashboard project
*/

router.get("/getDashboardProject", verifyJWT, (req, res, next) => {   
    RealEstateProject.find({}).select('projectCategoryID projectCategoryName projectCategoryValue projectTitle status isActive')
    .then(data => res.json(data))
    .catch(err => console.log(err))
})

router.get("/findById/:id", verifyJWT, async (req, res, next) => {   
  
    const data = await RealEstateProject.findById(req.params.id).exec();
    return res.json({message: "Success", project: data})
})



module.exports = router