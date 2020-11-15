import express, { Express } from "express"
import mongoose from "mongoose"
import diveRoutes from "./dive/routes"
import userRoutes from "./user/routes"
import cors from 'cors';
import CompositionRoot from "./CompositionRoot";

const app: Express = express()

const PORT = 3000

//options for cors midddleware
const cors_options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: "http://localhost:8000",
  preflightContinue: false,
};

app.use(cors(cors_options));

// our routes goes here
app.use(diveRoutes)
app.use(userRoutes)
app.use('/auth', CompositionRoot.authRouter())
// routes end

app.options('*', cors(cors_options));

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose.set("useFindAndModify", false)
mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })