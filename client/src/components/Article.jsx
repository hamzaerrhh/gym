import React from "react";
import gym from "../assets/gym.svg";

const Article = () => {
  return (
    <div
      className={`w-full bg-cover bg-center bg-no-repeat h-screen flex flex-col items-center justify-center gap-8`}
      style={{
        backgroundImage: `url(https://res.cloudinary.com/djq8hnmt9/image/upload/v1714759785/public/ehu0wcaq5nctqffmqbtr.jpg)`,
      }}
    >
      <h1 className="text-4xl text-gray-300 leading-relaxed text-center w-4/5">
        "Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s"
      </h1>
      <div className="flex items-center gap-4">
        <div className="rounded-full w-12 h-12 bg-white overflow-hidden">
          <img src={gym} alt="Gym Icon" />
        </div>
        <div className="flex flex-col tracking-wider">
          <label className="text-white font-bold text-base">
            Gladiator gym
          </label>
        </div>
      </div>
    </div>
  );
};

export default Article;
