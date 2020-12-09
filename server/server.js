require("dotenv").config();
var express = require("express");
var mongo = require("mongodb");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var md5 = require("md5");
var myUrl = require("url");
var dns = require("dns");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });
// var validate = require("valid-url");
var app = express();
// var port = 3000;
var port = process.env.PORT || 5000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
const { url } = require("inspector");
// app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204
app.use(cors());
// http://expressjs.com/en/starter/static-files.html
// app.use(express.static("public"));
// app.use("/public", express.static(`${process.cwd()}/public`));

//using body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// http://expressjs.com/en/starter/basic-routing.html

// databse connection
mongoose.connect(process.env.MONGO_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});
const userSchema = new mongoose.Schema({
   role: String,
   email: String,
   name: String,
   password: String,
   age: Number,
   gender: String,
   phone: String,
   dateOfBith: String,
   dateJoined: String,
   profileImage: String,
   Photos: [],
   location: {},
   relatives: [
      {
         name: String,
         relationship: String,
         location: {},
         profileImage: String,
      },
   ],
   frieds: [{ name: String, location: {}, profileImage: String }],
});
const user = mongoose.model("user", userSchema);
// const newUser = new user({
//    role: "citizen",
//    email: "zabdullahi15@yahoo.com",
//    name: "Zaks",
//    age: 23,
//    gender: "male",
//    dateJoined: new Date(),
// });
// newUser.save((err, data) => {
//    if (err) {
//       console.log(err);
//       // res.send("CONNECTION ERROR");
//    } else {
//       console.log(data);
//       // res.json(data);
//    }
// });
//test
app.get("/", function (req, res) {
   res.send("helo world from DeSec Engineers");
});

//DISTRESS CALL
app.get("/distress", function (req, res) {
   //need location
   const ipaddress = req.connection.remoteAddress;
   res.json({ address: ipaddress, status: "destress sent" });
   console.log("destress call sent");
});
//ANONYMOUS MESSAGE
app.get("/anon_msg", function (req, res) {
   //need location
   const ipaddress = req.connection.remoteAddress;
   res.json({ address: ipaddress, status: "message sent sent" });
   console.log("sending anonymous message");
});
app.post("/signup", function (req, res) {
   const { email, username, password1, password2 } = req.body;
   if (password1 !== password2) {
      res.send("password fields should match");
      console.log("password fields should match");
   } else {
      user.findOne({ email: email }, (err, data) => {
         if (err) {
            console.log("database CONNECTION ERROR");
            res.send("CONNECTION ERROR");
         } else {
            if (data) {
               console.log("email already exists");
               res.send("email already exists, try logging in");
            } else {
               const newUser = new user({
                  email: email,
                  password: md5(password1),
                  name: username,
               });
               newUser.save((err, data) => {
                  if (err) {
                     console.log("database connection error");
                     res.send("connection erro, please try again");
                  } else {
                     res.json(data);
                  }
               });
            }
         }
      });
   }
   res.send("signup");
   console.log("destress call sent");
   console.log(req.body);
});
app.post("/login", function (req, res) {
   res.send("login succefull, you'll be redirected to home page");
   console.log("destress call sent");
});
//listener
var listener = app.listen(port, function () {
   console.log("Your app is listening on port " + listener.address().port);
});
