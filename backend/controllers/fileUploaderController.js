import asyncHandler from "express-async-handler";
import imagesModel from "../models/imagesModel.js";
import multer from "multer";
import fs from "fs";


const storage = multer.diskStorage({
  //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, "frontend/public");
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    var ext = file.mimetype.split("/")[1];
    cb(null, `uploads/${file.fieldname}-${datetimestamp}.${ext}`);
  },
});

let upload = multer({ storage: storage }).single("file");

const uploadImage = asyncHandler(async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.json({ error_code: 1, err_desc: err });
      return;
    }

    const path = req["file"].path;
    const dbimagesModel = await imagesModel.create({
      projectID: req.params.id,
      updatedBy: req.params.name,
      path: req["file"].filename,
      category: req.params.category,
      originalname: req["file"].originalname,
      contentType: path.split(".")[path.split(".").length - 1],
    });

    if (dbimagesModel) {
      res.json({ message: "Success", imageModel: dbimagesModel });
    } else {
      res.status(404).json({ message: "file uploaded" });
      throw new Error("File upload faield");
    }
  });
});

const getSelectedImageById = asyncHandler(async (req, res) => {
  const query = { projectID: req.params.id, category: req.params.category };
  const data = await imagesModel.find(query);
  if (data) {
    res.json({ message: "Success", fileData: data });
  } else {
    res.status(404).json({ message: "Record not found" });
    throw new Error("Record not found");
  }
});

const deleteSelectedImageById = asyncHandler(async (req, res) => {
  const data = await imagesModel
    .find({ _id: req.params.id })
    .findOneAndDelete();

  try {
    fs.unlinkSync("frontend/public/" + data.path);
    console.log(`${data.originalname} File Delete successfully.`);
  } catch (error) {
    console.log(error);
  }

  if (data) {
    res.json({ message: "Success", imageModel: data });
  } else {
    res.status(404).json({ message: "Record not deleted" });
    throw new Error("Record not deleted");
  }
});

export { uploadImage, getSelectedImageById, deleteSelectedImageById };
