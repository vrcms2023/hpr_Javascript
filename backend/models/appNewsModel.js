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


const AppNews = mongoose.model('AppNews', appNewsModelSchema)

export default AppNews
