import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import {
  FiChevronUp,
  FiChevronDown,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi"; // Import react icons
import { Link } from "react-router-dom"; // Import icons
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";

import { IoMdCloseCircle } from "react-icons/io";

const Order = () => {
  const [data, setData] = useState(() => generateOrders(100)); // Generate initial order data
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  // Function to generate fake order data
  function generateOrders(count) {
    const orders = [];
    for (let i = 0; i < count; i++) {
      orders.push({
        prix: parseFloat(faker.number.float({ min: 1, max: 999 }).toFixed(3)), // Modify prix to have 3 numbers after the decimal point
        image: faker.image.avatar(),
        fullName: faker.name.firstName() + " " + faker.name.lastName(),
        phoneNumber: faker.phone.imei(),
        product: faker.commerce.productName(),
        address: faker.address.streetAddress(),
        pay: "bu cart",
        timeAdd: faker.date.past(),
        confirmed: faker.datatype.boolean(),
        rejected: faker.datatype.boolean(),
      });
    }
    return orders;
  }

  // Search functionality with debounce
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset pagination when searching
  };

  // Sorting functionality
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

  // Pagination functionality

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData()
    .filter((order) =>
      order.fullName.toLowerCase().startsWith(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
      <h2 className="mb-4 text-2xl font-semibold leading-tight">Orders</h2>
      <div className="mb-4 w-full flex flex-row justify-between px-10">
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-2"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <a href="/addOrder">Add Order</a>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead className="dark:bg-gray-300">
            <tr className="text-left">
              <th className="p-3" onClick={() => handleSort("prix")}>
                <div className="flex gap-2 justify-center">
                  Prix
                  {sortBy === "prix" &&
                    (sortOrder === "asc" ? <FiChevronUp /> : <FiChevronDown />)}
                </div>
              </th>
              <th className="p-3">
                <div className="flex gap-2 justify-center">Images</div>
              </th>

              <th className="p-3">
                <div className="flex gap-2 justify-center">Full Name</div>
              </th>

              <th className="p-3">Phone Number</th>
              <th className="p-3">Address</th>

              <th className="p-3" onClick={() => handleSort("timeAdd")}>
                <div className="flex gap-2 justify-center">
                  Time Added
                  {sortBy === "timeAdd" &&
                    (sortOrder === "asc" ? <FiChevronUp /> : <FiChevronDown />)}
                </div>
              </th>
              <th>Pay Method</th>

              <th>Product Demand</th>
              <th className="p-3">Confirmed</th>
              <th className="p-3">Rejected</th>
              <th className="p-3">
                <div className="flex gap-2 justify-center">Submit</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order, index) => (
              <tr
                key={index}
                className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
              >
                <td className="p-3">{order.prix}</td>

                <td className="p-3">
                  <img width={18} src={order.image} />
                </td>
                <td className="p-3">{order.fullName}</td>
                <td className="p-3">{order.phoneNumber}</td>
                <td className="p-3">{order.address}</td>
                <td className="p-3">{order.timeAdd.toString()}</td>

                <td className="p-3">{order.pay}</td>
                <td className="p-3">proteene,chaha</td>
                <td className="p-3">
                  <FaCheckCircle color="green " />
                </td>
                <td>
                  <IoMdCloseCircle color="red" />
                </td>
                <td>
                  <GiConfirmed />
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
          Page {currentPage} of {Math.ceil(sortedData().length / itemsPerPage)}
        </div>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= sortedData().length}
          className="px-4 py-2 bg-gray-200 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Order;
