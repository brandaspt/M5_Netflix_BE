import Review from "../models/reviewsModel.js"
import createError from "http-errors"

export const getAllReviewsByimdbID = async (req, res, next) => {
  try {
    res.json(await Review.find({ imdbID: req.params.imdbID }))
  } catch (error) {
    next(createError(500))
  }
}

export const addNewReview = async (req, res, next) => {
  const reviewData = { ...req.body }
  reviewData.imdbID = req.params.imdbID
  try {
    const newReview = new Review(reviewData)

    await newReview.save()
    res.status(201).json(newReview)
  } catch (error) {
    next(createError(400, error.message))
  }
}

export const deleteReview = async (req, res, next) => {
  try {
    const deletedReview = await Review.findOneAndDelete({ _id: req.params.reviewID })
    res.json(deleteReview)
  } catch (error) {
    next(createError(400, error.message))
  }
}
