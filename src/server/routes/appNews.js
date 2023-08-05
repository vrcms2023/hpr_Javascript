const express = require('express')
const AppNews = require("../models/appNews.js")
const verifyJWT = require("../common/verifyJWT.js")
const imagesModel = require("../models/imagesModel.js");


const router = express.Router()

const getDashboardProject = async (req, res) => {
    const dashBoardFields = 'projectCategoryID projectCategoryName projectCategoryValue projectTitle isActive';
    const data = await RealEstateProject.find({isActive : true}).select(dashBoardFields);
    return res.json({message: data.length > 0 ? "Success" :  "Record not found" , project: data}) 
}



router.post("/addNews", verifyJWT, async (req, res, next) => {
    
    const news = req.body;

    const dbAppNews = new AppNews({
        projectID : news.projectID,
        newstitle : news.newstitle,
        description : news.description,
        imageId : news.imageId,
        originalname : news.originalname,
        imageUrl : news.imageUrl,
        updateBy: news.updateBy
    })

    dbAppNews.save()
    return res.json({message: "Success", news: dbAppNews})
 
})

/**
 * update project
 */
router.post("/updateNews", verifyJWT, async (req, res, next) => {

    const project = req.body;    
    
    const query = { "_id": project._id };

    const update = {
        "$set": {
            "projectTitle": project.projectTitle, 
            "updatedBy": project.updatedBy, 
            "description": project.description,
            "aboutstitle": project.aboutstitle,
            "aboutussubtitle": project.aboutussubtitle,
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

router.get("/deleteNews/:id", verifyJWT, async (req, res, next) => {   
  
    const query = { "_id": req.params.id };
    const update = { "$set": { "isActive": false}};
    const options = { returnNewDocument: true };

    RealEstateProject.findOneAndUpdate(query, update, options)
        .then(updatedDocument => {return updatedDocument})
        .catch(err => console.error(`Failed to find and update document: ${err}`))
   
        getDashboardProject(req, res);
})

router.get("/client/getNews", async (req, res, next) => {   

    const clientViewFields = 'projectCategoryID projectCategoryName projectCategoryValue projectTitle isActive ';
    const projectData = await RealEstateProject.find({isActive : true}).select(clientViewFields);

    let projectIDs = []
    projectData.map((d, k) => {
        projectIDs.push(d._id);
    }) 
  
    const data = await imagesModel.find({ projectID: { $in: projectIDs }, "category":'images' })
    return res.json({message: data.length > 0 ? "Success" :  "Record not found" , projectList:projectData, imageList : data}) 
});





module.exports = router