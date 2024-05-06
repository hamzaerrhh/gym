import PreView from "./PreView";
import { useState } from "react";
import axios from "axios";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { IoMdAddCircle } from "react-icons/io";
import uploadFile from "../../../helper/upload";

const AddProduct = () => {
  const [cat, setCat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    prix: "",
    category: "",
    stock: "",
    description: "",
    mainImage: "",
    additionalImages: [], // Store multiple images in an array
  });

  const feechCat = async () => {
    const res = await axios.get("http://localhost:5000/api/product/cat", {
      withCredentials: true,
    });
    console.log("cat", res.data);
    setCat(res.data);
  };
  useEffect(() => {
    feechCat();
  }, []);

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

    // Upload main image, additional images, and submit the form data

    // Function to upload file to Cloudinary

    // Upload main image

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
    let mainImageUrl = "";
    if (formData.mainImage) {
      mainImageUrl = await uploadFile(formData.mainImage, "images_product");
    }
    // Upload additional images
    let additionalImageUrls = [];
    if (formData.additionalImages.length > 0) {
      additionalImageUrls = await Promise.all(
        formData.additionalImages.map(
          async (img) => await uploadFile(img, "images_product")
        )
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
          category: formData.category,
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
  //to add new category
  const [newCategory, setNewCategory] = useState();
  const addcategory = () => {
    if (!newCategory) {
      return;
    } else {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  do you wanna add categorye {newCategory}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Sure! 8:30pm works great!
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={async () => {
                try {
                  const res = await axios.post(
                    "http://localhost:5000/api/product/cat/addCP",
                    { newCategory },
                    { withCredentials: true }
                  );
                } catch (err) {
                  console.log(err);
                }
                console.log("yes i wanna add");
                toast.remove();
              }}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              add
            </button>
            <button
              onClick={() => {
                console.log("no i wanna add");
                toast.remove();
              }}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              close
            </button>
          </div>
        </div>
      ));
      console.log(newCategory);
    }
    setNewCategory("");
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
                  <div className="md:col-span-5 flex justify-between items-center">
                    <div className=" w-1/2">
                      <div>
                        <label htmlFor="category">Category</label>
                        <select
                          name="category"
                          id="category"
                          className="border h-10 mt-1 rounded px-4 w-full bg-gray-50 focus:ring-gray-400"
                          value={formData.category}
                          onChange={handleChange}
                        >
                          <option value="">Select a category</option>
                          {cat.map((category) => (
                            <option
                              key={category._id}
                              value={category.category}
                            >
                              {" "}
                              {/* Use category.category */}
                              {category.category}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="name">add</label>
                      <IoMdAddCircle onClick={addcategory} color="green" />
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 focus:ring-gray-400"
                        value={newCategory}
                        onChange={(e) => {
                          setNewCategory(e.target.value);
                        }}
                      />
                    </div>
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
