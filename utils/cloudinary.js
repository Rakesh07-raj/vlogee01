const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'vlogee', // Your folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg','avif'],
  },
});

module.exports = {
  cloudinary,
  storage
};
