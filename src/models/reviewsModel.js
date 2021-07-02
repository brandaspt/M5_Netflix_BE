import mongoose from "mongoose"

const reqString = {
  type: String,
  required: true,
}

const reviewSchema = mongoose.Schema(
  {
    comment: reqString,
    rate: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    imdbID: reqString,
  },
  { timestamps: true }
)

const Review = mongoose.model("Review", reviewSchema)

export default Review
