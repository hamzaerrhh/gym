import React, { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import axios from "axios";
import FoodCard from "./cards/FoodCard";
import { food_bg } from "../../assets";
const Nurition = () => {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortOrder, setSortOrder] = useState({
    protein: "asc",
    carbohydrates: "asc",
    fat: "asc",
  });

  const feetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/food", {
        withCredentials: true,
      });
      setData(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    feetchData();
  }, []);

  return (
    <>
      <section
        style={{
          backgroundImage: `url(${food_bg})`,
        }}
        className={`relative  bg-cover bg-center bg-no-repeat`}
      >
        <div className=" text-white relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Let us find your
              <strong className="block font-extrabold text-rose-700">
                Forever Home.
              </strong>
            </h1>

            <p className="mt-4 max-w-lg sm:text-xl/relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
              illo tenetur fuga ducimus numquam ea!
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <a
                href="#"
                className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
              >
                Get Started
              </a>

              <a
                href="#"
                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between w-auto items-center p-6 space-x-6 bg-gray-100 rounded-xl shadow-lg">
          <div className="flex bg-white p-4 w-72 space-x-4 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 opacity-30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {/* Search icon */}
            </svg>
            <input
              className="outline-none w-full placeholder-gray-400"
              type="text"
              placeholder="Search by name..."
            />
          </div>

          {/* Sorting buttons */}

          {/* Reset button */}
        </div>

        <div className="flex flex-wrap justify-center gap-8 w-full h-full">
          {data.map((food, index) => (
            <FoodCard food={food} key={index} className="w-1/5 p-4" />
          ))}
        </div>
      </div>
    </>
  );
};

export default Nurition;
