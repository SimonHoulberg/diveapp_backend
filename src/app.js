const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
import diveRoutes from "./dive/routes"
var jwt = require('jsonwebtoken');


async function connectDB() {
await mongoose.connect(
  "mongodb+srv://diveapp:4Fixsimonspc@cluster0.yrfvi.gcp.mongodb.net/test_backend",
  { useUnifiedTopology: true, useNewUrlParser: true }
);

console.log("db connected");
}
connectDB();

app.use(function(req: any, res: any, next: any) {
      res.setHeader('Access-Control-Allow-Origin', '*');

      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);

      // Pass to next layer of middleware
      next();
});
app.use(diveRoutes)
app.use(express.json({ extended: false }));

var schema = new mongoose.Schema({ email: "string", password: "string", name: "string" });
var User = mongoose.model("User", schema);

// our routes goes here
// this takes the post body
// signup route api
app.post("/signup", async (req: any, res: any) => {
  const { email, password } = req.body;
  console.log(email);

  let user = await User.findOne({ email });

  if (user) {
    return res.json({ msg: "Email already taken" });
  }

  user = new User({
    email,
    password,
  });

  await user.save();
  var token = jwt.sign({ id: user.id }, "password");
  res.json({ token: token });
});

// login route api
app.post("/login", async (req: any, res: any) => {
  const { email, password } = req.body;
  console.log(email);

  let user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    return res.json({ msg: "no user found with that email" });
  }
  if (user.password !== password) {
    return res.json({ msg: "password is not correct" });
  }

  var token = jwt.sign({ id: user.id }, "password");
  return res.json({ token: token });
});

app.listen(5000, () => console.log("App listening on port 5000!"));
