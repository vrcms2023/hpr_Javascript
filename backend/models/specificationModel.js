import { mongoose } from 'mongoose'

const specificationModelSchema = mongoose.Schema(
  {
    projectID: String,
    updateBy :String,
    specifications : [
        {
            title : String,
            feature : String        
        }
    ]
  },
  {
    timestamps: true,
  }
)


const SpecificationModel = mongoose.model('SpecificationModel', specificationModelSchema)

export default SpecificationModel
