const express = require('express')
const ProjectType = require("../models/projectType.js")
const verifyJWT = require("../common/verifyJWT")

const router = express.Router()

router.get("/projectTypes", verifyJWT, (req, res) => {   
    ProjectType.find()
    .then(data => res.json(data))
    .catch(err => console.log(err))
})

module.exports = router