const Header = () => {
  return (
    <>
      <div className="container mx-auto px-4 shadow font-sans w-full">
        <div className="flex items-center justify-between py-4">
          <div className="hidden sm:flex sm:items-center">
            <form className="form relative">
              <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1">
                <svg
                  width="17"
                  height="16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-labelledby="search"
                  className="w-5 h-5 text-gray-700"
                >
                  <path
                    d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                    stroke="currentColor"
                    strokeWidth="1.333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              <input
                className="input rounded-full px-8 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
                placeholder="Search..."
                required=""
                type="text"
              />
              <button
                type="reset"
                className="absolute right-3 -translate-y-1/2 top-1/2 p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </form>
          </div>
          <div className="hidden sm:flex sm:items-center">
            <a
              href="#"
              className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4"
            >
              log out
            </a>
            <div className="flex flex-col items-center justify-center">
              <div className="flex -space-x-4">
                <img
                  alt=""
                  className="w-12 h-12 border rounded-full dark:bg-gray-500 dark:border-gray-300"
                  src="https://source.unsplash.com/40x40/?portrait?1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
