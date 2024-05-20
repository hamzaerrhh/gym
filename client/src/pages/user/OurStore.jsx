import { useEffect, useState } from "react";
import ProductCard from "./cards/ProductCrd";
import StoreHero from "./hero/StoreHero";
import axios from "axios";
import boxing from "../../assets/boxing.svg";
import basket from "../../assets/basket.svg";
import taekwando from "../../assets/taekwando.svg";
import training from "../../assets/training.svg";
import Cookies from "js-cookie";

const OurStore = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const fetchCategories = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/cat/product`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    setCategories(res.data);
  };

  const getProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/product`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchByName = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  useEffect(() => {
    getProducts();
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleCategory = (e) => {
    setSelectedCategory(e);
  };

  const filteredProducts = products.filter((product) =>
    selectedCategory
      ? product.category === selectedCategory &&
        product.name.toLowerCase().includes(searchTerm)
      : product.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <StoreHero />

      <div className="py-12 px-4 bg-gray-800 text-center">
        {/* Most buy Products */}
        <h1 className="text-4xl font-bold mb-4">Most buy Products</h1>
        <p className="text-lg mb-8">
          Check out our latest and greatest offerings!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.slice(0, 3).map((product, index) => (
            <ProductCard key={index} data={product} />
          ))}
        </div>
      </div>

      {/* Sections for Different Categories */}
      <div className="flex flex-col md:flex-row w-full justify-between py-12 px-4">
        <div className="grid grid-cols-3 sm:grids-cols-5 md:grid-cols-4 gap-8 mb-8">
          {/* Render category buttons */}
          <div className="relative">
            <button onClick={() => handleCategory("box")}>
              <div className="rounded-full w-12 h-12 flex items-center justify-center text-gray-900 text-xl font-semibold shadow-lg">
                <img src={boxing} height={12} alt="box" />
              </div>
            </button>

            <div className="absolute w-4 h-4 bg-gray-900 rounded-full animate-ping"></div>
          </div>
          <div className="relative">
            <button onClick={() => handleCategory("taekwando")}>
              <div className="rounded-full w-12 h-12 flex items-center justify-center text-gray-900 text-xl font-semibold shadow-lg">
                <img src={taekwando} height={12} alt="taekwando" />
              </div>
            </button>

            <div className="absolute w-4 h-4 bg-gray-900 rounded-full animate-ping"></div>
          </div>
          <div className="relative">
            <button onClick={() => handleCategory("gym")}>
              <div className="rounded-full w-12 h-12 flex items-center justify-center text-gray-900 text-xl font-semibold shadow-lg">
                <img src={training} height={12} alt="gym" />
              </div>
            </button>

            <div className="absolute w-4 h-4 bg-gray-900 rounded-full animate-ping"></div>
          </div>
          <div className="relative">
            <button onClick={() => handleCategory("basketball")}>
              <div className="rounded-full w-12 h-12 flex items-center justify-center text-gray-900 text-xl font-semibold shadow-lg">
                <img src={basket} height={12} alt="basket" />
              </div>
            </button>

            <div className="absolute w-4 h-4 bg-gray-900 rounded-full animate-ping"></div>
          </div>
        </div>
        {/* Filter and Search */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="appearance-none py-3 px-4 pr-8 rounded-lg text-gray-500 font-semibold cursor-pointer bg-white border border-gray-300"
            >
              <option value="">All categories</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {/* Toggle for showing future products */}

          {/* Search Input */}
          <div className="flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg shadow-md">
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
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              onChange={handleSearchByName}
              className="bg-gray-100 outline-none text-gray-900 placeholder-gray-400 focus:placeholder-gray-600"
              type="text"
              placeholder="search by name .."
            />
          </div>
        </div>
      </div>

      {/* Display All Products */}
      <div className="px-4">
        <h2 className="text-2xl font-bold mb-6">All Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Display all filtered products */}
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} data={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurStore;
