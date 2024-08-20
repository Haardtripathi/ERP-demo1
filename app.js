<<<<<<< HEAD
const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");
const multer = require("multer");
require("dotenv").config();
=======
const express=require('express')
const path=require('path')
const ejs=require('ejs')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');
require("dotenv").config()
>>>>>>> 83f68cf8538f055cf98ff4efb86cdea671502947

const memoryStorage = multer.memoryStorage(); // Store data in memory

const upload = multer({ storage: memoryStorage });

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/files");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

<<<<<<< HEAD
const MONGODB_URI = process.env.MONGODB_URI;
=======
const MONGODB_URI =process.env.MONGODB_URL
>>>>>>> 83f68cf8538f055cf98ff4efb86cdea671502947

const adminRoutes = require("./routes/admin");
const workbookRoutes = require("./routes/workbook/workbook");
const incomingRoutes = require("./routes/workbook/incoming");
const leadRoutes = require("./routes/workbook/lead");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(multer({ storage: fileStorage }).single("csvFile"));

app.use("/admin", adminRoutes);
app.use(workbookRoutes);
app.use(incomingRoutes);
app.use(leadRoutes);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log("connection established");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
