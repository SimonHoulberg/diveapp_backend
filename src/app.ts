import express, { Express } from "express"
import mongoose from "mongoose"
import diveRoutes from "./dive/routes"
import userRoutes from "./user/routes"

const app: Express = express()

const PORT: string | number = process.env.PORT || 3000

app.use(diveRoutes)
app.use(userRoutes)

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.yrfvi.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }
console.log(uri)
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