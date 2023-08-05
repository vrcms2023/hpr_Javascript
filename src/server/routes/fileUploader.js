const express = require("express");
const multer = require("multer");
const verifyJWT = require("../common/verifyJWT.js");
const imagesModel = require("../models/imagesModel.js");
const fs = require("fs");
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)


const router = express.Router();

const storage = multer.diskStorage({
  //multers disk storage settings
  destination: function (req, file, cb) {
       cb(null, "public");
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    var ext = file.mimetype.split('/')[1]
    cb(null, `uploads/${file.fieldname}-${datetimestamp}.${ext}`
    );
  },
});

let upload = multer({ storage: storage }).single("file");

router.post("/fileUploader/:id/:name/:category", (req, res, next) => {

    upload(req, res, function (err) {
    if (err) {
      res.json({ error_code: 1, err_desc: err });
      return;
    }
    
    const path = req["file"].path;
    const dbimagesModel = new imagesModel({
      projectID: req.params.id,
      updatedBy: req.params.name,
      path: req["file"].filename,
      category: req.params.category,
      originalname: req["file"].originalname,
      contentType: path.split(".")[path.split(".").length - 1],
    });

    dbimagesModel.save();

    return res.json({ message: "Success", imageModel: dbimagesModel });
  });
});



router.get("/getSelectedImagesById/:id/:category", verifyJWT, async (req, res, next) => {   

    const query = { "projectID": req.params.id,"category":req.params.category };
    const data = await imagesModel.find(query);   
    return res.json({message: data.length > 0 ? "Success" :  "Record not found" ,  fileData: data})
})

router.delete('/deleteImageById/:id', upload, verifyJWT,  async (req, res, next) => {
    
    const data = await imagesModel.find({_id :req.params.id}).findOneAndDelete(); 

    await unlinkAsync("public/"+data.path)

    return res.json({ message: "Success", imageModel: data });
   
})

module.exports = router;
