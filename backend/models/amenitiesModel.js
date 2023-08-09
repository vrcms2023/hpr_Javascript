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


const Amenities = mongoose.model('Amenities', amenitiesModelSchema)

export default Amenities
