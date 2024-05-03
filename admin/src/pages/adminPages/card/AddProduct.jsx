import PreView from "./PreView";
import { useState } from "react";
import axios from "axios";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import toast, { Toaster } from "react-hot-toast";

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    prix: "",
    category: [],
    stock: "",
    description: "",
    mainImage: "",
    additionalImages: [], // Store multiple images in an array
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMainImageChange = (e) => {
    const image = e.target.files[0];
    setFormData((prevFormData) => ({ ...prevFormData, mainImage: image }));
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    setFormData((prevFormData) => ({
      ...prevFormData,
      additionalImages: [...prevFormData.additionalImages, ...files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErr("");
    // Convert comma-separated categories into an array
    let categories = [];
    if (category) {
      categories = formData.category.split(",").map((cat) => cat.trim());
    }

    // Remaining code remains the same...
    // Upload main image, additional images, and submit the form data

    // Function to upload file to Cloudinary
    const uploadFile = async (img) => {
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "images_product");

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
    if (!formData.stock || formData.stock < 0) {
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
    // Upload additional images
    let additionalImageUrls = [];
    if (formData.additionalImages.length > 0) {
      additionalImageUrls = await Promise.all(
        formData.additionalImages.map(async (img) => await uploadFile(img))
      );
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
        "http://localhost:5000/api/product/add",
        {
          name: formData.name,
          prix: formData.prix,
          category: categories,
          stock: formData.stock,
          description: formData.description,
          mainImage: mainImageUrl,
          additionalImages: additionalImageUrls,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Response:", response.data);

      // Reset form data after successful submission
      setFormData({
        name: "",
        prix: "",
        category: "",
        stock: "",
        description: "",
        mainImage: "",
        additionalImages: [],
      });
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
            <PreView data={formData} />
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 focus:ring-gray-400"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="md:col-span-5">
                    <label htmlFor="description">Description</label>
                    <textarea
                      name="description"
                      id="description"
                      className="border mt-1 rounded px-4 w-full bg-gray-50 focus:ring-gray-400"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter description"
                    />
                  </div>
                  <div className="md:col-span-5">
                    <label htmlFor="category">Category (comma-separated)</label>
                    <input
                      type="text"
                      name="category"
                      id="category"
                      className="border h-10 mt-1 rounded px-4 w-full bg-gray-50 focus:ring-gray-400"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="Enter categories"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label htmlFor="prix">Price</label>
                    <input
                      type="text"
                      name="prix"
                      id="prix"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 focus:ring-gray-400"
                      value={formData.prix}
                      onChange={handleChange}
                      placeholder="Enter price"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="stock">In Stock</label>
                    <input
                      type="number"
                      name="stock"
                      id="stock"
                      placeholder="0"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 focus:ring-gray-400"
                      value={formData.stock}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="mainImage">Main Image</label>
                    <input
                      type="file"
                      name="mainImage"
                      id="mainImage"
                      accept="image/*"
                      className="border mt-1 rounded px-4 w-full bg-gray-50 focus:ring-gray-400"
                      onChange={handleMainImageChange}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label htmlFor="additionalImages">Additional Images</label>
                    <input
                      type="file"
                      name="additionalImages"
                      id="additionalImages"
                      accept="image/*"
                      multiple // Allow multiple files selection
                      className="border mt-1 rounded px-4 w-full bg-gray-50 focus:ring-gray-400"
                      onChange={handleAdditionalImagesChange}
                    />
                  </div>
                </div>
                {/*add the preview images*/}

                <div className=" flex gap-2 justify-start py-4 align-middle items-center">
                  {formData.additionalImages &&
                    formData.additionalImages.map((image, index) => (
                      <div className=" w-10" key={index}>
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Image ${index}`}
                        />
                      </div>
                    ))}
                </div>

                <div className="md:col-span-5 flex flex-col w-full text-right justify-center items-center">
                  <div className="w-full flex justify-center items-center mb-4">
                    {loading ? (
                      <ClimbingBoxLoader color="green" size={10} />
                    ) : (
                      ""
                    )}
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                  >
                    Submit
                  </button>
                  <div className=" text-red-400 font-medium pt-2">
                    {err && err}
                  </div>
                </div>

                {/*add the err*/}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
