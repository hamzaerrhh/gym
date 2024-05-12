import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Cookies from "js-cookie";

const Food = () => {
  const [foods, setFoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/food`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        setFoods(response.data);
        console.log("food", foods);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFoods = foods.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
      <div className=" flex items-center mx-5 justify-between">
        <h2 className="mb-4 text-2xl font-semibold leading-tight">Foods</h2>
        <a href="/food/add">
          <h2> add food</h2>
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead className="dark:bg-gray-300">
            <tr className="text-left">
              <th className="p-3 ">Image</th>
              <th className="p-3 text-center">Name</th>
              <th className="p-3 text-center">Price</th>
              <th className="p-3 text-center">Time Added</th>
              <th className="p-3 text-center">Order Count</th>
              <th className="p-3 text-center"> favorite count</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentFoods.map((food) => (
              <tr
                key={food._id}
                className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
              >
                <td className="p-3">
                  <img
                    src={food.mainImage}
                    alt={food.name}
                    className="  w-8 h-8"
                  />
                </td>
                <td className="p-3 text-center">{food.name}</td>
                <td className="p-3 text-center">{food.prix}</td>
                <td className="p-3 text-center">
                  {new Date(food.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 text-center">{food.order}</td>
                <td className="p-3 text-center">{food.favorite}</td>
                <td className="p-3 text-center ">
                  <button className="mr-2 ">
                    <MdDeleteForever color="red" height={12} />
                  </button>
                  <button>
                    <FaEdit color="blue" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-md"
        >
          Previous
        </button>
        <div>
          Page {currentPage} of {Math.ceil(foods.length / itemsPerPage)}
        </div>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= foods.length}
          className="px-4 py-2 bg-gray-200 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Food;
