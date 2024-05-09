import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import uploadFile from "../../../helper/upload";
import axios from "axios";
import { ClipLoader } from "react-spinners";
const ClubForm = () => {
  const [view, setView] = useState(false);
  const [clubData, setClubData] = useState({
    name: "",
    description: "",
    image: "",
    sport: "",
    category: "",

    timeline: [{ day: "", startTime: "", endTime: "" }],
    prix: {
      oneMonth: 0,
      threeMonths: 0,
      sixMonths: 0,
      oneYear: 0,
    },
  });
  const [loading, setLoading] = useState(false);
  const [image, setMainImage] = useState(null);
  const [show, setShow] = useState(false);
  const startTimeOptions = [];
  for (let hour = 8; hour <= 22; hour++) {
    for (let minute = 0; minute <= 30; minute += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      startTimeOptions.push(time);
    }
  }

  console.log(startTimeOptions);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedTimeline = [...clubData.timeline];
    updatedTimeline[index][name] = value;
    setClubData({ ...clubData, timeline: updatedTimeline });
  };

  const handleAddTimelineEntry = () => {
    setClubData({
      ...clubData,
      timeline: [...clubData.timeline, { day: "", startTime: "", endTime: "" }],
    });
  };

  const handleRemoveTimelineEntry = (index) => {
    const updatedTimeline = [...clubData.timeline];
    updatedTimeline.splice(index, 1);
    setClubData({ ...clubData, timeline: updatedTimeline });
  };

  useEffect(() => {
    console.log("the image to go ", clubData.image);
  }, [clubData.image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(clubData);
      //upload the image
      console.log("sssss");

      let imageUrl = "";

      try {
        imageUrl = await uploadFile(image, "club_images");

        setClubData((prevState) => ({
          ...prevState,
          image: imageUrl,
        }));
        console.log("ggggg");

        // Logging the image URL after setting the state
        console.log("the image to go ", imageUrl); // Log the imageUrl directly after setting the state
      } catch (error) {
        console.error("Error uploading image:", error);
      }

      // Logging the image URL after setting the state
      console.log("the image to go ", clubData.image);

      const res = await axios.post(
        "http://localhost:5000/api/club",
        { clubData },
        { withCredentials: true }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
    // then clear all data
    // Clear the form data
    setClubData({
      name: "",
      description: "",
      image: "",
      sport: "",
      category: "",
      timeline: [{ day: "", startTime: "", endTime: "" }],
      prix: { oneMonth: 0, threeMonths: 0, sixMonths: 0, oneYear: 0 },
    });

    setMainImage(null);

    // Send a toast notification
    toast.success("Form data cleared successfully!");
    setLoading(false);
    // Hide the form
    setShow(false);

    //set the show false
  };
  const handleShow = () => {
    if (!clubData.name.trim()) {
      toast.error("The name is missing.");
      return;
    }
    if (!clubData.description.trim()) {
      toast.error("The description is missing.");
      return;
    }
    if (!image) {
      toast.error("The image is missing.");
      return;
    }
    if (!clubData.category) {
      toast.error("The category is missing.");
      return;
    }
    if (!clubData.sport) {
      toast.error("The sport is missing.");
      return;
    }

    if (
      clubData.prix.oneMonth <= 0 ||
      clubData.prix.threeMonths <= 0 ||
      clubData.prix.sixMonths <= 0 ||
      clubData.prix.oneYear <= 0
    ) {
      toast.error("The price values should be greater than zero.");
      return;
    }
    if (
      clubData.timeline.some(
        (entry) => !entry.day || !entry.startTime || !entry.endTime
      )
    ) {
      toast.error("The timeline entries are incomplete.");
      return;
    }

    setShow(true);
  };

  //i will show the preview

  return (
    <div className=" mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create Club</h2>
      <Toaster position="top-right" reverseOrder={false} />
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className=" flex justify-around w-full   gap-1">
          <div className="mb-4 w-1/3">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={clubData.name}
              onChange={(e) =>
                setClubData({ ...clubData, name: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Description Input */}
          <div className="mb-4 w-2/3">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={clubData.description}
              onChange={(e) =>
                setClubData({ ...clubData, description: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className=" flex gap-2  w-full">
          <div className="mb-4 w-1/3">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              sport:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={clubData.sport}
              onChange={(e) =>
                setClubData({ ...clubData, sport: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex w-2/3 mb-2">
            <select
              name="day"
              value={clubData.category}
              onChange={(e) =>
                setClubData({ ...clubData, category: e.target.value })
              }
              className="w-1/3 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select category</option>
              <option value="man">man</option>
              <option value="kids">kids</option>
              <option value="women">women</option>
              <option value="mix">mix</option>
            </select>
          </div>
        </div>

        {/* Image Input */}
        {image ? (
          <>
            <img
              src={URL.createObjectURL(image)}
              alt="Club"
              className="mb-2 rounded-md"
              style={{ width: "200px", height: "200px" }} // Adjust width and height values as needed
            />

            <button
              className=""
              onClick={() => {
                setMainImage(null);
              }}
            >
              remove
            </button>
          </>
        ) : (
          <div className="justify-center items-center w-full h-full flex">
            <div className="extraOutline p-4 bg-white max-w-max mx-auto rounded-lg">
              <div
                className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg"
                style={{ width: 450 }}
              >
                <label
                  htmlFor="image"
                  className="absolute inset-0 cursor-pointer"
                >
                  <svg
                    className="text-indigo-500 w-24 mx-auto mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {/* Icon SVG */}
                  </svg>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setMainImage(file);
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                </label>
                <div className="input_field flex flex-col mx-auto text-center">
                  <label htmlFor="image" className="text-sm cursor-pointer">
                    <div className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">
                      Select
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Timeline Inputs */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Timeline:
          </label>
          {clubData.timeline.map((entry, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <select
                name="day"
                value={entry.day}
                onChange={(e) => handleInputChange(index, e)}
                className="w-1/3 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
              <select
                type="text"
                name="startTime"
                onChange={(e) => handleInputChange(index, e)}
                value={entry.startTime}
              >
                {" "}
                <option value="">start</option>
                {startTimeOptions.map((time, index) => (
                  <option key={index} value={time}>
                    {" "}
                    {time}
                  </option>
                ))}
              </select>
              <select
                type="text"
                name="endTime"
                onChange={(e) => handleInputChange(index, e)}
                value={entry.endTime}
              >
                <option value="">end</option>

                {startTimeOptions.map((time, index) => (
                  <option key={index} value={time}>
                    {" "}
                    {time}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => handleRemoveTimelineEntry(index)}
                className="px-2 py-1 bg-red-500 text-white rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTimelineEntry}
            className="px-2 py-1 bg-blue-500 text-white rounded-md"
          >
            Add Entry
          </button>
        </div>

        <div className="mb-4 gap-2">
          <label
            htmlFor="oneMonth"
            className="block text-gray-700 font-bold mb-2"
          >
            Prix (in dh):
          </label>
          <div className="flex gap-2">
            <h3 className=" w-1/4"> 1 mounth</h3>
            <input
              type="number"
              id="oneMonth"
              name="oneMonth"
              value={clubData.prix.oneMonth}
              onChange={(e) =>
                setClubData({
                  ...clubData,
                  prix: { ...clubData.prix, oneMonth: e.target.value },
                })
              }
              placeholder="One Month"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className=" flex gap-2">
            <h3 className=" w-1/4">3 mounth</h3>
            <input
              type="number"
              id="threeMonths"
              name="threeMonths"
              value={clubData.prix.threeMonths}
              onChange={(e) =>
                setClubData({
                  ...clubData,
                  prix: { ...clubData.prix, threeMonths: e.target.value },
                })
              }
              placeholder="Three Months"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className=" flex gap-2">
            <h3 className=" w-1/4  "> 6 mounth</h3>
            <input
              type="number"
              id="sixMonths"
              name="sixMonths"
              value={clubData.prix.sixMonths}
              onChange={(e) =>
                setClubData({
                  ...clubData,
                  prix: { ...clubData.prix, sixMonths: e.target.value },
                })
              }
              placeholder="Six Months"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className=" flex gap-2">
            <h1 className=" w-1/4">1 years</h1>
            <input
              type="number"
              id="oneYear"
              name="oneYear"
              value={clubData.prix.oneYear}
              onChange={(e) =>
                setClubData({
                  ...clubData,
                  prix: { ...clubData.prix, oneYear: e.target.value },
                })
              }
              placeholder="One Year"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <button onClick={handleShow}> Next </button>
      </form>
      {show && (
        <>
          <div className="fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center backdrop-filter backdrop-blur-md">
            <div className="max-w-sm gap-3 sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-50">
              <div className="lg:col-span-7">
                <img
                  src={URL.createObjectURL(image)}
                  alt={clubData.name}
                  className="object-cover w-full h-64 rounded sm:h-96 lg:h-full lg:w-full"
                />
              </div>
              <div className="p-6 space-y-4 lg:col-span-5 bg-white text-center">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {clubData.name}
                </h3>
                <p className="text-gray-600">{clubData.description}</p>
                <ul className="mt-4">
                  {Object.keys(clubData.prix).map((key, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-gray-200"
                    >
                      <div>
                        <p className="text-gray-700">{key}</p>
                      </div>
                      <div className="text-blue-500 font-semibold">
                        {clubData.prix[key]} dh
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-left">
                  <p className="text-gray-700">Timeline:</p>
                  <ul className="ml-4 list-disc">
                    {clubData.timeline.map((entry, index) => (
                      <li key={index}>
                        {entry.day}: {entry.startTime}-{entry.endTime}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-center mt-8 space-x-4">
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    onClick={() => setShow(false)} // Set show to false to hide the form
                  >
                    Go Back
                  </button>
                  {loading ? (
                    <ClipLoader color="rgba(54, 215, 183, 1)" />
                  ) : (
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      onClick={() => {
                        handleSubmit;
                      }} // Add your handleSubmit function
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
            {view && <div></div>}
          </div>
        </>
      )}
    </div>
  );
};

export default ClubForm;
