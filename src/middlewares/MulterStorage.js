const v2 as cloudinary = require("cloudinary");
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ecom/products",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

module.exports = storage;
