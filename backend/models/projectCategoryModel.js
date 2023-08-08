import { mongoose } from 'mongoose'

const projectcategoriesSchema = mongoose.Schema(
  {
    label:  String,        
    value:  String 
  },
  {
    timestamps: true,
  }
)


const projectcategories = mongoose.model('projectcategories', projectcategoriesSchema)

export default projectcategories
