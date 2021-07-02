import express from "express"
import { getMediaItem } from "../globalMiddlewares/middlewares.js"
import { getAllReviewsByimdbID, addNewReview, deleteReview } from "../../controllers/reviewsController.js"

const router = express.Router()

// GET all reviews by imdbID
router.get("/:imdbID", getMediaItem, getAllReviewsByimdbID)

// POST new review
router.post("/:imdbID", getMediaItem, addNewReview)

// DELETE review
router.delete("/:reviewID", deleteReview)

export default router
