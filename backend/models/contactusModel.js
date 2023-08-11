import { mongoose } from "mongoose";

const contactUSModelSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    message: String,
  },
  {
    timestamps: true,
  },
);

const ContactUS = mongoose.model("ContactUS", contactUSModelSchema);

export default ContactUS;
