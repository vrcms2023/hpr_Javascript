import { mongoose } from "mongoose";

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
      type: String,
    },
    updatedBy: {
      type: String,
    },
    userID: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    aboutstitle: {
      type: String,
    },
    aboutussubtitle: {
      type: String,
    },
    percentValue: {
      type: String,
    },
    imageDescription: {
      type: String,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    publish: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Realestateproject = mongoose.model(
  "realestateproject",
  realEstateProjectSchema,
);

// mongoose.set("debug", (collectionName, method, query, doc) => {
//     console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
// });

export default Realestateproject;
