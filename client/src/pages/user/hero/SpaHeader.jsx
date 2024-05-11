import { useNavigate } from "react-router-dom";
const SpaHeader = () => {
  const navigate = useNavigate();
  return (
    <section>
      <div
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/djq8hnmt9/image/upload/f_auto,q_auto/v1/public/kiori3p7lzn6ixa8rcna)",
        }}
        className=" bg-black"
      >
        <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 dark:text-gray-50">
          <h1 className="text-5xl font-bold leading-none sm:text-6xl xl:max-w-3xl dark:text-gray-50">
            Your body should have the best
          </h1>
          <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl dark:text-gray-50">
            a massage,spa,keni here we will make you fell greate
          </p>
          <div className="flex flex-wrap justify-center">
            <button
              onClick={() => {
                navigate("/spa/massage");
              }}
              type="button"
              className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-gray-100 dark:text-gray-900"
            >
              massage
            </button>
            <button
              onClick={() => {
                navigate("/spa/spa");
              }}
              type="button"
              className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-gray-100 dark:text-gray-900"
            >
              spa
            </button>
            <button
              onClick={() => {
                navigate("/spa/keni");
              }}
              type="button"
              className="px-8 py-3 m-2 text-lg border rounded dark:border-gray-300 dark:text-gray-50"
            >
              kenie
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SpaHeader;
