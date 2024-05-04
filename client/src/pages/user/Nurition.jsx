import { food_bg } from "../../assets";
import { faker } from "@faker-js/faker";
import FoodCard from "./cards/FoodCard";
import { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const Nurition = () => {
  const generateFood = () => {
    const name = faker.lorem.words(faker.number.int({ min: 5, max: 10 }));
    const image = faker.image.food();
    const ingredients = Array.from(
      { length: faker.number.int({ min: 3, max: 10 }) },
      () => faker.lorem.word()
    );
    const calories = {
      protein: faker.number.float({ min: 5, max: 30, precision: 2 }),
      fat: faker.number.float({ min: 5, max: 30, precision: 2 }),
      carbohydrates: faker.number.float({ min: 5, max: 100, precision: 2 }),
    };
    const price = faker.commerce.price();

    return {
      name,
      image,
      ingredients,
      calories,
      price,
    };
  };

  const generateFoodsArray = (numFoods) => {
    const foods = [];
    for (let i = 0; i < numFoods; i++) {
      const food = generateFood();
      foods.push(food);
    }
    return foods;
  };

  const [foodArray, setFoodArray] = useState(generateFoodsArray(20));
  const [sortOrder, setSortOrder] = useState({
    protein: null,
    carbohydrates: null,
    fat: null,
  });

  const sortFoodsBy = (type) => {
    const sortedFoods = [...foodArray].sort((a, b) => {
      if (sortOrder[type] === "asc") {
        return a.calories[type] - b.calories[type];
      } else {
        return b.calories[type] - a.calories[type];
      }
    });
    setSortOrder({
      ...sortOrder,
      [type]: sortOrder[type] === "asc" ? "desc" : "asc",
    });
    setFoodArray(sortedFoods);
  };

  // Search function by name
  const searchByName = (keyword) => {
    const filteredFoods = foodArray.filter((food) =>
      food.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFoodArray(filteredFoods);
  };

  // Reset search
  const resetSearch = () => {
    setFoodArray(generateFoodsArray(20));
  };

  // Example usage:
  console.log(foodArray);

  return (
    <>
      <section
        style={{
          backgroundImage: `url(${food_bg})`,
        }}
        className={`relative  bg-cover bg-center bg-no-repeat`}
      >
        <div className=" text-white relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Let us find your
              <strong className="block font-extrabold text-rose-700">
                Forever Home.
              </strong>
            </h1>

            <p className="mt-4 max-w-lg sm:text-xl/relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
              illo tenetur fuga ducimus numquam ea!
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <a
                href="#"
                className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
              >
                Get Started
              </a>

              <a
                href="#"
                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className=" flex flex-col gap-4">
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
              onChange={searchByName}
            />
          </div>

          <div className="flex bg-white p-4 w-72 space-x-4 rounded-lg">
            <dev className=" w-full flex  justify-around">
              <dev>
                <button
                  className="flex gap-2 mr-2 items-center"
                  onClick={() => sortFoodsBy("protein")}
                >
                  Protein
                  {sortOrder.protein === "asc" ? (
                    <FaArrowUp />
                  ) : (
                    <FaArrowDown />
                  )}
                </button>
              </dev>
              <button
                onClick={() => sortFoodsBy("carbohydrates")}
                className="flex gap-2 mr-2 items-center"
              >
                Carbs
                {sortOrder.carbohydrates === "asc" ? (
                  <FaArrowUp />
                ) : (
                  <FaArrowDown />
                )}
              </button>

              <dev>
                 
                <button
                  onClick={() => sortFoodsBy("fat")}
                  className="flex gap-2 mr-2 items-center"
                >
                  Fat
                  {sortOrder.fat === "asc" ? <FaArrowUp /> : <FaArrowDown />}
                </button>
              </dev>
            </dev>
          </div>
          <div className="bg-blue-500 py-3 px-5 text-white font-semibold rounded-lg hover:bg-blue-600 cursor-pointer transition-colors duration-300">
            <button onClick={() => resetSearch()}>Reset</button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8 w-full h-full bg-black">
          {foodArray &&
            foodArray.map((food, index) => (
              <FoodCard food={food} key={index} className="w-1/5 p-4" />
            ))}
        </div>
      </div>
    </>
  );
};

export default Nurition;
