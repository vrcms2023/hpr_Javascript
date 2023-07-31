const express = require('express')
const projectcategories = require("../models/projectcategories.js")
const verifyJWT = require("../common/verifyJWT.js")

const router = express.Router()

router.get("/projectCategory", verifyJWT, (req, res, next) => { 
    
    projectcategories.find()
    .then(data => res.json(data))
    .catch(err => console.log(err))
})

module.exports = router