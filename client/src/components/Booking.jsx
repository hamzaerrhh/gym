import axios from "axios";
import { useState } from "react";
import Booking from "../pages/user/Booking";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const BookingForm = ({ type }) => {
  const [step, setStep] = useState(1); // Track the current step
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [lastName, setLastName] = useState();

  const updateDate = (date) => {
    setDate(date);
  };

  const handleNextClick = () => {
    if (step === 3) {
      handleSubmet();
      console.log("start addinhg");
    }
    setStep(step + 1); // Move to the next step
  };

  const handlePrevClick = () => {
    setStep(step - 1); // Move to the previous step
  };

  const handleSubmet = async () => {
    try {
      console.log("the data to send", name, date, lastName, number);

      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/appoinement`,

        {
          info: {
            name: name,
            phone: number,
            lastName: lastName,
          },
          appointmentType: type,
          reservationTime: date,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const progressBarWidth = `${(step - 1) * 33}%`; // Adjust the width of the progress bar based on the step

  return (
    <>
      <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
        <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
          <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
            Book now and get
          </h3>
          <div className="relative mb-8">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div
                style={{ width: progressBarWidth }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              />
            </div>
            <div className="flex justify-between items-end">
              <div className="flex w-1/2">
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                  Step {step}
                </span>
              </div>
            </div>
          </div>
          <div>
            <div>
              {/* Conditionally render either the Calendar or the form */}
              {step === 1 ? (
                <div>
                  <h4 className="text-lg mb-4">Pick a date:</h4>
                  <Booking updateDate={updateDate} type={"spa"} />
                </div>
              ) : step === 3 ? (
                <div>
                  <h4 className="text-lg mb-4">Check Appointment:</h4>
                </div>
              ) : step === 2 ? (
                <form className="space-y-4">
                  <div>
                    <h4 className="text-lg mb-2">Selected date:</h4>
                    <p className="text-xl text-gray-800 mb-4">
                      {date.toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                      })}
                      :00
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name:
                    </label>
                    <input
                      type="text"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      value={name}
                      id="name"
                      name="name"
                      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="nickname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nickname:
                    </label>
                    <input
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      value={lastName}
                      type="text"
                      id="nickname"
                      name="lastName"
                      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number:
                    </label>
                    <input
                      type="tel"
                      value={number}
                      onChange={(e) => {
                        setNumber(e.target.value);
                      }}
                      id="phone"
                      name="number"
                      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </form>
              ) : (
                <div>done</div>
              )}
            </div>
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevClick}
                className={`${
                  step === 1 ? "hidden" : "block"
                } bg-gray-400 text-white py-2 px-4 rounded focus:outline-none`}
              >
                Prev
              </button>
              <button
                onClick={handleNextClick}
                className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none"
              >
                {step === 1 ? "Next" : step === 4 ? "Finish" : "Book"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
BookingForm.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BookingForm;
