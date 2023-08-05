const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const mongoose = require("mongoose")
const winston = require("winston");
require('dotenv').config()


const authRoutes = require("./routes/authRoutes")
const projectCategories = require("./routes/projectCategories")
const realEstateProject = require("./routes/realEstateProject")
const specification = require("./routes/specification")
const amenitie = require("./routes/amenitie")
const fileUploader = require("./routes/fileUploader")
const contactUS = require("./routes/contactus");
const userAdmin  = require("./routes/userAdmin");
const appNews  = require("./routes/appNews");

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
app.use("/", contactUS)
app.use('/', userAdmin)
app.use("/", appNews)


const logger = winston.createLogger({
    // Log only if level is less than (meaning more severe) or equal to this
    level: "info",
    // Use timestamp and printf to create a standard log format
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
      )
    ),
    // Log to the console and a file
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "logs/app.log" }),
    ],
  });

  app.use((req, res, next) => {
    // Log an info message for each incoming request
    logger.info(`Received a ${req.method} request for ${req.url}`);
    next();
  });

  // Handle errors using the logger
app.use((err, req, res, next) => {
    // Log the error message at the error level
    logger.error(err.message);
    res.status(500).send();
  });


// connects to mongoDB database
mongoose.connect(process.env.dbURI, { useNewUrlParser:true, useUnifiedTopology:true })
    .then((res) => {
        // only listen for requests once database data has loaded
        app.listen(process.env.PORT || 5001, () => console.log("Server is up on port " + (process.env.PORT || 5001)))
    })
    .catch(err => console.log(err))