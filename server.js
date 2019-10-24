const express = require("express");
const cors = require("cors")
const basicAuth = require("express-basic-auth")
const atob = require("atob")
// const auth = require("./basicVersion")
const auth = require("./basicAuthMongoose")
var userRouter = require("./routes/user")
const mongoose = require("mongoose")

require('dotenv').config()


const server = express();

server.use(cors())
server.use(express.json());

server.use("/users", userRouter)

server.get("/", auth.authEndPoint, auth.setUserIntoReq, (req, res) => {
 res.send("user is" + req.user)
  // if (req.user == "admin")
  //   res.send("ok")
  // else {
  //   res.statusCode = 401
  //   res.send("Admin credentials required")
  // }
})

mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true
}).then(server.listen(3000, () => {
  console.log("Server running on port 3000");
})).catch(err => console.log(err))

// server.listen(3000, () => {
//   console.log("Server running on port 3000")
// })