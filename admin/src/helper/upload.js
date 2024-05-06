import axios from "axios";
export const uploadFile = async (img, presist) => {
  const data = new FormData();
  data.append("file", img);
  data.append("upload_preset", presist);
  try {
    let res = await axios.post(
      "https://api.cloudinary.com/v1_1/djq8hnmt9/image/upload",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const imageUrl = res.data.secure_url;
    console.log(imageUrl);
    return imageUrl;
  } catch (err) {
    console.log(err);
  }
};

export default uploadFile;
