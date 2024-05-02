import { useState } from "react";
import gym from "../assets/gym.svg";
import { MdSpaceDashboard } from "react-icons/md";
import { FaBasketShopping } from "react-icons/fa6";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-900 flex flex-col justify-between h-full p-6 items-center text-white">
      {isOpen ? (
        <>
          <div className="flex flex-col space-y-4">
            <a href="/">
              <button className="flex items-center">
                <img
                  width={20}
                  src={gym}
                  className=" bg-white p-1 rounded-md"
                />
                <h3 className="font-bold ml-2">GYM PRO</h3>
              </button>{" "}
            </a>
            <a href="/dashboard">
              <button className="flex items-center">
                <MdSpaceDashboard className="mr-2" />
                <div>Dashboard</div>
              </button>
            </a>
            <a href="/club">
              <button className="flex items-center">
                <FaBasketShopping className="mr-2" />
                <div>Clubs</div>
              </button>{" "}
            </a>
            <a href="/product">
              <button className="flex items-center">
                <FaBasketShopping className="mr-2" />
                <div>Products</div>
              </button>{" "}
            </a>
            <a href="/users">
              {" "}
              <button className="flex items-center">
                <FaBasketShopping className="mr-2" />
                <div>Users</div>
              </button>{" "}
            </a>
            <a href="/event">
              {" "}
              <button className="flex items-center">
                <FaBasketShopping className="mr-2" />
                <div>Events</div>
              </button>{" "}
            </a>

            <a href="/orders">
              {" "}
              <div className="flex items-center">
                <FaBasketShopping className="mr-2" />
                <div>Orders</div>
              </div>
            </a>
          </div>
          <div className="flex flex-col space-y-4">
            <a href="/admin">
              <button className="flex items-center">
                <FaBasketShopping className="mr-2" />
                <div>Admins</div>
              </button>{" "}
            </a>
            <a href="/setting">
              {" "}
              <button className="flex items-center">
                <FaBasketShopping className="mr-2" />
                <div>Settings</div>
              </button>{" "}
            </a>
          </div>
          <button
            onClick={toggleSidebar}
            className=" flex items-center focus:outline-none mt-4 text-sm text-white"
          >
            <FaArrowAltCircleLeft className=" mr-2" />
            Toggle Sidebar
          </button>
        </>
      ) : (
        <>
          <div className="flex flex-col space-y-4">
            <button>
              <img width={20} src={gym} className=" bg-white p-1 rounded-md" />
            </button>
            <button className="flex items-center">
              <MdSpaceDashboard className="mr-2" />
            </button>
            <button className="flex items-center">
              <FaBasketShopping className="mr-2" />
            </button>
            <button className="flex items-center">
              <FaBasketShopping className="mr-2" />
            </button>
            <button className="flex items-center">
              <FaBasketShopping className="mr-2" />
            </button>
            <button className="flex items-center">
              <FaBasketShopping className="mr-2" />
            </button>
            <button className="flex items-center">
              <FaBasketShopping className="mr-2" />
            </button>
          </div>
          <div className="flex flex-col space-y-4">
            <button className="flex items-center">
              <FaBasketShopping className="mr-2" />
            </button>
            <button className="flex items-center">
              <FaBasketShopping className="mr-2" />
            </button>
          </div>
          <button
            onClick={toggleSidebar}
            className=" flex items-center focus:outline-none mt-4 text-sm text-white"
          >
            <FaArrowAltCircleRight className=" mr-2" />
          </button>
        </>
      )}
    </div>
  );
};

export default Sidebar;
