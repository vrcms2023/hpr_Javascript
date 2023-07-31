const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const mongoose = require("mongoose")
const path = require('path')
require('dotenv').config()


const authRoutes = require("./routes/authRoutes")
const projectCategories = require("./routes/projectCategories")
const realEstateProject = require("./routes/realEstateProject")
const specification = require("./routes/specification")
const amenitie = require("./routes/amenitie")
const fileUploader = require("./routes/fileUploader")

const app = express()

app.use(cors())

const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json(), urlencodedParser)

app.use("/", authRoutes)
app.use("/", projectCategories)
app.use("/", realEstateProject)
app.use("/", specification)
app.use("/", amenitie)
app.use("/", fileUploader)


//app.use('public/uploads', express.static(process.cwd() + 'public/uploads'));



// connects to mongoDB database
mongoose.connect(process.env.dbURI, { useNewUrlParser:true, useUnifiedTopology:true })
    .then((res) => {
        // only listen for requests once database data has loaded
        app.listen(process.env.PORT || 5001, () => console.log("Server is up on port " + (process.env.PORT || 5001)))
    })
    .catch(err => console.log(err))