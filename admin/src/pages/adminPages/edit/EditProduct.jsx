import React, { useState } from "react";
import uploadFile from "../../../helper/upload";
import axios from "axios";
const EditProduct = ({ product }) => {
  const [editedProduct, setEditedProduct] = useState(product);
  const [Image, setImage] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    const selectedFile = files[0];

    // Reset input value to allow re-uploading the same file
    e.target.value = "";

    if (selectedFile) {
      const imageURL = URL.createObjectURL(selectedFile);
      setEditedProduct({ ...editedProduct, [name]: imageURL });
      setImage(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(editedProduct);
    console.log("the image", Image);

    try {
      if (Image) {
        const urlImage = await uploadFile(Image, "images_product");
        setEditedProduct({ ...editedProduct, mainImage: urlImage });
      }

      const res = await axios.put(
        `http://localhost:5000/api/product/${editedProduct._id}`,
        editedProduct,
        { withCredentials: true }
      );
      console.log(res);

      // Make API call to update the product
      // Example:
      // const response = await fetch('your-api-endpoint', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(editedProduct),
      // });
      // const data = await response.json();
      console.log("Edited Product:", editedProduct);
      // Handle API response
    } catch (error) {
      console.error("Error updating product:", error);
      // Handle error updating product
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="input-field"
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={editedProduct.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="input-field"
            id="description"
            name="description"
            placeholder="Description"
            value={editedProduct.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="stock"
          >
            Stock
          </label>
          <input
            className="input-field"
            id="stock"
            name="stock"
            type="number"
            placeholder="Stock"
            value={editedProduct.stock}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="prix"
          >
            Prix
          </label>
          <input
            className="input-field"
            id="prix"
            name="prix"
            type="number"
            placeholder="Prix"
            value={editedProduct.prix}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="mainImage"
          >
            Main Image
          </label>
          <input
            className="input-field"
            id="mainImage"
            name="mainImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <img src={editedProduct.mainImage} />
        </div>

        <div className="flex items-center justify-between">
          <button className="btn-submit" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
