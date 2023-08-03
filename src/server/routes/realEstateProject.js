const express = require('express')
const RealEstateProject = require("../models/realEstateProject")
const verifyJWT = require("../common/verifyJWT.js")
const {porjectValidation } = require("../common/validation.js")
const imagesModel = require("../models/imagesModel.js");
const Specification = require("../models/specification.js")
const Amenitie = require("../models/amenitie.js")

const router = express.Router()

const getDashboardProject = async (req, res) => {
    const dashBoardFields = 'projectCategoryID projectCategoryName projectCategoryValue projectTitle isActive';
    const data = await RealEstateProject.find({isActive : true}).select(dashBoardFields);
    return res.json({message: data.length > 0 ? "Success" :  "Record not found" , project: data}) 
}



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
            "description": project.description,
            "projectCategoryID": project.projectCategoryID,
            "projectCategoryName": project.projectCategoryName,
            "projectCategoryValue": project.projectCategoryValue,
           
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

router.get("/getDashboardProject", verifyJWT, async(req, res, next) => {   
    getDashboardProject(req, res);
})

router.get("/findById/:id", verifyJWT, async (req, res, next) => {   
  
    const data = await RealEstateProject.findById(req.params.id).exec();
    return res.json({message: "Success", project: data})
})

router.get("/deleteDashboardProject/:id", verifyJWT, async (req, res, next) => {   
  
    const query = { "_id": req.params.id };
    const update = { "$set": { "isActive": false}};
    const options = { returnNewDocument: true };

    RealEstateProject.findOneAndUpdate(query, update, options)
        .then(updatedDocument => {return updatedDocument})
        .catch(err => console.error(`Failed to find and update document: ${err}`))
   
        getDashboardProject(req, res);
})

router.get("/client/getProjects", async (req, res, next) => {   

    const clientViewFields = 'projectCategoryID projectCategoryName projectCategoryValue projectTitle isActive ';
    const projectData = await RealEstateProject.find({isActive : true}).select(clientViewFields);

    let projectIDs = []
    projectData.map((d, k) => {
        projectIDs.push(d._id);
    }) 
  
    const data = await imagesModel.find({ projectID: { $in: projectIDs }, "category":'images' })
    return res.json({message: data.length > 0 ? "Success" :  "Record not found" , projectList:projectData, imageList : data}) 
});

router.get("/client/getSelectedProject/:id", async (req, res, next) => {  

    const query = { "projectID": req.params.id };
    const projectData = await RealEstateProject.findById(req.params.id)
    const imageData = await imagesModel.find(query); 
    const specificationData = await Specification.find(query);
    const amenitie = await Amenitie.find(query);  
    
    return res.json({message: "Success" , project:projectData ,imageData:imageData, specificationData:specificationData, amenitie:amenitie[0] }) 
});





module.exports = router