import { useState } from "react";
import { faker } from "@faker-js/faker";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom"; // Import icons

const Product = () => {
  const [data, setData] = useState(() => generateProducts(100)); // Generate initial product data
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  // Function to generate fake product data
  function generateProducts(count) {
    const products = [];
    for (let i = 0; i < count; i++) {
      products.push({
        id: i + 1,
        name: faker.internet.userName(),
        image: faker.image.avatar(),
        prix: parseFloat(faker.number.float({ min: 1, max: 999 }).toFixed(3)), // Modify prix to have 3 numbers after the decimal point
        timeAdd: faker.date.past(),
        rate: parseFloat(faker.number.float({ min: 1, max: 5 }).toFixed(3)), // Modify rate to have 3 numbers after the decimal point
        demande: faker.number.int({ min: 1, max: 999 }),
        inStock: faker.number.int({ int: 1, max: 999 }),
      });
    }
    return products;
  }

  // Search functionality with debounce
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset pagination when searching
  };

  // Sorting functionality
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
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData()
    .filter((product) =>
      product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
      <h2 className="   mb-4 text-2xl font-semibold leading-tight">Products</h2>
      <div className="mb-4 w-full flex flex-row justify-between px-10">
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-2"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <a href="/addProduct"> add Products</a>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead className="dark:bg-gray-300">
            <tr className="text-left">
              <th className=" p-3">ID </th>
              <th className="p-3 " onClick={() => handleSort("name")}>
                <div className="flex gap-2 justify-center ">
                  Name{" "}
                  {sortBy === "name" &&
                    (sortOrder === "asc" ? <FiChevronUp /> : <FiChevronDown />)}
                </div>
              </th>
              <th className="p-3 " onClick={() => handleSort("prix")}>
                <div className="flex gap-2 justify-center ">
                  {" "}
                  Prix{" "}
                  {sortBy === "prix" &&
                    (sortOrder === "asc" ? <FiChevronUp /> : <FiChevronDown />)}
                </div>
              </th>
              <th className="p-3" onClick={() => handleSort("rate")}>
                <div className="flex gap-2 justify-center ">
                  Rate{" "}
                  {sortBy === "rate" &&
                    (sortOrder === "asc" ? <FiChevronUp /> : <FiChevronDown />)}
                </div>
              </th>
              <th className="p-3" onClick={() => handleSort("demande")}>
                <div className="flex gap-2 justify-center ">
                  Demande{" "}
                  {sortBy === "demande" &&
                    (sortOrder === "asc" ? <FiChevronUp /> : <FiChevronDown />)}
                </div>
              </th>
              <th className="p-3" onClick={() => handleSort("timeAdd")}>
                <div className="flex gap-2 justify-center ">
                  Time Added{" "}
                  {sortBy === "timeAdd" &&
                    (sortOrder === "asc" ? <FiChevronUp /> : <FiChevronDown />)}
                </div>
              </th>
              <th className="p-3" onClick={() => handleSort("timeAdd")}>
                <div className="flex gap-2 justify-center ">
                  In stock
                  {sortBy === "In stock" &&
                    (sortOrder === "asc" ? <FiChevronUp /> : <FiChevronDown />)}
                </div>
              </th>
              <th className="p-3">
                <div className="flex gap-2 justify-center ">edit</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product) => (
              <tr
                key={product.id}
                className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
              >
                <td className="p-3">{product.id}</td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.prix}</td>
                <td className="p-3">{product.rate}</td>
                <td className="p-3">{product.demande}</td>

                <td className="p-3">{product.timeAdd.toString()}</td>
                <td className=" p-3">{product.inStock}</td>
                <td>
                  <button>edit</button>
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
