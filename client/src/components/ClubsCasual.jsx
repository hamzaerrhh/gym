import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import axios from "axios";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const ClubsCasual = () => {
  const [clubs, setClubs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sportInput, setSportInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");

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
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchClubs();
  }, []);

  useEffect(() => {
    const filteredClubs = clubs.filter((club) => {
      const titleMatch = club.name
        .toLowerCase()
        .includes(searchInput.toLowerCase());
      const sportMatch = club.sport
        .toLowerCase()
        .includes(sportInput.toLowerCase());
      const categoryMatch =
        categoryInput === "" ||
        club.category.toLowerCase() === categoryInput.toLowerCase();
      return titleMatch && sportMatch && categoryMatch;
    });
    setSearchResults(filteredClubs);
  }, [searchInput, sportInput, categoryInput]);

  const Dev = ({ club }) => {
    return (
      <div className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-50">
        <img
          src={club.image}
          alt={club.name}
          className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500"
        />
        <div className="p-6 space-y-4 lg:col-span-5 bg-white text-center">
          <h3 className="text-2xl font-semibold text-gray-800">
            {club.name} <span className=""> {club.sport}</span>
          </h3>
          <p className="text-gray-600">{club.description}</p>
          <p className=" flex gap-2 text-gray-900">{club.category}</p>{" "}
          <ul className="mt-4">
            <li className="flex items-center justify-between py-2 border-b border-gray-200">
              <div>
                <p className="text-gray-700">Subscription for 1 month</p>
              </div>
              <div className="text-blue-500 font-semibold">
                {club.prix.oneMonth}dh
              </div>
            </li>
            <li className="flex items-center justify-between py-2 border-b border-gray-200">
              <div>
                <p className="text-gray-700">Subscription for 3 months</p>
              </div>
              <div className="text-blue-500 font-semibold">
                {club.prix.threeMonths}dh
              </div>
            </li>
            <li className="flex items-center justify-between py-2 border-b border-gray-200">
              <div>
                <p className="text-gray-700">Subscription for 6 months</p>
              </div>
              <div className="text-blue-500 font-semibold">
                {club.prix.sixMonths}dh
              </div>
            </li>
            <li className="flex items-center justify-between py-2 border-b border-gray-200">
              <div>
                <p className="text-gray-700">Subscription for 1 year</p>
              </div>
              <div className="text-blue-500 font-semibold">
                {club.prix.oneYear}dh
              </div>
            </li>
          </ul>
          <div className="mt-4 text-left">
            <p className="text-gray-700">Timeline:</p>
            <ul className="ml-4 list-disc">
              {club.timeline.map((slot, index) => (
                <li key={index}>
                  {slot.day}: {slot.startTime} - {slot.endTime}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };
  Dev.propTypes = {
    club: PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      sport: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      prix: PropTypes.shape({
        oneMonth: PropTypes.number.isRequired,
        threeMonths: PropTypes.number.isRequired,
        sixMonths: PropTypes.number.isRequired,
        oneYear: PropTypes.number.isRequired,
      }).isRequired,
      timeline: PropTypes.arrayOf(
        PropTypes.shape({
          day: PropTypes.string.isRequired,
          startTime: PropTypes.string.isRequired,
          endTime: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
  };

  return (
    <div className="flex flex-col gap-20">
      <div className="w-full bg-white">
        <Splide options={{ perPage: 1, rewind: true, pagination: false }}>
          {clubs.map((club, index) => (
            <SplideSlide key={index}>
              <Dev club={club} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
      <div className="flex flex-col">
        <div className="flex gap-4">
          <div>
            <input
              type="text"
              placeholder="Search by title"
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Search by sport"
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
              value={sportInput}
              onChange={(e) => setSportInput(e.target.value)}
            />
          </div>
          <div>
            <select
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
            >
              <option value="">Select category</option>
              <option value="kids">Kids</option>
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="mix">Mix</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1  gap-6 md:grid-cols-2 lg:grid-cols-3">
          {searchResults.map((result, index) => (
            <div
              key={index}
              className="border bg-white border-gray-300 rounded-md overflow-hidden"
            >
              <img
                src={result.image}
                alt={result.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{result.name}</h2>
                <p className="text-sm text-gray-600">{result.description}</p>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Subscription Details:
                  </h3>
                  <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                    <li className="flex items-center justify-between py-3 px-4">
                      <div className="flex-1">
                        <p className="text-gray-700">
                          Subscription for 1 month
                        </p>
                      </div>
                      <div className="text-blue-500 font-semibold">
                        {result.prix.oneMonth}dh
                      </div>
                    </li>
                    <li className="flex items-center justify-between py-3 px-4">
                      <div className="flex-1">
                        <p className="text-gray-700">
                          Subscription for 3 months
                        </p>
                      </div>
                      <div className="text-blue-500 font-semibold">
                        {result.prix.threeMonths}dh
                      </div>
                    </li>
                    <li className="flex items-center justify-between py-3 px-4">
                      <div className="flex-1">
                        <p className="text-gray-700">
                          Subscription for 6 months
                        </p>
                      </div>
                      <div className="text-blue-500 font-semibold">
                        {result.prix.sixMonths}dh
                      </div>
                    </li>
                    <li className="flex items-center justify-between py-3 px-4">
                      <div className="flex-1">
                        <p className="text-gray-700">Subscription for 1 year</p>
                      </div>
                      <div className="text-blue-500 font-semibold">
                        {result.prix.oneYear}dh
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Timeline:</h3>
                  <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                    {result.timeline.map((slot, index) => (
                      <li key={index} className="py-3 px-4">
                        <span className="text-gray-700">{slot.day}: </span>
                        <span className="text-gray-900">
                          {slot.startTime} - {slot.endTime}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClubsCasual;
