import { mongoose } from 'mongoose'

const appNewsModelSchema = mongoose.Schema(
  {
    projectID: String,
    updateBy :String,
    newstitle : String,
    description : String,
    imageUrl:String,
    imageId : String,
    originalname: String
  },
  {
    timestamps: true,
  }
)


const AppNews = mongoose.model('AppNewsModel', appNewsModelSchema)

export default AppNews
