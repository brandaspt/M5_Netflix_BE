import Media from "../../models/mediaModel.js"
import createError from "http-errors"

export const getMediaItem = async (req, res, next) => {
  const imdbID = req.params.imdbID
  try {
    const reqMediaItem = await Media.findOne({ imdbID })
    if (reqMediaItem) {
      res.reqMediaItem = reqMediaItem
      next()
    } else {
      next(createError(404, `imdbID ${imdbID} not found in database`))
    }
  } catch (error) {
    console.log(error)
    next(createError(500))
  }
}
