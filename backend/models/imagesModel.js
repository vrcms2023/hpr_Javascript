import { mongoose } from 'mongoose'

const imagesModelSchema = mongoose.Schema(
  {
    projectID: String,
    updateBy :String,
    path : String,
    originalname : String,
    contentType : String,
    category : String
  },
  {
    timestamps: true,
  }
)


const ImagesModel = mongoose.model('ImagesModel', imagesModelSchema)

export default ImagesModel
