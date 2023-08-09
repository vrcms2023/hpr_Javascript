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


const Specification = mongoose.model('Specification', specificationModelSchema)

export default Specification
