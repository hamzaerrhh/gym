import React, { useState } from "react";
import uploadFile from "../../../helper/upload";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dateTimeStarted: new Date(),
    dateTimeEnd: new Date(),
    localisation: "",
    image: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage((prevState) => file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (!formData.title) {
      toast.error("title required");
    }
    if (!formData.description) {
      toast.error("description required");
    }
    if (!formData.dateTimeEnd) {
      toast.error("end date required");
    }
    if (!formData.dateTimeStarted) {
      toast.error("start required");
    }
    if (!formData.localisation) {
      toast.error("localisation required");
    }
    if (!image) {
      toast.error("image required");
    }
    //upload

    if (image) {
      const imageUrl = await uploadFile(image, "event_images");
      setFormData({ ...formData, image: imageUrl });
    }

    console.log(formData.image);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/event",
        { formData },
        { withCredentials: true }
      );
      console.log(res);
      toast.success("event added succesfully");

      setFormData({
        title: "",
        description: "",
        dateTimeStarted: new Date(),
        dateTimeEnd: new Date(),
        localisation: "",
        image: "",
      });
      setImage(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Add Event</h2>
      <Toaster position="top-right" reverseOrder={false} />
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="mb-4 md:w-1/3">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4 md:w-1/3">
              <label
                htmlFor="dateTimeStarted"
                className="block text-sm font-medium text-gray-700"
              >
                Start Date and Time
              </label>
              <input
                type="date"
                id="dateTimeStarted"
                name="dateTimeStarted"
                value={formData.dateTimeStarted}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4 md:w-1/3">
              <label
                htmlFor="dateTimeEnd"
                className="block text-sm font-medium text-gray-700"
              >
                End Date and Time
              </label>
              <input
                type="date"
                id="dateTimeEnd"
                name="dateTimeEnd"
                value={formData.dateTimeEnd}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="localisation"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="localisation"
              name="localisation"
              value={formData.localisation}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <div className="flex items-center justify-between">
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
              <label
                htmlFor="image"
                className="flex items-center p-2 border border-gray-300 rounded-md cursor-pointer"
              >
                <span className="mr-2 text-sm">Upload Image</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </label>
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Event"
                  className="w-24 h-24 object-cover rounded-md"
                />
              )}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
