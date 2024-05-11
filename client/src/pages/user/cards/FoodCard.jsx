import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../redux/reducere/foodSlice";

const FoodCard = ({ food }) => {
  const dispatch = useDispatch();
  const foodItems = useSelector((state) => state.food.items);

  const handleAddItem = async () => {
    dispatch(addItem({ food: food }));
    console.log(foodItems); // Log cartItems after the action has been dispatched
  };

  return (
    <div className="max-w-xs overflow-hidden shadow-lg bg-white rounded-2xl dark:bg-gray-800">
      <div className="relative">
        <img
          className="object-cover w-full h-48"
          src={food.mainImage}
          alt={food.name}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <h3 className="text-white text-2xl font-semibold">{food.name}</h3>
        </div>
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base dark:text-gray-300">
          Ingredients: {food.ingredients}
        </p>
        <p className="text-gray-700 text-base dark:text-gray-300">
          Calories: {food.info.protein}g protein, {food.info.fat}g fat,{" "}
          {food.info.carbohydrates}g carbohydrates
        </p>
        <p className="text-gray-700 text-base dark:text-gray-300">
          Price: {food.prix} dh
        </p>
        <button
          onClick={handleAddItem}
          className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-purple-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600 "
        >
          <span>Add Cart</span>
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
