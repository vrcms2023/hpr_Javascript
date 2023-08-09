import { mongoose } from 'mongoose'

const amenitiesModelSchema = mongoose.Schema(
  {
    projectID: String,
    updateBy :String,
    amenitie : String,
    feature : String,
    googleMap:String
  },
  {
    timestamps: true,
  }
)


const AmenitiesModel = mongoose.model('AmenitiesModel', amenitiesModelSchema)

export default AmenitiesModel
