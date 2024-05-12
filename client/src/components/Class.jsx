import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const Class = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/club`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        setClubs(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchClubs();
  }, []);

  return (
    <section className="dark:bg-gray-900 dark:text-gray-200">
      <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
        {clubs.length > 0 && (
          <div
            rel="noopener noreferrer"
            href="#"
            className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-black"
          >
            <img
              src={clubs[0]?.image}
              alt=""
              className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 bg-black0"
            />
            <div className="p-6 space-y-2 lg:col-span-5">
              <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
                {clubs[0]?.name}
              </h3>
              <span className="text-xs dark:text-gray-600">
                {clubs[0]?.category}
              </span>
              <p>{clubs[0]?.description}</p>
              <div className="px-6 py-4">
                <h4 className="text-xl font-semibold">Timeline:</h4>
                <ul>
                  {clubs[0]?.timeline.map((slot, index) => (
                    <li key={index}>
                      <span>{slot.day}: </span>
                      <span>
                        {slot.startTime} - {slot.endTime}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        {/* Render the rest of the clubs in a grid */}
        <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clubs.slice(1).map((club) => (
            <div
              key={club._id}
              href="#"
              className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-black"
            >
              <img
                role="presentation"
                className="object-cover w-full rounded h-44 bg-black0"
                src={club.image}
              />
              <div className="p-6 space-y-2">
                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                  {club.name}
                </h3>
                <span className="text-xs dark:text-gray-600">
                  January 21, 2021
                </span>
                <p>{club.description}</p>
              </div>
              <div className="px-6 py-4">
                <h4 className="text-xl font-semibold">Timeline:</h4>
                <ul>
                  {club.timeline.map((slot, index) => (
                    <li key={index}>
                      <span>{slot.day}: </span>
                      <span>
                        {slot.startTime} - {slot.endTime}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Class;
