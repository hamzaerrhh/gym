import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { box, taekwando, gym_dark, piscine, dance, mma } from "../assets";

const ClubsCasual = () => {
  const generateClubs = (arr) => {
    return arr.map((sport) => {
      const getImageForClub = (image) => {
        switch (image) {
          case "box":
            return box;
          case "taekwando":
            return taekwando;
          case "gym_dark":
            return gym_dark;
          case "piscine":
            return piscine;
          case "dance":
            return dance;
          case "mma":
            return mma;
          default:
            return null; // Return null for unknown clubs
        }
      };

      return {
        image: getImageForClub(sport),
        name: sport.toUpperCase(),
        description: `Description for ${sport}`,
        subscriptions: [
          {
            duration: "1 month",
            price: `$${Math.floor(Math.random() * 20) + 50}`,
            description: `Subscription for 1 month`,
          },
          {
            duration: "6 months",
            price: `$${Math.floor(Math.random() * 50) + 50}`,
            description: `Subscription for 6 months`,
          },
          {
            duration: "1 year",
            price: `$${Math.floor(Math.random() * 70) + 50}`,
            description: `Subscription for 1 year`,
          },
        ],
        timeline: `Timeline for ${sport}`,
      };
    });
  };

  const clubs = generateClubs([
    "box",
    "taekwando",
    "gym_dark",
    "piscine",
    "dance",
    "mma",
  ]);

  const Dev = ({ club }) => {
    return (
      <a
        rel="noopener noreferrer"
        href="#"
        className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-50"
      >
        <img
          src={club.image}
          alt={club.name}
          className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500"
        />
        <div className="p-6 space-y-4 lg:col-span-5 bg-white text-center">
          <h3 className="text-2xl font-semibold text-gray-800">{club.name}</h3>
          <p className="text-gray-600">{club.description}</p>
          <ul className="mt-4">
            {club.subscriptions.map((subscription, index) => (
              <li
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-200"
              >
                <div>
                  <p className="text-gray-700">{subscription.description}</p>
                </div>
                <div className="text-blue-500 font-semibold">
                  ${subscription.price}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-left">
            <p className="text-gray-700">Timeline:</p>
            <ul className="ml-4 list-disc">
              <li>Monday: 9h-11h</li>
              <li>Tuesday: 16h-18h</li>
              <li>Friday: 18h-20h</li>
              <li>Sunday: 8h-12h</li>
            </ul>
          </div>
        </div>
      </a>
    );
  };

  return (
    <div className="w-full bg-white">
      <Splide options={{ perPage: 1, rewind: true, pagination: false }}>
        {clubs.map((club, index) => (
          <SplideSlide key={index}>
            <Dev club={club} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default ClubsCasual;
