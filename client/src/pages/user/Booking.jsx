import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { add } from "date-fns";
const MyCalendar = () => {
  /*
get api (push time,get)
    */
  const [clickid, isClicked] = useState(false);
  // Create a new Date object representing the current date
  const currentDate = new Date();
  const options = {
    weekday: "short", // Abbreviated weekday name (e.g., "Sat")
    day: "2-digit", // Two-digit day of the month (e.g., "04")
    month: "short", // Abbreviated month name (e.g., "May")
    year: "numeric", // Full year (e.g., "2024")
  };

  const [date, setDate] = useState(new Date());
  const [formatDate, setFormatDate] = useState(() =>
    date.toLocaleDateString("en-US", options)
  );

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setFormatDate(newDate.toLocaleDateString("en-US", options));
  };

  useEffect(() => {
    console.log("formatted date", formatDate);
  }, [formatDate]);

  // Calculate the date three months from now
  const maxDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 3,
    currentDate.getDate()
  );

  /////the time
  const getTimes = () => {};

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <h1>Calendar View</h1>
      {clickid ? (
        ""
      ) : (
        <Calendar
          onChange={handleDateChange}
          value={date}
          minDate={currentDate} // Set minDate to the current date
          maxDate={maxDate} // Set maxDate to three months from now
          minDetail="month"
          view="month"
          onClickDay={() => {
            isClicked(true);
          }}
          showNeighboringMonth={false}
        />
      )}

      {}
    </div>
  );
};

export default MyCalendar;
