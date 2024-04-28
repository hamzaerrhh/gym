import gym from "../assets/gym.svg";
import { useEffect, useState } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import Cookies from "js-cookie";
import { useAuthContext } from "../hooks/useAuthContext";

const NavBar = () => {
  const { user, dispatch } = useAuthContext();
  const logout = () => {
    //remove token from cookie
    Cookies.remove("token");

    //remove user from authContext
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <div className="fixed  flex flex-col w-full text-white  px-7 py-4 ">
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
          <div className="   hidden md:block">
            <div className=" flex gap-2">
              {user ? (
                <button
                  onClick={logout}
                  className=" text-black bg-white rounded-lg p-1"
                >
                  log out
                </button>
              ) : (
                <a href="/login">
                  <button className=" text-black bg-white rounded-lg p-1">
                    sign in
                  </button>
                </a>
              )}

              <button className=" text-black bg-white rounded-lg p-1">
                hello
              </button>
            </div>
          </div>
          <div className="block md:hidden">ham</div>
        </div>
        <div className=" hidden md:block ">
          <div className="  w-full flex justify-center items-center pt-4 ">
            <ul className="flex gap-10 text-sm font-semibold">
              <li>Accuil</li>
              <li>Clubs</li>
              <li>Activité</li>
              <li>Entrainement personnel</li>
              <li>Spa</li>
              <li>Nurition</li>
              <li>Event</li>
              <li>Espace</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default NavBar;
