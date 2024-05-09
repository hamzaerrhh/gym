import axios from "axios";
import { useEffect, useState } from "react";

const Appoinement = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const feetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/appoinement", {
        withCredentials: true,
      });
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    feetchData();
  }, []);

  const handleView = (order) => {
    // Implement view functionality
    console.log("View order:", order);
  };

  const handleReject = (order) => {
    // Implement reject functionality
    console.log("Reject order:", order);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
      <h2 className="mb-4 text-2xl font-semibold leading-tight">
        Appointments
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead className="dark:bg-gray-300">
            <tr className="text-left">
              <th className="p-3 text-center">Appointment Type</th>
              <th className="p-3 text-center">Name</th>
              <th className="p-3 text-center">Phone Number</th>
              <th className="p-3 text-center">Last Name</th>
              <th className="p-3 text-center">Reservation Time</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order, index) => (
              <tr
                key={index}
                className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
              >
                <td className="p-3 text-center">{order.appointmentType}</td>
                <td className="p-3 text-center">{order.info.name}</td>
                <td className="p-3 text-center">{order.info.phone}</td>
                <td className="p-3 text-center">{order.info.lastName}</td>
                <td className="p-3 text-center">
                  {new Date(order.reservationTime).toLocaleString()}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleView(order)}
                    className="mr-2 text-blue-600 hover:text-blue-900"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleReject(order)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-md"
        >
          Previous
        </button>
        <div>
          Page {currentPage} of {Math.ceil(data.length / itemsPerPage)}
        </div>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastItem >= data.length}
          className="px-4 py-2 bg-gray-200 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Appoinement;
