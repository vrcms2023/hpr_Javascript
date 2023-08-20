import asyncHandler from "express-async-handler";
import AmenitiesModel from "../models/amenitiesModel.js";

const addAndUpdateAmenities = asyncHandler(async (req, res) => {
  const project = req.body;
  let dbAmenitie = "";

  const query = { projectID: project.projectID };

  const data = await AmenitiesModel.find(query);

  if (data.length > 0) {
    const update = {
      $set: {
        projectID: project.projectID,
        updatedBy: project.updatedBy,
        amenitie: project.amenitieslist.amenitie,
        feature: project.amenitieslist.feature,
        googleMap: project.amenitieslist.googleMap,
      },
    };
    const options = { returnNewDocument: true };
    dbAmenitie = await AmenitiesModel.findOneAndUpdate(query, update, options);
  } else {
    dbAmenitie = new AmenitiesModel({
      projectID: project.projectID,
      updatedBy: project.updatedBy,
      amenitie: project.amenitieslist.amenitie,
      feature: project.amenitieslist.feature,
      googleMap: project.amenitieslist.googleMap,
    });
    dbAmenitie.save();
  }
  return res.json({ message: "Success", amenitie: dbAmenitie });
});

const getAmenitiesById = asyncHandler(async (req, res) => {
  const query = { projectID: req.params.id };
  const data = await AmenitiesModel.find(query);

  if (data) {
    return res.status(200).json({ message: "Success", amenitie: data[0] });
  } else {
    res.status(404).json({ message: "Record not found" });
    throw new Error("Record not found");
  }
});

export { addAndUpdateAmenities, getAmenitiesById };
