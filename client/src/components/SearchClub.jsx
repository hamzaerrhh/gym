import { useState } from "react";

const SearchClub = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="sport"
            className="block text-sm font-medium text-gray-700"
          >
            Sport
          </label>
          <input
            type="text"
            id="sport"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Enter sport..."
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Enter category..."
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Enter title..."
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchClub;
