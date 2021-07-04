import express from "express"
import mongoose from "mongoose"
import cors from "cors"

import mediaRouter from "./services/media/mediaRoute.js"
import reviewsRouter from "./services/reviews/reviewsRoute.js"
import { errorHandler } from "./errorHandlers.js"
import { corsOptions } from "./settings/cors.js"

const server = express()
const PORT = process.env.PORT || 5000

// ### MIDDLEWARES ###
server.use(cors(corsOptions))
server.use(express.json())

// ### ENDPOINTS ###
server.use("/media", mediaRouter)
server.use("/reviews", reviewsRouter)

// ### ERROR HANDLERS ###
server.use(errorHandler)

// ### DB CONNECTION ###
mongoose
  .connect(process.env.DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() =>
    server.listen(PORT, () => {
      console.log("Server is running on port " + PORT)
    })
  )
  .catch(err => console.log(err.message))
