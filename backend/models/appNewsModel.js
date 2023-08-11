import { mongoose } from "mongoose";

const appNewsModelSchema = mongoose.Schema(
  {
    projectID: String,
    updateBy: String,
    newstitle: String,
    description: String,
    imageUrls: Array,
    imageIds: Array,
    originalnames: Array,
  },
  {
    timestamps: true,
  },
);

const AppNews = mongoose.model("AppNews", appNewsModelSchema);

export default AppNews;
