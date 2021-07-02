import express from "express"
import {
  getAllMedia,
  getSingleMedia,
  addNewMedia,
  editMedia,
  deleteMedia,
  uploadMediaPoster,
  downloadPDF,
} from "../../controllers/mediaController.js"
import { getMediaItem } from "../globalMiddlewares/middlewares.js"
import { postersParser } from "./mediaMiddlewares.js"

const router = express.Router()

// GET all
router.get("/", getAllMedia)

// GET single
router.get("/:imdbID", getMediaItem, getSingleMedia)

// POST new media
router.post("/", addNewMedia)

// PUT media
router.put("/:imdbID", getMediaItem, editMedia)

// DELETE media
router.delete("/:imdbID", getMediaItem, deleteMedia)

// POST poster
router.post("/:imdbID/uploadPoster", getMediaItem, postersParser.single("mediaPoster"), uploadMediaPoster)

// GET pdf
router.get("/:imdbID/downloadPDF", getMediaItem, downloadPDF)

export default router
