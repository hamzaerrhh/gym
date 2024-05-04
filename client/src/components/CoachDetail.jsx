import { box } from "../assets";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa6";
const CoachDetail = ({ detaille }) => {
  return (
    <section className=" bg-black dark:text-gray-200">
      <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
        <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between">
          <a
            rel="noopener noreferrer"
            href="#"
            className="block max-w-sm mx-auto lg:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-black"
          >
            <img
              src={detaille.imageMain}
              alt=""
              className="object-contain  w-full h-64 rounded sm:h-96 lg:col-span-7"
            />
            <div className="p-6 space-y-4 lg:col-span-5 text-center">
              <div className="flex flex-col items-center space-y-2">
                <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
                  {detaille.name}
                </h3>
                <h2 className="text-lg font-semibold text-gray-500">
                  {detaille.type}
                </h2>
              </div>
              <p className="text-gray-300">{detaille.description}</p>
              <div>
                <a
                  href="/findCoach"
                  className="inline-block px-6 py-3 text-lg font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-700 focus:outline-none focus:bg-gray-700 transition duration-300"
                >
                  Book Now
                </a>
              </div>
              <div className="flex justify-center mt-4 space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-300 transition duration-300"
                >
                  <FaFacebook />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-300 transition duration-300"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-300 transition duration-300"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </a>
        </div>
        <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {detaille.images &&
            detaille.images.map((image, index) => (
              <img className="object-cover w-full h-64" src={image} alt="" />
            ))}
        </div>
      </div>
    </section>
  );
};
export default CoachDetail;
