import asyncHandler from "express-async-handler";
import ProjectCategory from "../models/projectCategoryModel.js";

const getAllProjectCategoryList = asyncHandler(async (req, res) => {
  const projectCategoryList = await ProjectCategory.find();

  if (projectCategoryList) {
    res.status(200).json(projectCategoryList);
  } else {
    res.status(404).json({ message: "project Category List not found" });
    throw new Error("project Category List not found");
  }
});

export { getAllProjectCategoryList };
