import React, { useEffect, useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { GrView } from "react-icons/gr";
import PoductView from "./view/PoductView";
import { IoMdCloseCircle } from "react-icons/io";
import EditProduct from "./edit/EditProduct";

const Product = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [view, setView] = useState(false);
  const [viewProduct, setViewProduct] = useState();
  const remove = (product) => {
    try {
      toast.custom(() => (
        <div
          className={`${
            true ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src={product.mainImage}
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {product.name}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.remove()}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
            <button
              onClick={async () => {
                try {
                  const res = await axios.delete(
                    `http://localhost:5000/api/product/${product._id}`,
                    { withCredentials: true }
                  );
                  console.log(res);
                } catch (err) {
                  console.log(err);
                }
                toast.remove();
              }}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              confirme
            </button>
          </div>
        </div>
      ));
    } catch {}
  };
  const handleView = (product) => {
    setView(true);
    setViewProduct({ ...product });
  };

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
  }, [view]);

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
  const [edit, setEdit] = useState(false);

  const handleEdit = (product) => {
    setEdit(true);
    setViewProduct({ ...product });
  };
  const handleCloseEdit = () => {
    setEdit(false);
    set;
  };
  const closeView = () => {
    console.log("closing view");
    setView(false);
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
    <div className={`container p-2 mx-auto sm:p-4 dark:text-gray-800`}>
      {view ? (
        <div className=" flex flex-col gap-5">
          <div className=" flex justify-between">
            <h1 className=" font-mono text-3xl">product view</h1>
            <button
              onClick={() => {
                console.log("view", view);
                setView(false);
              }}
            >
              <IoMdCloseCircle color="red" className="text-2xl" />
            </button>
          </div>
          <PoductView product={viewProduct} />
        </div>
      ) : (
        <>
          {edit ? (
            <div className=" flex flex-col gap-5">
              <div className=" flex justify-between">
                <h1 className=" font-mono text-3xl">edit product</h1>
                <button
                  onClick={() => {
                    console.log("view", view);
                    setEdit(false);
                  }}
                >
                  <IoMdCloseCircle color="red" className="text-2xl" />
                </button>
              </div>
              <EditProduct product={viewProduct} />
            </div>
          ) : (
            <>
              <h2 className="mb-4 text-2xl font-semibold leading-tight">
                Products
              </h2>
              <Toaster position="top-center" />
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
                            (sortOrder === "asc" ? (
                              <FiChevronUp />
                            ) : (
                              <FiChevronDown />
                            ))}
                        </div>
                      </th>
                      <th className="p-3" onClick={() => handleSort("prix")}>
                        <div className="flex items-center justify-center">
                          <span className="mr-1">Prix</span>
                          {sortBy === "prix" &&
                            (sortOrder === "asc" ? (
                              <FiChevronUp />
                            ) : (
                              <FiChevronDown />
                            ))}
                        </div>
                      </th>
                      <th className="p-3" onClick={() => handleSort("rate")}>
                        <div className="flex items-center justify-center">
                          <span className="mr-1">Rate</span>
                          {sortBy === "rate" &&
                            (sortOrder === "asc" ? (
                              <FiChevronUp />
                            ) : (
                              <FiChevronDown />
                            ))}
                        </div>
                      </th>
                      <th
                        className="p-3"
                        onClick={() => handleSort("nbrOfOrder")}
                      >
                        <div className="flex items-center justify-center">
                          <span className="mr-1">Number of Orders</span>
                          {sortBy === "nbrOfOrder" &&
                            (sortOrder === "asc" ? (
                              <FiChevronUp />
                            ) : (
                              <FiChevronDown />
                            ))}
                        </div>
                      </th>
                      <th
                        className="p-3"
                        onClick={() => handleSort("createdAt")}
                      >
                        <div className="flex items-center justify-center">
                          <span className="mr-1">Created At</span>
                          {sortBy === "createdAt" &&
                            (sortOrder === "asc" ? (
                              <FiChevronUp />
                            ) : (
                              <FiChevronDown />
                            ))}
                        </div>
                      </th>
                      <th className="p-3">
                        <div className="flex items-center justify-center">
                          Edit
                        </div>
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
                        <td className="p-3 text-center">
                          {product.nbrOfOrder}
                        </td>
                        <td className="p-3 text-center">
                          {new Date(product.createdAt).toLocaleDateString()}
                        </td>
                        <td className=" text-center justify-center flex gap-2 p-3">
                          <button
                            onClick={() => {
                              handleEdit(product);
                            }}
                          >
                            <FaEdit color="blue" />
                          </button>
                          <button
                            onClick={() => {
                              remove(product);
                            }}
                          >
                            <MdDeleteForever color="red" />
                          </button>
                          <button
                            onClick={() => {
                              handleView(product);
                            }}
                          >
                            <GrView color="gray" />
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
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Product;
