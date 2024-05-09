import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const ChekOut = ({ order, onClose }) => {
  const [orders, setOrders] = useState([]);
  const getOrder = async () => {
    try {
      let orderProducts = []; // Renamed the variable to avoid confusion

      // Using for...of loop instead of map for asynchronous operations
      for (const product of order.order) {
        console.log(product);

        // Using await to wait for the axios request to complete
        const response = await axios.get(
          `http://localhost:5000/api/product/${product.product_id}`,
          { withCredentials: true }
        );

        // Pushing the retrieved data to orderProducts array
        orderProducts.push({
          product: response.data.product, // Assuming you want to store response data
          quantity: product.quantity, // Corrected typo in product.quantity
        });
      }
      return orderProducts;

      // Do something with the orderProducts array here
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderProducts = await getOrder();
        setOrders(orderProducts);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, []); // Empty dependency array to ensure the effect runs only once

  console.log(orders);

  return (
    <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
      <div className="flex justify-between items-center ml-4 py-5 sm:px-6">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {order.info.name}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {order.info.phone}
          </p>
        </div>
        <div className="cursor-pointer text-gray-500 hover:text-gray-700">
          <button
            onClick={() => {
              onClose();
            }}
          >
            close
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {order.info.adress}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Total Price</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {order.total_price}
            </dd>
          </div>
          {orders.map((product, index) => (
            <div
              key={index}
              className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt className="text-sm font-medium text-gray-500">
                {product.product.name}
                <br />
                {product.product.prix}dh
              </dt>
              <img
                src={product.product.mainImage}
                alt={product.product.name}
                className="w-16 h-16"
              />
              <span className="text-sm text-gray-900">{product.quantity}</span>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
export default ChekOut;
