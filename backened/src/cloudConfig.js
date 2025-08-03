import dotenv from 'dotenv';
dotenv.config(); 
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

console.log("CLOUD_NAME:", process.env.CLOUD_NAME);
console.log("CLOUD_API_KEY:", process.env.CLOUD_API_KEY);
console.log("CLOUD_API_SECRET:", process.env.CLOUD_API_SECRET);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'emergencies_app', // your folder name on Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

export { cloudinary, storage };
