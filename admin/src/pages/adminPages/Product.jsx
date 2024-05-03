import React, { useEffect, useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import axios from "axios";

const Product = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/product/", {
          withCredentials: true,
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const sortedData = () => {
    if (sortBy && sortOrder) {
      return [...data].sort((a, b) => {
        if (typeof a[sortBy] === "number" && typeof b[sortBy] === "number") {
          return sortOrder === "asc"
            ? a[sortBy] - b[sortBy]
            : b[sortBy] - a[sortBy];
        } else {
          return sortOrder === "asc"
            ? a[sortBy].toString().localeCompare(b[sortBy].toString())
            : b[sortBy].toString().localeCompare(a[sortBy].toString());
        }
      });
    }
    return data;
  };

  const handleSort = (field) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData()
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
      <h2 className="mb-4 text-2xl font-semibold leading-tight">Products</h2>
      <div className="mb-4 w-full flex flex-row justify-between px-10">
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-2"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <a href="/addProduct">Add Product</a>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead className="dark:bg-gray-300">
            <tr className="text-left">
              <th className="p-3">Main Image</th>
              <th className="p-3" onClick={() => handleSort("name")}>
                <div className="flex items-center justify-center">
                  <span className="mr-1">Name</span>
                  {sortBy === "name" &&
                    (sortOrder === "asc" ? <FiChevronUp /> : <FiChevronDown />)}
                </div>
              </th>
              <th className="p-3" onClick={() => handleSort("prix")}>
                <div className="flex items-center justify-center">
                  <span className="mr-1">Prix</span>
                  {sortBy === "prix" &&
                    (sortOrder === "asc" ? <FiChevronUp /> : <FiChevronDown />)}
                </div>
              </th>
              <th className="p-3" onClick={() => handleSort("rate")}>
                <div className="flex items-center justify-center">
                  <span className="mr-1">Rate</span>
                  {sortBy === "rate" &&
                    (sortOrder === "asc" ? <FiChevronUp /> : <FiChevronDown />)}
                </div>
              </th>
              <th className="p-3" onClick={() => handleSort("nbrOfOrder")}>
                <div className="flex items-center justify-center">
                  <span className="mr-1">Number of Orders</span>
                  {sortBy === "nbrOfOrder" &&
                    (sortOrder === "asc" ? <FiChevronUp /> : <FiChevronDown />)}
                </div>
              </th>
              <th className="p-3" onClick={() => handleSort("createdAt")}>
                <div className="flex items-center justify-center">
                  <span className="mr-1">Created At</span>
                  {sortBy === "createdAt" &&
                    (sortOrder === "asc" ? <FiChevronUp /> : <FiChevronDown />)}
                </div>
              </th>
              <th className="p-3">
                <div className="flex items-center justify-center">Edit</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product) => (
              <tr
                key={product._id}
                className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
              >
                <td className="p-3">
                  <img
                    src={product.mainImage}
                    alt={product.name}
                    className="w-8 h-8"
                  />
                </td>
                <td className="p-3  text-center ">{product.name}</td>
                <td className="p-3 text-center ">{product.prix}</td>
                <td className="p-3 text-center">{product.rate}</td>
                <td className="p-3 text-center">{product.nbrOfOrder}</td>
                <td className="p-3 text-center">
                  {new Date(product.createdAt).toLocaleDateString()}
                </td>
                <td className=" text-center p-3">
                  <button>Edit</button>
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
          Page {currentPage} of {Math.ceil(data.length / itemsPerPage)}
        </div>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= data.length}
          className="px-4 py-2 bg-gray-200 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Product;
