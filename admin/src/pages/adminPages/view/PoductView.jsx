import { useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";

const ProductView = ({ product }) => {
  console.log("the view", product);
  const rate = () => {
    let rate = product.nbrOfRate / product.rate;
    rate = 3.4;
    return rate;
  };

  // Render a star icon based on the rating
  const renderStar = (index) => {
    if (index + 0.5 === rating) {
      return (
        <svg
          key={index}
          className="w-5 fill-[#333]"
          viewBox="0 0 14 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
        </svg>
      );
    } else if (index < rating) {
      return (
        <svg
          key={index}
          className="w-5 fill-[#333]"
          viewBox="0 0 14 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
        </svg>
      );
    } else {
      return (
        <svg
          key={index}
          className="w-5 fill-[#CED5D8]"
          viewBox="0 0 14 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
        </svg>
      );
    }
  };

  const rating = rate();

  const [mainImage, setMainImage] = useState(product.mainImage);

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  return (
    <div className="font-sans bg-white">
      <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
          <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            <div className="px-4 py-10 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
              <img
                src={mainImage}
                alt="Product"
                className="w-4/5 rounded object-cover cursor-pointer"
                onClick={() => handleImageClick(product.mainImage)}
              />
              <button type="button" className="absolute top-4 right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  fill="#ccc"
                  className="mr-1 hover:fill-[#333]"
                  viewBox="0 0 64 64"
                >
                  <path
                    d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                    data-original="#000000"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="rounded-xl p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]"
                >
                  <img
                    src={image}
                    alt={`Product${index + 1}`}
                    className="w-24 cursor-pointer"
                    onClick={() => handleImageClick(image)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="flex items-center">
              <h2 className="text-2xl font-extrabold text-[#333]">
                {product.name}
              </h2>
              <div className="mx-4 border-l border-gray-300 h-6"></div>
              <span>{product.category}</span>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <p className="text-[#333] text-3xl font-bold">
                {product.prix} dh
              </p>
            </div>
            <div className=" flex justify-start items-center gap-2 text-xl">
              <FaCartArrowDown /> {product.stock}
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => renderStar(index))}
            </div>

            {/* Buttons for buying and adding to cart */}
            <div className="flex flex-wrap gap-4 mt-10">
              <button
                type="button"
                className="min-w-[200px] px-4 py-3 bg-[#333] hover:bg-[#111] text-white text-sm font-semibold rounded"
              >
                Buy now
              </button>
              <button
                type="button"
                className="min-w-[200px] px-4 py-2.5 border border-[#333] bg-transparent hover:bg-gray-50 text-[#333] text-sm font-semibold rounded"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
