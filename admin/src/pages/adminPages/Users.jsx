import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [showVerified, setShowVerified] = useState(false);
  const [showChangeRole, setShowChangeRole] = useState(true);

  const getUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/all`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setUsers(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users
    .filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((user) => (showVerified ? user.virified : true))
    .slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const changeRole = async (id, role) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/${id}`,
        { role },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChang = (user, role) => {
    if (user.virified) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                {user.profilePhoto ? (
                  <img
                    src={user.profilePhoto}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <img
                    src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F000%2F423%2F286%2Foriginal%2Favatar-icon-vector-illustration.jpg&sp=1715372325Te96113377bed97ad760fed9e03c5a5e1ef011e306f18113865812662a040101a"
                    alt="image profile"
                    className="w-10 h-10 rounded-full"
                  />
                )}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {user.username}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  do u wanna make it {role}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.remove(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
            <button
              onClick={() => {
                changeRole(user._id, role);

                toast.remove(t.id);
              }}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              submet
            </button>
          </div>
        </div>
      ));
    } else {
      toast.error(`${user.username} is  not verified`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">User List</h1>
      <div className="flex justify-between mb-4">
        <Toaster position="top-center" reverseOrder={false} />
        <div>
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <button
            onClick={() => setShowVerified(!showVerified)}
            className={`px-4 py-2 rounded-md ${
              showVerified ? "bg-green-500 text-white" : "bg-gray-300"
            }`}
          >
            {showVerified ? "Show All" : "Show Verified"}
          </button>
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Username
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Verified
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Profile Photo
            </th>
            {showChangeRole && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Change Role
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentUsers.map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.virified ? "Verified" : "Not Verified"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.profilePhoto ? (
                  <img
                    src={user.profilePhoto}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <img
                    src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F000%2F423%2F286%2Foriginal%2Favatar-icon-vector-illustration.jpg&sp=1715372325Te96113377bed97ad760fed9e03c5a5e1ef011e306f18113865812662a040101a"
                    alt="image profile"
                    className="w-10 h-10 rounded-full"
                  />
                )}
              </td>
              {showChangeRole && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleChang(user, "admin")}
                    className="px-2 py-1 bg-blue-500 text-white rounded-md mr-2"
                  >
                    Make Admin
                  </button>
                  <button
                    onClick={() => handleChang(user, "coach")}
                    className="px-2 py-1 bg-green-500 text-white rounded-md"
                  >
                    Make Coach
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <nav className="flex justify-center">
          <ul className="flex space-x-2">
            {Array.from(
              { length: Math.ceil(users.length / usersPerPage) },
              (_, i) => (
                <li key={i}>
                  <button
                    onClick={() => paginate(i + 1)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === i + 1
                        ? "bg-gray-800 text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
      <div className="mt-4">
        <button
          onClick={() => setShowChangeRole(!showChangeRole)}
          className="px-4 py-2 rounded-md bg-gray-300 text-white"
        >
          {showChangeRole ? "Hide Change Roles" : "Show Change Roles"}
        </button>
      </div>
    </div>
  );
};

export default Users;
