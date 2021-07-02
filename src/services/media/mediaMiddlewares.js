import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import multer from "multer"

const postersStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Netflix/Img/Posters",
  },
})
export const postersParser = multer({ storage: postersStorage })
