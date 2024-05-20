import { useState } from "react";
import { faker } from "@faker-js/faker";
import { useNavigate } from "react-router-dom";

const BookCoaching = () => {
  const navigate = useNavigate();
  const sports = [
    "basketball",
    "swimming",
    "taekwondo",
    "boxing",
    "mma",
    "volleyball",
    "water polo",
    "dance",
    "zumba",
    "fitness",
    "aerobic",
    "gymnastics",
  ];

  const generateCoaches = (n) => {
    const coaches = [];

    for (let i = 0; i < n; i++) {
      const id = faker.database.collation();
      const fullName = faker.person.fullName();
      const avatar = faker.image.avatar();
      const sport = sports[Math.floor(Math.random() * sports.length)];
      let fee = 0; // Initialize fee to zero

      // Generate a random number between 0 and 1. If it's less than 0.5, set the fee.
      if (Math.random() < 0.5) {
        fee = Math.floor(Math.random() * 400) + 200;
      }

      coaches.push({ id, fullName, avatar, sport, fee });
    }

    return coaches;
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchByNameInput, setSearchByNameInput] = useState("");
  const [filteredCoaches, setFilteredCoaches] = useState([]);

  const handleSearchByCategory = (category) => {
    setSelectedCategory(category);

    const filtered = coaches.filter((coach) =>
      coach.sport.toLowerCase().includes(category.toLowerCase())
    );

    setFilteredCoaches(filtered.slice(0, 10));
  };

  const searchFree = () => {
    const filtered = coaches.filter((coach) => coach.fee == 0);
    setFilteredCoaches(filtered.slice(0, 10));
  };
  const handleSearchByName = (e) => {
    const searchTerm = e.target.value;
    setSearchByNameInput(searchTerm);

    const filtered = coaches.filter((coach) =>
      coach.fullName.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    setFilteredCoaches(filtered.slice(0, 10));
  };

  const handleLowestPrice = () => {
    const nonZeroFeeCoaches = coaches.filter((coach) => coach.fee > 0);
    const sortedCoaches = nonZeroFeeCoaches.sort((a, b) => a.fee - b.fee);
    const filtered = sortedCoaches.slice(0, 10);

    setFilteredCoaches(filtered);
  };

  const coaches = generateCoaches(30);

  return (
    <div className="container mx-auto px-4 pt-32 text-black">
      <div className="flex justify-between w-auto items-center p-6 space-x-6 bg-gray-100 rounded-xl shadow-lg">
        <div className="flex bg-white p-4 w-72 space-x-4 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 opacity-30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            className="outline-none w-full placeholder-gray-400"
            type="text"
            placeholder="Search by name..."
            value={searchByNameInput}
            onChange={handleSearchByName}
          />
        </div>

        <div className="flex bg-white p-4 w-72 space-x-4 rounded-lg">
          <form className=" w-full flex  justify-around">
            <dev>
              <input
                onClick={searchFree}
                type="radio"
                id="html"
                name="fav_language"
                value="free"
              />
              <label htmlFor="html">free</label>
            </dev>

            <dev>
              <input
                type="radio"
                onClick={handleLowestPrice}
                id="css"
                name="fav_language"
                value="lowest"
              />
              <label htmlFor="css">lowest</label>
            </dev>
          </form>
        </div>
        <div>
          <input
            list="sportsList"
            className="outline-none w-44 text-center  h-14 rounded-xl placeholder-gray-400"
            type="text"
            placeholder="Categories:"
            value={selectedCategory}
            onChange={(e) => handleSearchByCategory(e.target.value)}
          />
          <datalist id="sportsList">
            {sports.map((sport, index) => (
              <option key={index} value={sport} />
            ))}
          </datalist>
        </div>
        <div className="bg-blue-500 py-3 px-5 text-white font-semibold rounded-lg hover:bg-blue-600 cursor-pointer transition-colors duration-300">
          <span>Search</span>
        </div>
      </div>
      <ul className="divide-y text-gray-800 divide-gray-300 py-12 px-6 mt-8">
        {filteredCoaches.map((coach, index) => (
          <li key={index} className="py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4 ">
              <img
                src={coach.avatar}
                alt={coach.fullName}
                className="w-12 h-12 rounded-full filter brightness-75"
              />

              <div>
                <h3 className="text-lg text-white font-semibold">
                  {coach.fullName}
                </h3>
                <p className="text-sm text-gray-300">{coach.sport}</p>
                <p className="text-sm text-blue-500 font-semibold">
                  {coach.fee} Dh
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                navigate(`/findcoach/${coach.id}`);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Book
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookCoaching;
