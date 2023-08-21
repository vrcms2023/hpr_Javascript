import asyncHandler from "express-async-handler";
import ContactusModel from "../models/contactusModel.js";

const saveContactusDetails = asyncHandler(async (req, res) => {
  const project = req.body;
  const dbContactUS = new ContactusModel({
    firstName: project.firstName,
    email: project.email,
    phone: project.phone,
    message: project.message,
  });
  dbContactUS.save();
  return res.json({ message: "Success" });
});

export { saveContactusDetails };
