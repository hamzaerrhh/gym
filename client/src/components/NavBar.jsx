import gym from "../assets/gym.svg";
import { useEffect, useState } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import Cookies from "js-cookie";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/reducere/cartSlice";
import { FaShoppingCart } from "react-icons/fa";
import CardShop from "./CardShop";
import { MdFoodBank } from "react-icons/md";
import FoodCardShop from "./FoodCardShp";

const NavBar = () => {
  const { user, dispatch } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [foodOpen, setFoodOpen] = useState(false);

  const action = useDispatch();
  const updateOpen = (newValue) => {
    setOpen(newValue);
  };
  const upFoodOpen = (value) => {
    setFoodOpen(value);
  };

  const foodItems = useSelector((state) => state.food.items);

  const cartItems = useSelector((state) => state.cart.items);
  const logout = async () => {
    //clear cart
    await action(clearCart());
    //remove token from cookie
    Cookies.remove("token");

    //remove user from authContext
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <div className=" z-10 fixed  flex flex-col w-full text-white  px-7 py-4 ">
        <div className=" w-full flex justify-between items-center ">
          <div className=" flex gap-2">
            <a>
              <FaFacebookF />
            </a>
            <a>
              <RiInstagramFill />
            </a>
          </div>

          <div className="flex gap-2">
            <img
              width={30}
              className=" bg-white rounded-xl"
              src={gym}
              alt="logo"
            />
            <div className=" hidden md:block">Gym of Gladiator </div>
          </div>
          <div className="flex items-center space-x-4 md:space-x-8">
            <div className="relative flex gap-2">
              <div className="bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center">
                <span>{foodItems.length}</span>
                <button
                  onClick={() => {
                    setFoodOpen(true);
                  }}
                >
                  <MdFoodBank className="ml-1" />
                </button>
              </div>
              <div className="bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center">
                <span>{cartItems.length}</span>
                <button
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <FaShoppingCart className="ml-1" />
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              {user ? (
                <button
                  onClick={logout}
                  type="button"
                  className="px-3 py-1 font-semibold rounded-full bg-gray-800 text-white"
                >
                  Logout
                </button>
              ) : (
                <a href="/login">
                  <button
                    type="button"
                    className="px-3 py-1 font-semibold rounded-full bg-gray-200 text-gray-900"
                  >
                    Login
                  </button>
                </a>
              )}
              <button className="px-3 py-1 font-semibold rounded-lg bg-white text-black">
                Hello
              </button>
            </div>
          </div>

          <div className="block md:hidden">ham</div>
        </div>
        <div className=" hidden md:block ">
          <div className="  w-full flex justify-center items-center pt-4 ">
            <ul className="flex gap-10 text-sm font-semibold">
              <a href="/">
                <li href="/">Accuil</li>
              </a>

              <a href="/clubs">
                <li>Clubs</li>
              </a>
              <a href="/personal_training">
                <li>Entrainement personnel</li>
              </a>
              <a href="/spa">
                <li>Spa</li>
              </a>
              <a href="/nurition">
                <li>Nurition</li>
              </a>
              <a href="/event">
                <li>Event</li>
              </a>

              <a href="/store">
                <li>store</li>
              </a>
            </ul>
          </div>
        </div>
        {open && <CardShop open={open} action={updateOpen} />}
        {foodOpen && <FoodCardShop open={foodOpen} action={upFoodOpen} />}
      </div>
    </>
  );
};
export default NavBar;
