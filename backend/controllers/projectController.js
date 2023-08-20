import asyncHandler from "express-async-handler";
import RealEstateProjectModel from "../models/realEstateProjectModel.js";
import { porjectValidation } from "../common/validation.js";
import ImagesModel from "../models/imagesModel.js";
import Specification from "../models/specificationModel.js";
import Amenities from "../models/amenitiesModel.js";

const dashboardProject = async () => {
  const dashBoardFields =
    "projectCategoryID projectCategoryName projectCategoryValue projectTitle imageDescription isActive percentValue publish ";
  return await RealEstateProjectModel.find().select(dashBoardFields);
};

const getDashboardProject = asyncHandler(async (req, res) => {
  const projectList = await dashboardProject();

  if (projectList) {
    res.status(200).json({ message: "Success", projectList: projectList });
  } else {
    res.status(404).json({ message: "project List not found" });
    throw new Error("project List not found");
  }
});

const addNewProject = asyncHandler(async (req, res) => {
  const bodyObject = req.body;

  const validationError = porjectValidation(bodyObject).error;

  if (validationError) {
    return res
      .status(404)
      .json({ message: validationError.details[0].message });
  }

  const project = await RealEstateProjectModel.create({
    projectCategoryID: bodyObject.projectCategoryID,
    projectCategoryName: bodyObject.projectCategoryName,
    projectCategoryValue: bodyObject.projectCategoryValue,
    projectTitle: bodyObject.projectTitle,
    createdBy: bodyObject.createdBy,
    userID: bodyObject.userID,
    description: "",
    percentValue: "",
    isActive: true,
    publish: false,
  });

  if (project) {
    res.status(200).json({ message: "Success", project: project });
  } else {
    res.status(404).json({ message: "project not save" });
    throw new Error("project not save");
  }
});

const updateProject = asyncHandler(async (req, res) => {
  const project = req.body;

  const query = { _id: project._id };

  const update = {
    $set: {
      projectTitle: project.projectTitle,
      updatedBy: project.updatedBy,
      description: project.description,
      aboutstitle: project.aboutstitle,
      aboutussubtitle: project.aboutussubtitle,
      projectCategoryID: project.projectCategoryID,
      projectCategoryName: project.projectCategoryName,
      projectCategoryValue: project.projectCategoryValue,
      percentValue: project.percentValue,
      publish: project.publish,
      imageDescription: project.imageDescription,
    },
  };

  const options = { returnNewDocument: true };
  const updateProject = await RealEstateProjectModel.findOneAndUpdate(
    query,
    update,
    options,
  );
  if (updateProject) {
    res.status(200).json({ project });
  } else {
    res.status(404).json({ message: "Failed to find and update document" });
    throw new Error("Failed to find and update document");
  }
});

const getSelectedProject = asyncHandler(async (req, res) => {
  const data = await RealEstateProjectModel.findById(req.params.id).exec();
  if (data) {
    res.status(200).json({ message: "Success", project: data });
  } else {
    res.status(404).json({ message: "Given project not found" });
    throw new Error("Given project not found");
  }
});

const deleteSelectedProject = asyncHandler(async (req, res) => {
  const query = { _id: req.params.id };
  const update = { $set: { isActive: false, publish: false } };
  const options = { returnNewDocument: true };

  const updateProject = await RealEstateProjectModel.findOneAndUpdate(
    query,
    update,
    options,
  );
  if (updateProject) {
    const projectList = await dashboardProject();
    res.status(200).json({ message: "Success", projectList: projectList });
  } else {
    res.status(404).json({ message: "Failed to find and update document" });
    throw new Error("Failed to find and update document");
  }
});

const reStoreSelectedProject = asyncHandler(async (req, res) => {
  const query = { _id: req.params.id };
  const update = { $set: { isActive: true, publish: false } };
  const options = { returnNewDocument: true };

  const updateProject = await RealEstateProjectModel.findOneAndUpdate(
    query,
    update,
    options,
  );
  if (updateProject) {
    const projectList = await dashboardProject();
    res.status(200).json({ message: "Success", projectList: projectList });
  } else {
    res.status(404).json({ message: "Failed to find and update document" });
    throw new Error("Failed to find and update document");
  }
});

const getClientProjects = asyncHandler(async (req, res) => {
  const dashBoardFields =
    "projectCategoryID projectCategoryName projectCategoryValue projectTitle imageDescription isActive percentValue publish ";
  const projectList = await RealEstateProjectModel.find({
    publish: true,
  }).select(dashBoardFields);

  let projectIDs = [];
  projectList.map((d, k) => {
    projectIDs.push(d._id);
  });

  const data = await ImagesModel.find({
    projectID: { $in: projectIDs },
    category: "images",
  });
  return res.json({
    message: data.length > 0 ? "Success" : "Record not found",
    projectList: projectList,
    imageList: data,
  });
});

const getClientSelectedProject = asyncHandler(async (req, res) => {
  const query = { projectID: req.params.id };

  const projectData = await RealEstateProjectModel.findById(req.params.id);

  const imageData = await ImagesModel.find(query);
  const specificationData = await Specification.find(query);
  const amenitie = await Amenities.find(query);

  return res.json({
    message: "Success",
    project: projectData,
    imageData: imageData,
    specificationData: specificationData,
    amenitie: amenitie[0],
  });
});

const updatePubliser = asyncHandler(async (req, res) => {
  const data = await RealEstateProjectModel.findById(req.params.id).select(
    "publish",
  );
  if (data) {
    const query = { _id: req.params.id };
    const update = { $set: { publish: !data.publish, isActive: true } };
    await RealEstateProjectModel.findOneAndUpdate(query, update);
    const project = await RealEstateProjectModel.findById(req.params.id);
    res.status(200).json({ message: "Success", project: project });
  } else {
    res.status(404).json({ message: "unable to publish the project" });
    throw new Error("unable to publish the project");
  }
});

export {
  getDashboardProject,
  addNewProject,
  updateProject,
  getSelectedProject,
  deleteSelectedProject,
  getClientProjects,
  getClientSelectedProject,
  updatePubliser,
  reStoreSelectedProject,
};
