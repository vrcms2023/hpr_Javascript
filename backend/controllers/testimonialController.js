import asyncHandler from 'express-async-handler'
import TestimonialModel from '../models/testimonialModel.js'


const addTestimonial = asyncHandler(async (req, res) => {
  const testimonial = req.body;

  const dbTestimonialModel = new TestimonialModel({
    projectID: testimonial.projectID,
    title: testimonial.title,
    description: testimonial.description,
    imageId: testimonial.imageId,
    originalname: testimonial.originalname,
    imageUrl: testimonial.imageUrl,
    updateBy: testimonial.updateBy
  })

  dbTestimonialModel.save()
  
  return res.status(200).json({ message: "Success", testimonial: dbTestimonialModel })
})

const updateTestimonial = asyncHandler(async (req, res) => {
    const testimonial = req.body;
    const query = { "_id": testimonial._id };
    const update = {
    "$set": {
      "projectID": testimonial.projectID,
      "title": testimonial.title,
      "description": testimonial.description,
      "imageId": testimonial.imageId,
      "originalname": testimonial.originalname,
      "imageUrl": testimonial.imageUrl,
      "updateBy": testimonial.updateBy
    }
  };
  const updateTestimonial = await TestimonialModel.findOneAndUpdate(query, update);
  if (updateTestimonial) {
    res.status(200).json({ message: "Success", testimonial: updateTestimonial })
  } else {
    res.status(404).json({ message: "Failed to find and update document" })
    throw new Error('Failed to find and update document')
  }  
});

const deleteTestimonialById = asyncHandler(async (req, res) => {

  const deleted = await TestimonialModel.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "deleted", testimonial: deleted })
});


const getAllTestimonial = asyncHandler(async (req, res) => {

  const dbTestimonialModel = await TestimonialModel.find()
  if (dbTestimonialModel) {
    res.status(200).json({ message: "Success", testimonial: dbTestimonialModel })
  } else {
    res.status(404).json({ message: "Failed to find and testimonal" })
    throw new Error('Failed to find testimonal')
  }
})


export { getAllTestimonial, deleteTestimonialById, updateTestimonial, addTestimonial }
