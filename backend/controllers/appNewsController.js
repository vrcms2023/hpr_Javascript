import asyncHandler from 'express-async-handler'
import AppNewsModel from '../models/appNewsModel.js'


const addNews = asyncHandler(async (req, res) => {
  const news = req.body;

  const dbAppNewsModel = new AppNewsModel({
      projectID : news.projectID,
      newstitle : news.newstitle,
      description : news.description,
      imageId : news.imageId,
      originalname : news.originalname,
      imageUrl : news.imageUrl,
      updateBy: news.updateBy
  })

  dbAppNewsModel.save()
  return res.json({message: "Success", news: dbAppNewsModel})
})



export { addNews}
