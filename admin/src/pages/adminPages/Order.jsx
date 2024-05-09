import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdCloseCircle } from "react-icons/io";
import { GrView } from "react-icons/gr";
import { GiConfirmed } from "react-icons/gi";
import toast, { Toaster } from "react-hot-toast";
import Product from "./Product";
import ChekOut from "./card/ChekOut";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let res = await axios.get("http://localhost:5000/api/order", {
        withCredentials: true,
      });
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  // Pagination functionality
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleView = (order) => {
    setIsToastVisible(true);
    toast(() => (
      <ChekOut order={order} onClose={() => setIsToastVisible(false)} />
    ));
  };

  const handleReject = (order) => {
    try {
      toast.custom(() => (
        <div
          className={`${
            true ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              remove order
              <div className="flex-shrink-0 pt-0.5">{order.info.name}</div>
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
                    `http://localhost:5000/api/order/${order._id}`,
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

  console.log("orders", orders);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
      <h2 className="mb-4 text-2xl font-semibold leading-tight">Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead className="dark:bg-gray-300">
            <tr className="text-left">
              <th className="p-3 text-center">Full Name</th>
              <th className="p-3 text-center">Phone Number</th>
              <th className="p-3 text-center">Address</th>
              <th className="p-3 text-center">Time Added</th>
              <th className="p-3 text-center">Pay Method</th>
              <th className="p-3 text-center">Product Demand</th>
              <th className=" p-2 text-center"> prix </th>
              <th className="p-2 text-center">Confirmed</th>
              <th className="p-2 text-center">Rejected</th>
              <th className="p-2 text-center">Submit</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order, index) => (
              <tr
                key={index}
                className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
              >
                <td className="p-3">{`${order.info.name} ${order.info.lastName}`}</td>
                <td className="p-3">{order.info.phone}</td>
                <td className="p-3">{order.info.adress}</td>
                <td className="p-3">
                  {order.createdAt ? order.createdAt.toString() : "N/A"}
                </td>
                <td className="p-3 text-center">{order.pay_methode}</td>
                <td className="p-3 text-center">{order.order.length}</td>
                <td> {order.total_price} </td>
                <td className="p-3 text-center">
                  <GiConfirmed color="green" size={20} />
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => {
                      handleReject(order);
                    }}
                  >
                    <IoMdCloseCircle color="red" size={20} />
                  </button>
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => {
                      handleView(order);
                    }}
                  >
                    <GrView color="blue" size={20} />
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
          Page {currentPage} of {Math.ceil(orders.length / itemsPerPage)}
        </div>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= orders.length}
          className="px-4 py-2 bg-gray-200 rounded-md"
        >
          Next
        </button>
        <Toaster position="top-right" reverseOrder={true} />
      </div>
    </div>
  );
};

export default Order;
