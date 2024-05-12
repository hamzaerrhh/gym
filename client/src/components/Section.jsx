import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const Section = () => {
  const [data, setData] = useState([]);

  const feetchEvent = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/event`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log(res.data);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getDayOfMonth = (time) => {
    const date = new Date(time);
    return date.getDate();
  };

  const getMonth = (time) => {
    const date = new Date(time);
    return date.toLocaleString("default", { month: "short" });
  };

  useEffect(() => {
    feetchEvent();
  }, []);

  return (
    <div className="max-w-screen-xl p-5 mx-auto bg-gray-800 text-gray-100">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-0 lg:grid-rows-2">
        <div
          className=" flex  flex-col  justify-between  w-full text-left bg-gray-500 bg-center bg-cover cursor-pointer  h-96 md:col-span-2 lg:row-span-2 lg:h-full group"
          style={{
            backgroundImage: `url(${data[0]?.image})`,
          }}
        >
          <div className=" flex w-full justify-between px-6 pt-2">
            <a
              rel="noopener noreferrer"
              href="#"
              className="px-3 py-2 text-xs font-semibold tracking-wider uppercase hover:underline text-gray-100 bg-violet-400"
            >
              {data[0]?.title}
            </a>
            <div className="flex flex-col justify-start text-center text-gray-100">
              <span className="text-3xl font-semibold leading-none tracking-wide">
                {getDayOfMonth(data[0]?.dateTimeStarted)}
              </span>
              <span className="leading-none uppercase">
                {getMonth(data[0]?.dateTimeStarted)}
              </span>
            </div>
          </div>

          <div className=" bg-black absolute top-0 left-0 right-0 flex items-center justify-between mx-5 mt-3"></div>
          <h2 className="z-10 p-5">
            <a
              rel="noopener noreferrer"
              href="#"
              className="font-medium text-md group-hover:underline lg:text-2xl lg:font-semibold text-gray-100"
            >
              {data[0]?.descreption}
            </a>
          </h2>
        </div>
        {data.slice(1).map((data, index) => (
          <div
            key={index}
            className=" flex flex-col justify-between w-full text-left bg-gray-500  bg-center bg-cover cursor-pointer h-96 group"
            style={{
              backgroundImage: `url(${data.image})`,
            }}
          >
            <div className=" flex w-full justify-between px-6 pt-2">
              <p className=" px-3 flex items-center  text-center text-xs font-semibold tracking-wider uppercase hover:underline text-gray-100 bg-violet-400">
                {data.title}
              </p>
              <div className="flex flex-col justify-start text-center text-gray-100">
                <span className="text-3xl font-semibold leading-none tracking-wide">
                  {getDayOfMonth(data.dateTimeStarted)}
                </span>
                <span className="leading-none uppercase">
                  {getMonth(data.dateTimeStarted)}
                </span>
              </div>
            </div>
            <h2 className="z-10 p-5">
              <a
                rel="noopener noreferrer"
                href="#"
                className="font-medium text-md group-hover:underline text-gray-100"
              >
                {" "}
                {data.descreption}
              </a>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Section;
