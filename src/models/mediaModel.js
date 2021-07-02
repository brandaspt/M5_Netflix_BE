import mongoose from "mongoose"

const reqString = {
  type: String,
  required: true,
}

const mediaSchema = mongoose.Schema(
  {
    Title: reqString,
    Year: reqString,
    imdbID: reqString,
    Type: reqString,
    Poster: reqString,
  },
  { timestamps: true }
)

const Media = mongoose.model("Media", mediaSchema)

export default Media
