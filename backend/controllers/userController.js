import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import {registrationValidation, loginValidation } from '../common/validation.js'

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password, confirmPassword } = req.body

  // check if email exists in db
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(404).json({
      message : "User already exists"
    })
    throw new Error('User already exists')
  }

  const validationError = registrationValidation({ userName, email, password, confirmPassword }).error
  if (validationError) {
    return res.status(404).json({message: validationError.details[0].message})
  }

  // create new user document in db
  const user = await User.create({ userName, email, password, confirmPassword,  isActive: false,  isSuperAdmin: false })

  if (user) {
    res.status(201).json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
    })
  } else {
    res.status(400).json({message : "Invalid user data"})
    throw new Error('Invalid user data')
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const validationError = loginValidation({ email, password }).error
 
  if (validationError) {
    return res.status(404).json({message: validationError.details[0].message})
  }

  // check if user email exists in db
  const user = await User.findOne({ email })

  // return user obj if their password matches
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      isSuperAdmin: user.isSuperAdmin,
      userToken: generateToken(user._id),
    })
  } else {
    res.status(401).json({message : "Invalid email or password"})
    throw new Error('Invalid email or password')
  }
})

const getUserProfile = asyncHandler(async (req, res) => {
  // req.user was set in authMiddleware.js
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      id: user._id,
      userName: user.userName,
      isSuperAdmin: user.isSuperAdmin,
      email: user.email,
    })
  } else {
    res.status(404).json({message : "User not found"})
    throw new Error('User not found')
  }
})


const getAllUser = asyncHandler(async (req, res) => {

  const users = await User.find().select('userName email isActive isSuperAdmin'); 
  return res.json({message: data.length > 0 ? "Success" :  "Record not found" , users: users})   

})

const updateUserStatus =  asyncHandler(async (req, res) => {

  const query = { "_id": req.user._id};
  const update = { "$set": {"isActive": user.isActive } };
  const options = { returnNewDocument: true };   

  const user = await User.findOneAndUpdate(query, update, options);
  
  if (user) {
    res.status(200).json({message : "User is activated"})
  } else {
    res.status(404).json({message : "Unable to update the User"})
    throw new Error('Unable to update the User')
  }

})

export { registerUser, loginUser, getUserProfile, getAllUser, updateUserStatus }
