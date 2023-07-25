const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const mongoose = require("mongoose")
require('dotenv').config()
const authRoutes = require("./routes/authRoutes")
const projectTypes = require("./routes/projectTypes")
const realEstateProject = require("./routes/realEstateProject")

const app = express()

app.use(cors())

const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json(), urlencodedParser)


app.use("/", authRoutes)
app.use("/", projectTypes)
app.use("/", realEstateProject)

// connects to mongoDB database
mongoose.connect(process.env.dbURI, { useNewUrlParser:true, useUnifiedTopology:true })
    .then((res) => {
        // only listen for requests once database data has loaded
        app.listen(process.env.PORT || 5001, () => console.log("Server is up on port " + (process.env.PORT || 5001)))
    })
    .catch(err => console.log(err))