import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Calendrier = () => {
  const [date, setDate] = useState(new Date());
  const maxDate = new Date();
  const startDate = new Date();

  const handleChange = (date) => {
    setDate(date);
    console.log(date);
  };

  return (
    <Calendar
      onChange={handleChange}
      value={date}
      maxDate={maxDate}
      view="week" // Set the view to week
      minDate={startDate}
      showNeighboringMonth={false}
    />
  );
};
export default Calendrier;
