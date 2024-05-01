const Header = () => {
  return (
    <>
      <div className=" bg-gray-100  font-sans w-full ">
        <div className="bg-white shadow">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <div className="hidden sm:flex sm:items-center">
                <form class="form relative">
                  <button class="absolute left-2 -translate-y-1/2 top-1/2 p-1">
                    <svg
                      width="17"
                      height="16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      aria-labelledby="search"
                      class="w-5 h-5 text-gray-700"
                    >
                      <path
                        d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                        stroke="currentColor"
                        stroke-width="1.333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </button>
                  <input
                    class="input rounded-full px-8 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
                    placeholder="Search..."
                    required=""
                    type="text"
                  />
                  <button
                    type="reset"
                    class="absolute right-3 -translate-y-1/2 top-1/2 p-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5 text-gray-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
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
        </div>
      </div>
    </>
  );
};
export default Header;
