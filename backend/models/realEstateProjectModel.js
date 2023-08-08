import { mongoose } from 'mongoose'

const realEstateProjectSchema = mongoose.Schema(
  {
      projectCategoryID: {
          type: String,
          required: true,
      },
      projectCategoryName: {
          type: String,
          required: true,
      },
      projectCategoryValue: {
          type: String,
          required: true,
      },
      projectTitle: {
          type: String,
          required: true,
      },
      createdBy: {
          type: String       
      },
      updatedBy: {
          type: String
      },
      userID: {
          type: String,
          required: true,
      },
      description: {
          type: String
      },
      aboutstitle: {
          type: String
      },
      aboutussubtitle: {
          type: String
      },
      isActive : {
          type: Boolean,
          required : true
      }
  },
  {
    timestamps: true,
  }
)


const realEstateProject = mongoose.model('realEstateProject', realEstateProjectSchema)

export default realEstateProject
