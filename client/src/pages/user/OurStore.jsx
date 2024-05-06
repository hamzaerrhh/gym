import React, { useEffect, useState } from "react";
import ProductCard from "./cards/ProductCrd";
import StoreHero from "./hero/StoreHero";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/reducere/cartSlice";

const OurStore = () => {
  const [products, setProducts] = useState([]);
  const cartItems = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  const getProduct = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/product", {
        withCredentials: true,
      });
      console.log(res.data);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  console.log(products);

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <StoreHero />
      <button
        onClick={() => {
          dispatch(clearCart());
        }}
      >
        clearr
      </button>
      <div className="py-12 px-4 bg-gray-800 text-center">
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
      <div className=" flex justify-between py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Category section for Protein */}
          <div className="relative">
            <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center text-gray-900 text-xl font-semibold shadow-lg">
              Protein
            </div>
            <div className="absolute w-4 h-4 bg-gray-900 rounded-full animate-ping"></div>
          </div>
          {/* Category section for Shoes */}
          <div className="relative">
            <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center text-gray-900 text-xl font-semibold shadow-lg">
              Shoes
            </div>
            <div className="absolute w-4 h-4 bg-gray-900 rounded-full animate-ping"></div>
          </div>
          {/* Add more category sections as needed */}
        </div>
        <div className="flex items-center space-x-6 mb-8">
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
              className="bg-gray-100 outline-none placeholder-gray-400 focus:placeholder-gray-600"
              type="text"
              placeholder="Article name or keyword..."
            />
          </div>
          <div className="flex py-3 px-4 rounded-lg text-gray-500 font-semibold cursor-pointer">
            <span>All categories</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          <button className="bg-gray-800 py-3 px-5 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300 cursor-pointer">
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* Display All Products */}
      <div className="px-4">
        <h2 className="text-2xl font-bold mb-6">All Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Display all filtered products */}
          {products.map((product, index) => (
            <ProductCard key={index} data={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurStore;
