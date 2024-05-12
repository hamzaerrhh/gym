import FoodCard from "../card/FoodCard";
import { useState } from "react";
import axios from "axios";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

const AddFood = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    prix: 0,
    description: "",
    fat: 0,
    protein: 0,
    carbs: 0,
    ingrediens: "",
    mainImage: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMainImageChange = (e) => {
    const image = e.target.files[0];
    setFormData((prevFormData) => ({ ...prevFormData, mainImage: image }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    setLoading(true);

    setErr("");
    // Convert comma-separated categories into an array

    let ingredients = [];
    if (formData.ingrediens) {
      ingredients = formData.ingrediens.split(",").map((cat) => cat.trim());
    }

    // Remaining code remains the same...
    // Upload main image, additional images, and submit the form data

    // Function to upload file to Cloudinary
    const uploadFile = async (img) => {
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "food_images");

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
        setErr("error in download image please try again");
      }
    };

    // Upload main image
    let mainImageUrl = "";
    if (formData.mainImage) {
      mainImageUrl = await uploadFile(formData.mainImage);
    }
    if (!formData.name) {
      toast.error("u forget the name.");

      setLoading(false);
      setErr("please entrer a name");
      return;
    }
    if (!formData.prix || formData.prix < 0) {
      toast.error("u forget the prix.");

      setLoading(false);

      setErr("entrer a  valid prix");
      return;
    }
    if (!formData.fat || formData.fat < 0) {
      toast.error("u forget the stock.");

      setLoading(false);

      setErr("please enter a valid stock");
      return;
    }
    if (!formData.carbs || formData.carbs < 0) {
      toast.error("u forget the stock.");

      setLoading(false);

      setErr("please enter a valid stock");
      return;
    }
    if (!formData.protein || formData.protein < 0) {
      toast.error("u forget the stock.");

      setLoading(false);

      setErr("please enter a valid stock");
      return;
    }
    if (!formData.description) {
      toast.error("u forget the description.");

      setLoading(false);

      setErr("please enter a valid stock");
      return;
    }

    if (!mainImageUrl) {
      toast.error("u forget the images.");

      setLoading(false);

      setErr("please enter a image");
      return;
    }

    // Send form data to API
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/food/add`,
        {
          name: formData.name,
          prix: formData.prix,
          ingrediens: ingredients,
          info: {
            fat: formData.fat,
            protein: formData.protein,
            carbs: formData.carbs,
          },
          description: formData.description,
          mainImage: mainImageUrl,
        },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );

      setFormData({
        name: "",
        prix: "",
        ingrediens: "",

        fat: 0,
        protein: 0,
        carbs: 0,

        description: "",
        mainImage: null,
      });
      console.log("Response:", response.data);

      // Reset form data after successful submission

      setLoading(false);
      toast.success("Successfully toasted!");
    } catch (error) {
      console.error("Error:", error);
      setErr("error in adding product please try aggain ");
      toast.error("This didn't work.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="container max-w-screen-lg mx-auto">
        <div className="">
          <Toaster position="top-right" reverseOrder={false} />
        </div>
        <h2 className="font-semibold text-xl text-gray-600 p-3">Add Product</h2>
        <div className="bg-white rounded shadow-lg p-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <FoodCard food={formData} />
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                <div className="grid gap-4 text-sm grid-cols-1 md:grid-cols-2">
                  <div className="col-span-2">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-input"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="prix">Price (dh)</label>
                    <input
                      type="number"
                      min="0"
                      name="prix"
                      id="prix"
                      className="form-input"
                      value={formData.prix}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="description">Description</label>
                    <textarea
                      name="description"
                      id="description"
                      className="form-textarea"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter description"
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="ingrediens">
                      Ingredients (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="ingrediens"
                      id="ingrediens"
                      className="form-input"
                      value={formData.ingrediens}
                      onChange={handleChange}
                      placeholder="Enter ingredients"
                    />
                  </div>
                  <div>
                    <label htmlFor="protein">Protein</label>
                    <input
                      type="number"
                      min="0"
                      name="protein"
                      id="protein"
                      className="form-input"
                      value={formData.protein}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="carbs">Carbs</label>
                    <input
                      type="number"
                      min="0"
                      name="carbs"
                      id="carbs"
                      className="form-input"
                      value={formData.carbs}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="fat">Fat</label>
                    <input
                      type="number"
                      min="0"
                      name="fat"
                      id="fat"
                      className="form-input"
                      value={formData.fat}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="mainImage">Main Image</label>
                    <input
                      type="file"
                      name="mainImage"
                      id="mainImage"
                      accept="image/*"
                      className="form-input"
                      onChange={handleMainImageChange}
                    />
                  </div>
                </div>

                <div className="flex justify-center items-center">
                  {loading && <ClimbingBoxLoader color="green" size={10} />}
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mt-4"
                >
                  Submit
                </button>

                {err && (
                  <div className="text-red-400 font-medium mt-2">{err}</div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
