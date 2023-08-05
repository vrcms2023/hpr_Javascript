const express = require('express')
const User = require("../models/user.js")
const verifyJWT = require("../common/verifyJWT.js")

const router = express.Router()

router.get("/getAllUsers", verifyJWT, async (req, res, next) => {   

    const data = await User.find().select('userName email isActive isSuperAdmin');   
    return res.json({message: data.length > 0 ? "Success" :  "Record not found" , users: data}) 
   
})


router.post("/userActiveStatusUpdate", verifyJWT, async (req, res, next) => {

    const user = req.body;   
    const query = { "_id": user.id };
    const update = {
        "$set": {
            "isActive": user.isActive
        }
      };
    const options = { returnNewDocument: true };   

    await User.findOneAndUpdate(query, update, options)
        .then(updatedDocument => {return updatedDocument})
        .catch(err => console.error(`Failed to find and update document: ${err}`))
    
    return res.json({message: "Success"})
})


module.exports = router