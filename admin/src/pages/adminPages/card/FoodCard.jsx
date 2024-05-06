import { useState } from "react";
import { food_image } from "../../../assets";

const FoodCard = ({ food }) => {
  const [likes, setLikes] = useState(0);

  const incrementLikes = () => {
    setLikes(likes === 0 ? 1 : 0);
  };

  return (
    <div className="max-w-xs overflow-hidden shadow-lg rounded-2xl bg-gray-800">
      <img
        className="w-full"
        src={food.mainImage ? URL.createObjectURL(food.mainImage) : food_image}
        alt={food.name}
        style={{ width: "400px", height: "300px" }}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-1 text-white">
          {food.name ? food.name : "salade rigime"}
        </div>
        <div className="font-semibold text-lg mb-2 text-white">
          {food.description ? food.description : "foor helthy people "}
        </div>
        <p className=" text-base text-gray-300">
          Ingredients:{" "}
          {food.ingredients ? food.ingredients : "tomato,onion,eror"}
        </p>
        <p className=" text-base text-gray-300">
          protein: {food.protein ? food.protein : 11}g, fat:
          {food.fat ? food.fat : 19}g, carbs: {food.carbs ? food.carbs : 19}g
        </p>
        <p className=" text-base text-gray-300">
          Price: {food.prix ? food.prix : 122} dh
        </p>
        <div className="flex justify-between mt-4">
          <button className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-purple-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600">
            <span>Add Cart</span>
          </button>
          <div className="flex space-x-2 text-sm font-medium justify-start">
            <button
              className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-gray-700 hover:bg-gray-800 border hover:border-gray-500 border-gray-700 hover:text-white  hover:shadow-lg text-gray-400 rounded-full w-9 h-9 text-center p-2"
              onClick={incrementLikes}
              style={{ color: likes ? "red" : "gray", fontSize: "1.5rem" }}
            >
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
                  strokeWidth={1}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>

            <span className="text-gray-400 whitespace-nowrap mr-3">
              {likes}
            </span>
            <button className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-gray-700 hover:bg-gray-800 border hover:border-gray-500 border-gray-700 hover:text-white  hover:shadow-lg text-gray-400 rounded-full w-9 h-9 text-center p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className=""
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
