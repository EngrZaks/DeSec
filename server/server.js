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
const e = require("express");
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
//home route
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

//SIGNUP
app.post("/signup", function (req, res) {
   const { email, username, password1, password2 } = req.body;
   if (!email || !username || !password1 || !password2) {
      res.send("please provide the right info");
      console.log("invalid fields");
      return;
   }
   if (password1.length <= 5) {
      res.send("password length must be greater than five");
      console.log("short password");
      return;
   }
   if (password1 !== password2) {
      res.send("password fields should match");
      console.log("password fields should match");
      return;
   } else {
      user.findOne({ email: email }, (err, data) => {
         if (err) {
            console.log("database CONNECTION ERROR");
            res.send("CONNECTION ERROR");
            return;
         } else {
            if (data) {
               console.log("email already exists");
               res.send("email already exists, try logging in");
               return;
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
                     res.json({ signup_status: "succesful", ...data });
                  }
               });
            }
         }
      });
   }
});

//LOGIN
app.post("/login", function (req, res) {
   const { email, password } = req.body;
   if (!email || !password || email.length == 0 || password.length == 0) {
      res.send("please provide your sign in details");
      console.log("no data");
   } else {
      user.findOne({ email: email }, (err, data) => {
         if (err) {
            console.log(err);
            res.send("connection error");
         } else if (data) {
            if (data.password !== md5(password)) {
               res.send("user password does not match");
               console.log("user password does not match");
               return;
            } else if (data.password === md5(password)) {
               res.json({ login_status: "succesful", ...data });
            }
         }
      });
   }
});
//listener
var listener = app.listen(port, function () {
   console.log("Your app is listening on port " + listener.address().port);
});
