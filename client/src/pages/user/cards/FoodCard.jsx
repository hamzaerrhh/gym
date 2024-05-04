const FoodCard = ({ food }) => {
  return (
    <div className="max-w-xs  overflow-hidden shadow-lg bg-white rounded-2xl dark:bg-gray-800">
      <img className="w-full" src={food.image} alt={food.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 dark:text-white">
          {food.name}
        </div>
        <p className="text-gray-700 text-base dark:text-gray-300">
          Ingredients: {food.ingredients.join(", ")}
        </p>
        <p className="text-gray-700 text-base dark:text-gray-300">
          Calories: {food.calories.protein}g protein, {food.calories.fat}g fat,{" "}
          {food.calories.carbohydrates}g carbohydrates
        </p>
        <p className="text-gray-700 text-base dark:text-gray-300">
          Price: {food.price}
        </p>
      </div>
    </div>
  );
};

export default FoodCard;
