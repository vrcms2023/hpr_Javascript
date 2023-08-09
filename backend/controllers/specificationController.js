import asyncHandler from 'express-async-handler'
import Specification from '../models/specificationModel.js'


const addAndUpdateSpecifications = asyncHandler(async (req, res) => {

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


  if (data.length > 0) {
    dbSpecification = Specification.findOneAndUpdate(query, update, options)
      .then(updatedDocument => { return updatedDocument })
      .catch(err => console.error(`Failed to find and update document: ${err}`))
  } else {
    dbSpecification = new Specification({
      projectID: project.projectID,
      updatedBy: project.updatedBy,
      specifications: project.specifications
    })
    dbSpecification.save();
  }
  return res.json({ message: "Success", specification: dbSpecification })
})


const getSpecificationsById = asyncHandler(async (req, res) => {

  const query = { "projectID": req.params.id };
  const data = await Specification.find(query);
  if (data) {
    res.status(200).json({ message: "Success", specification: data[0] })
  } else {
    res.status(404).json({ message: "Record not found" })
    throw new Error('Record not found')
  }

})

export { addAndUpdateSpecifications, getSpecificationsById }
