const StoreHero = () => {
  return (
    <div className="container flex flex-wrap items-center px-6 py-16 mx-auto">
      <div className="w-full lg:w-1/2">
        <div className="relative z-20">
          <span className="w-20 h-2 mb-8 bg-gray-800 dark:bg-white"></span>
          <h1 className="flex flex-col text-4xl font-black leading-tight text-gray-800 uppercase font-bebas-neue sm:text-6xl dark:text-white">
            Be on
            <span className="text-3xl sm:text-5xl">Time</span>
          </h1>
          <p className="text-sm text-gray-700 sm:text-base dark:text-white mt-4">
            Dimension of reality that makes change possible and understandable.
            An indefinite and homogeneous environment in which natural events
            and human existence take place.
          </p>
          <div className="flex mt-6">
            <a
              href="#"
              className="px-4 py-2 mr-4 text-white uppercase bg-pink-500 border-2 border-transparent rounded-lg text-sm hover:bg-pink-400"
            >
              See Feuture
            </a>
            <a
              href="#"
              className="px-4 py-2 text-pink-500 uppercase bg-transparent border-2 border-pink-500 rounded-lg dark:text-white hover:bg-pink-500 hover:text-white text-sm"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <div className="relative">
          <img
            src="https://res.cloudinary.com/djq8hnmt9/image/upload/v1714757506/public/ugezuq3i7oyjkys17up8.png"
            className="max-w-full"
          />
        </div>
      </div>
    </div>
  );
};
export default StoreHero;
