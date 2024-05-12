import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { clearCart } from "../../redux/reducere/cartSlice";

const ChekoutFood = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const food = useSelector((state) => state.food.items);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    phone: "",
    email: "",
    adress: "",
    city: "",
    zip: "",
    urgentNumber: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (food.length === 0) {
      navigate("/nurition");
    }
  }, []);

  const handlePaypal = () => {};

  //   if (cartItems) {
  //     navigate("/");
  //   }
  const handleSubmit = async () => {
    console.log("Submitted!");
    console.log(formData);
    try {
      //verify the data entry
      if (
        !formData.name ||
        !formData.last_name ||
        !formData.phone ||
        !formData.city ||
        !formData.adress ||
        !formData.urgentNumber ||
        !formData.city ||
        !formData.zip
      ) {
        return toast.error("Please fill all fields");
      }
      //send the data
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/orderFood`,
        { formData, food },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log(res.data);
      dispatch(clearCart());

      setFormData({
        name: "",
        last_name: "",
        phone: "",
        email: "",
        adress: "",
        city: "",
        zip: "",
        urgentNumber: "",
      });
      navigate("/");
    } catch (error) {
      console.log(err);
    }
    toast.success("thank u!");
    toast.success("we will call u later");
  };

  return (
    <div className="font-[sans-serif] pt-24 bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white inline-block border-b-4 border-blue-500 pb-1">
            Checkout food
          </h2>
          <Toaster position="top-center" reverseOrder={false} />
        </div>
        <div className="mt-12">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-bold text-white">01</h3>
              <h3 className="text-xl font-bold text-white">Personal Details</h3>
            </div>
            <div className="md:col-span-2">
              <form>
                <div className="grid sm:grid-cols-2 gap-5">
                  <input
                    name="name"
                    onChange={handleInputChange}
                    value={formData.name}
                    type="text"
                    placeholder="First name"
                    className="px-4 py-3.5 bg-gray-800 text-white w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    name="last_name"
                    onChange={handleInputChange}
                    value={formData.last_name}
                    placeholder="Last name"
                    className="px-4 py-3.5 bg-gray-800 text-white w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    onChange={handleInputChange}
                    value={formData.email}
                    placeholder="Email address"
                    className="px-4 py-3.5 bg-gray-800 text-white w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                  />
                  <input
                    name="phone"
                    type="number"
                    onChange={handleInputChange}
                    value={formData.phone}
                    placeholder="Phone number"
                    className="px-4 py-3.5 bg-gray-800 text-white w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div>
              <h3 className="text-xl font-bold text-white">02</h3>
              <h3 className="text-xl font-bold text-white">Shopping Address</h3>
            </div>
            <div className="md:col-span-2">
              <form>
                <div className="grid sm:grid-cols-2 gap-5">
                  <input
                    name="adress"
                    onChange={handleInputChange}
                    value={formData.adress}
                    type="text"
                    placeholder="Street address"
                    className="px-4 py-3.5 bg-gray-800 text-white w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    name="city"
                    onChange={handleInputChange}
                    value={formData.city}
                    placeholder="City"
                    className="px-4 py-3.5 bg-gray-800 text-white w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    name="urgentNumber"
                    onChange={handleInputChange}
                    value={formData.urgentNumber}
                    placeholder="urgent Number"
                    className="px-4 py-3.5 bg-gray-800 text-white w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                  />
                  <input
                    type="number"
                    name="zip"
                    minLength={4}
                    onChange={handleInputChange}
                    value={formData.zip}
                    placeholder="Zip Code"
                    className="px-4 py-3.5 bg-gray-800 text-white w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div>
              <h3 className="text-xl font-bold text-white">03</h3>
              <h3 className="text-xl font-bold text-white">Payment method</h3>
            </div>
            <div className="md:col-span-2 w-full">
              <div className="w-full grid gap-6 sm:grid-cols-4">
                <button className="w-full h-full">
                  <img
                    src="https://images.vexels.com/media/users/3/144838/isolated/preview/0e8ecc882dcf98521ef01d2163416fc9-bitcoin-logo.png"
                    className="w-full h-full object-contain"
                    alt="Bitcoin Logo"
                  />
                </button>
                <button className="w-full h-full">
                  <img
                    src="https://i.pinimg.com/originals/3a/c0/9f/3ac09f21f3f0a6ca5e755a63621a41a5.png"
                    className="w-full h-full object-contain"
                    alt="Ethereum Logo"
                  />
                </button>
                <button className="w-full h-full">
                  <img
                    src="https://readymadeui.com/images/paypal.webp"
                    className="w-full h-full object-contain"
                    alt="PayPal Logo"
                  />
                </button>
                <button className="w-full h-full">
                  <img
                    src="https://www.freepnglogos.com/uploads/visa-and-mastercard-logo-26.png"
                    className="w-full h-full object-contain"
                    alt="Visa Logo"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-end gap-4 mt-12">
            <button
              onClick={handleSubmit}
              type="submit"
              className="px-6 py-3.5 text-sm bg-transparent border-2 text-white rounded-md hover:bg-gray-800"
            >
              Pay later at home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChekoutFood;
