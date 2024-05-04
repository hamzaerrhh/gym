import { vedio_coach } from "../../../assets";

const Coachheader = () => {
  return (
    <div className=" pt-8  bg-black text-white">
      <div className=" pt-24  px-4 pb-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="relative mb-6 sm:mx-auto md:mb-10 md:max-w-md lg:max-w-lg">
          <video
            className="object-cover w-full h-56 rounded shadow-lg md:h-64 lg:h-80"
            controls
            loop
          >
            <source src={vedio_coach} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="mb-16 md:mb-0 md:max-w-xl sm:mx-auto md:text-center">
          <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight sm:text-4xl sm:leading-none">
            The quick, brown fox jumps over a very sad and{" "}
            <span className="inline-block text-deep-purple-accent-400">
              lazy dog
            </span>
          </h2>
          <p className="mb-5 text-base md:text-lg">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae.
          </p>
          <div className="flex items-center justify-center">
            <a
              href="/"
              className=" text-black bg-white rounded-xl  inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide transition duration-200 shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
            >
              Get started
            </a>
            <a
              href="/"
              aria-label=""
              className=" text-black bg-white px-6 py-3 rounded-xl inline-flex items-center font-semibold transition-colors duration-200 hover:text-deep-purple-accent-700"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coachheader;
