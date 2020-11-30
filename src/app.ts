const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
import diveRoutes from "./dive/routes"
import CompositionRoot from "./CompositionRoot";

async function connectDB() {
await mongoose.connect(
  "mongodb+srv://diveapp:4Fixsimonspc@cluster0.yrfvi.gcp.mongodb.net/test_backend",
  { useUnifiedTopology: true, useNewUrlParser: true }
);

console.log("db connected");
}
connectDB();

app.use(function(req, res, next) {
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

// our routes goes here

// this takes the post body
app.use(express.json({ extended: false }));
// signup route api
app.post("/signup", async (req, res) => {
const { email, password } = req.body;
console.log(email);
console.log(password);
var schema = new mongoose.Schema({ email: "string", password: "string" });
var User = mongoose.model("User", schema);

let user = new User({
  email,
  password,
});
console.log(user);

await user.save();
res.json({ token: "1234567890" });
// check db for email if email say the email is already taken
//   return res.send("Signup api route");
});

app.use(diveRoutes)
app.listen(5000, () => console.log("Example app listening on port 5000!"));
