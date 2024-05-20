import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Test = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState([
    "09:00 ",
    "10:00 ",
    "11:00 ",
    "12:00 ",
    "14:00 ",
    "15:00 ",
    "16:00 ",
    "17:00 ",
    "18:00 ",
    "19:00 ",
    "20:00 ",
    "21:00 ",
    "22:00 ",
  ]);

  const handleBooking = () => {
    // Add logic for booking appointment
    console.log(
      `Appointment booked for ${selectedDate.toDateString()} at ${selectedTime}`
    );
    // Remove booked time from available times
    setAvailableTimes(availableTimes.filter((time) => time !== selectedTime));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium">Select Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MMMM d, yyyy"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium">Select Time:</label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Time</option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleBooking}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test;
