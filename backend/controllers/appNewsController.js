import asyncHandler from 'express-async-handler'
import AppNewsModel from '../models/appNewsModel.js'


const addNews = asyncHandler(async (req, res) => {
  const news = req.body;

  const dbAppNewsModel = new AppNewsModel({
    projectID: news.projectID,
    newstitle: news.newstitle,
    description: news.description,
    imageId: news.imageId,
    originalname: news.originalname,
    imageUrl: news.imageUrl,
    updateBy: news.updateBy
  })

  dbAppNewsModel.save()
  
  return res.status(200).json({ message: "Success", appNews: dbAppNewsModel })
})

const updateNews = asyncHandler(async (req, res) => {
  const news = req.body;
  const query = { "_id": news._id };
  const update = {
    "$set": {
      "projectID": news.projectID,
      "newstitle": news.newstitle,
      "description": news.description,
      "imageId": news.imageId,
      "originalname": news.originalname,
      "imageUrl": news.imageUrl,
      "updateBy": news.updateBy
    }
  };
  const updateNews = await AppNewsModel.findOneAndUpdate(query, update);
  if (updateNews) {
    res.status(200).json({ message: "Success", appNews: updateNews })
  } else {
    res.status(404).json({ message: "Failed to find and update document" })
    throw new Error('Failed to find and update document')
  }  
});

const deleteNewsById = asyncHandler(async (req, res) => {

  const deleted = await AppNewsModel.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "deleted", appNews: deleted })
});


const getAllNews = asyncHandler(async (req, res) => {

  const appNews = await AppNewsModel.find()
  if (appNews) {
    res.status(200).json({ message: "Success", appNews: appNews })
  } else {
    res.status(404).json({ message: "Failed to find and news" })
    throw new Error('Failed to find news')
  }
})




export { addNews, getAllNews, updateNews, deleteNewsById }
