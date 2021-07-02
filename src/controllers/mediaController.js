import { pipeline } from "stream"
import createError from "http-errors"

import { omdbBackend } from "../lib/requests.js"
import Media from "../models/mediaModel.js"
import { getB64String } from "../lib/utils.js"
import { mediaPDFStream } from "../lib/pdf.js"
// import axios from "axios"

export const getAllMedia = async (req, res, next) => {
  try {
    res.json(await Media.find())
  } catch (error) {
    console.log(error.message)
    res.status(500)
  }
}

export const getSingleMedia = async (req, res, next) => {
  res.json(res.reqMediaItem)
}

export const addNewMedia = async (req, res, next) => {
  const targetImdbID = req.body.imdbID
  try {
    // Check if imdbID already exists in DB
    const mediaExists = await Media.exists({ imdbID: targetImdbID })
    if (mediaExists) return next(createError(400, "imdbID already in database"))

    // Fetching media data from omdb by imdbID
    let data
    const response = await omdbBackend.get(`?apikey=${process.env.OMDB_API_KEY}&i=${targetImdbID}`)
    data = response.data
    if (data.Response === "False") return next(createError(400, data.Error))

    // Extracting relevant fields and saving to DB
    const { Title, Year, imdbID, Type, Poster } = data
    const newMediaData = { Title, Year, imdbID, Type, Poster }
    const newPost = new Media(newMediaData)

    await newPost.save()
    res.status(201).json(newPost)
  } catch (error) {
    console.log(error)
    next(createError(500))
  }
}

export const editMedia = async (req, res, next) => {
  const update = { ...req.body }
  try {
    const updatedMedia = await Media.findByIdAndUpdate(res.reqMediaItem._id, update, { new: true })
    res.json(updatedMedia)
  } catch (error) {
    console.log(error)
    next(createError(500))
  }
}

export const deleteMedia = async (req, res, next) => {
  try {
    res.reqMediaItem.delete()
    res.json("Item deleted successfully")
  } catch (error) {
    console.log(error)
    next(createError(500))
  }
}

export const uploadMediaPoster = async (req, res, next) => {
  const update = { Poster: req.file.path }
  try {
    const updatedMedia = await Media.findByIdAndUpdate(res.reqMediaItem._id, update, { new: true })
    res.json(updatedMedia)
  } catch (error) {
    next(createError(500))
  }
}

export const downloadPDF = async (req, res, next) => {
  const mediaItem = res.reqMediaItem
  try {
    const imageB64String = await getB64String(mediaItem.Poster)

    res.setHeader("Content-Disposition", `attachment; filename=${mediaItem.Title}.pdf`)
    const source = mediaPDFStream(mediaItem, imageB64String)
    const destination = res
    pipeline(source, destination, err => {
      if (err) next(createError(500))
    })
  } catch (error) {
    console.log(error)
    next(createError(500))
  }
}
