import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
const Club = () => {
  const [view, setView] = useState(false);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleView = (club) => {
    setSelected(club);
    setView(true);
  };

  const delet = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/club/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log(err);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/club`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleDelete = (club) => {
    console.log(club);

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
                src={club.image} // Assuming t.club contains the club object
                alt={club.name} // Assuming t.club contains the club object
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {club.name} {/* Assuming t.club contains the club object */}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {/* You can customize this message */}
                Are you sure you want to delete this club?
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
            onClick={() => {
              delet(club._id);
            }}
          >
            delete
          </button>
        </div>
      </div>
    ));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container mx-auto p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="mb-4 text-2xl font-semibold">Club Data</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-200 border border-gray-300">
          <thead>
            <tr className="text-left bg-gray-300">
              <th className="p-3 text-center border-r border-gray-300">
                Image
              </th>
              <th className="p-3 text-center border-r border-gray-300">Name</th>
              <th className="p-3 text-center border-r border-gray-300">
                Description
              </th>
              <th className="p-3 text-center border-r border-gray-300">
                Sport
              </th>
              <th className="p-3 text-center border-r border-gray-300">
                Category
              </th>
              <th className="p-3 text-center border-r border-gray-300">
                Pricing
              </th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((club, index) => (
              <tr key={index} className="text-center">
                <td className="p-3 border-r border-gray-300">
                  <img
                    src={club.image}
                    alt={club.name}
                    className="w-24 h-24 object-cover"
                  />
                </td>
                <td className="p-3 border-r border-gray-300">{club.name}</td>
                <td className="p-3 border-r border-gray-300">
                  {club.description}
                </td>
                <td className="p-3 border-r border-gray-300">{club.sport}</td>
                <td className="p-3 border-r border-gray-300">
                  {club.category}
                </td>
                <td className="p-3 border-r border-gray-300">
                  <ul className="list-none p-0">
                    <li>One Month: {club.prix.oneMonth} dh</li>
                    <li>Three Months: {club.prix.threeMonths} dh</li>
                    <li>Six Months: {club.prix.sixMonths} dh</li>
                    <li>One Year: {club.prix.oneYear} dh</li>
                  </ul>
                </td>
                <td className="p-3">
                  <button
                    className="mr-2 text-blue-600 hover:text-blue-900"
                    onClick={() => handleView(club)}
                  >
                    View
                  </button>
                  <button className="mr-2 text-green-600 hover:text-green-900">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(club)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
      {view && (
        <div className="fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-md">
            <img
              src={selected.image}
              alt={selected.name}
              className="w-full h-64 object-cover rounded"
            />
            <h2 className="text-2xl font-semibold mt-4">{selected.name}</h2>
            <p className="text-gray-700 mt-2">{selected.description}</p>
            <div className="mt-4">
              <p className="font-semibold text-gray-700">Pricing:</p>
              <ul className="list-disc ml-4">
                <li>One Month: {selected.prix.oneMonth} dh</li>
                <li>Three Months: {selected.prix.threeMonths} dh</li>
                <li>Six Months: {selected.prix.sixMonths} dh</li>
                <li>One Year: {selected.prix.oneYear} dh</li>
              </ul>
            </div>
            <div className="mt-4">
              <p className="font-semibold text-gray-700">Timeline:</p>
              <ul className="list-disc ml-4">
                {selected.timeline.map((entry, index) => (
                  <li key={index}>
                    {entry.day}: {entry.startTime}-{entry.endTime}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setView(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Club;
