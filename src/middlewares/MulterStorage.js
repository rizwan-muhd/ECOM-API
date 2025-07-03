const { cloudinary } = require("../Config/Cloudinary"); // destructure v2 instance
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary, // ✅ actual v2 instance
  params: {
    folder: "ecom/products",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

module.exports = storage;
