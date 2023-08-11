import { mongoose } from "mongoose";

const testimonialModelSchema = mongoose.Schema(
  {
    projectID: String,
    updateBy: String,
    title: String,
    description: String,
    imageUrl: String,
    imageId: String,
    originalname: String,
  },
  {
    timestamps: true,
  },
);

const Testimonial = mongoose.model("Testimonial", testimonialModelSchema);

export default Testimonial;
