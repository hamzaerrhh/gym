import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.ClOUDINERY_NAME,
  api_key: process.env.CLOUDINERY_API,
  api_secret: process.env.ClOUDINERY_KEY,
});

export default cloudinary;
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: "djq8hnmt9",
//   api_key: "871847447461642",
//   api_secret: "Qg7UMoBR3T4OgguCydnGj2NH5zU",
// });
