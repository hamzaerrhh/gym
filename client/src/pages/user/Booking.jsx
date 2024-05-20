import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import propTypes from "prop-types";

const Booking = ({ updateDate }) => {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium">Select Date and Time:</label>
            <DatePicker
              selected={selectedDateTime}
              onChange={(date) => {
                setSelectedDateTime(date);
                updateDate(date);
              }}
              showTimeSelect
              timeIntervals={60}
              dateFormat="MMMM d, yyyy h aa"
              filterDate={(date) => {
                // Exclude Sundays (0) and Saturdays (6)
                return date.getDay() !== 0 && date.getDay() !== 6;
              }}
              filterTime={(time) => {
                // Limit selectable hours from 9:00 to 12:00 and from 14:00 to 21:00
                const hours = time.getHours();
                return (
                  (hours >= 9 && hours < 12) || (hours >= 14 && hours <= 21)
                );
              }}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
Booking.propTypes = {
  updateDate: propTypes.func.isRequired,
};
export default Booking;
