import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log("Cloudinary configuration set successfully:",  {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? "API Key Set" : "API Key Not Set",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "API Secret Set" : "API Secret Not Set",
});

export const cloudinaryInstance = cloudinary.v2;