import React, { useState, useEffect } from "react";
import axios from "axios";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(10);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/event", {
          withCredentials: true,
        });
        setEvents(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvents();
  }, []);

  // Pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Event</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 text-left">Title</th>
            <th className="py-2 px-4 bg-gray-200 text-left">Start Date</th>
            <th className="py-2 px-4 bg-gray-200 text-left">End Date</th>
            <th className="py-2 px-4 bg-gray-200 text-left">Localisation</th>
            <th className="py-2 px-4 bg-gray-200 text-left">Image</th>
          </tr>
        </thead>
        <tbody>
          {currentEvents.map((event) => (
            <tr key={event._id}>
              <td className="py-2 px-4">{event.title}</td>
              <td className="py-2 px-4">{event.dateTimeStarted}</td>
              <td className="py-2 px-4">{event.dateTimeEnd}</td>
              <td className="py-2 px-4">{event.localisation}</td>
              <td className="py-2 px-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-12 w-12 object-cover rounded-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        eventsPerPage={eventsPerPage}
        totalEvents={events.length}
        paginate={paginate}
      />
    </div>
  );
};

const Pagination = ({ eventsPerPage, totalEvents, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalEvents / eventsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4">
      <ul className="flex">
        {pageNumbers.map((number) => (
          <li key={number}>
            <a
              onClick={() => paginate(number)}
              href="#!"
              className="px-3 py-1 bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Event;
