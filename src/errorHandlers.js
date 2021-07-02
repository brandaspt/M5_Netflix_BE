export const errorHandler = (err, req, res, next) => {
  switch (err.status) {
    case 400:
      res.status(400).json(err.message)
      break
    case 404:
      res.status(404).json(err.message)
      break
    default:
      console.log(err)
      res.status(500).json("Something went wrong!")
      break
  }
}
