import gym from "../assets/gym.svg";
import { useEffect, useState } from "react";
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);
  return (
    <>
      <>
        <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full py-7">
          <nav className="relative max-w-7xl w-full flex flex-wrap md:grid md:grid-cols-12 basis-full items-center px-4 md:px-6 md:px-8 mx-auto">
            <div className="md:col-span-3">
              {/* Logo */}
              <div className=" w-full h-full flex justify-start text-center gap-4 align-middle items-center">
                <img src={gym} className=" w-8 bg-white rounded-lg m-2" />
                <a
                  className="md:block hidden  relative  text-black before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1 before:bg-lime-400 dark:text-white"
                  href="#"
                  aria-current="page"
                >
                  gym gladiator
                </a>
              </div>

              {/* End Logo */}
            </div>
            {/* Button Group */}
            <div className="flex items-center gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-3">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:hover:bg-white/10 dark:text-white dark:hover:text-white"
              >
                Sign in
              </button>
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border border-transparent bg-lime-400 text-black hover:bg-lime-500 transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-lime-500"
              >
                Hire us
              </button>
              <div className="md:hidden">
                <button
                  type="button"
                  className=" ease-out size-[38px] flex  justify-center items-center text-sm font-semibold rounded-xl border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700"
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                >
                  {isOpen ? (
                    <svg
                      className=" flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1={3} x2={21} y1={6} y2={6} />
                      <line x1={3} x2={21} y1={12} y2={12} />
                      <line x1={3} x2={21} y1={18} y2={18} />
                    </svg>
                  ) : (
                    <svg
                      className="  flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  )}
                </button>
                {!isOpen && (
                  <div className=" pt-2 right-[1px]  rounded-2xl p-12 bg-black mr-8   gap-6 absolute flex flex-col text-white ">
                    <a>home</a>
                    <a>about</a>
                    <a>home</a>
                    <a>about</a>
                  </div>
                )}
              </div>
            </div>

            {/* End Button Group */}
            {/* Collapse */}
            <div
              id="navbar-collapse-with-animation"
              className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block md:w-auto md:basis-auto md:order-2 md:col-span-6"
            >
              <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:justify-center md:items-center md:gap-y-0 md:gap-x-7 md:mt-0">
                <div>
                  <a
                    className="relative inline-block text-black before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1 before:bg-lime-400 dark:text-white"
                    href="#"
                    aria-current="page"
                  >
                    Work
                  </a>
                </div>
                <div>
                  <a
                    className="inline-block text-black hover:text-gray-600 dark:text-white dark:hover:text-neutral-300"
                    href="#"
                  >
                    Services
                  </a>
                </div>
                <div>
                  <a
                    className="inline-block text-black hover:text-gray-600 dark:text-white dark:hover:text-neutral-300"
                    href="#"
                  >
                    About
                  </a>
                </div>
                <div>
                  <a
                    className="inline-block text-black hover:text-gray-600 dark:text-white dark:hover:text-neutral-300"
                    href="#"
                  >
                    Careers
                  </a>
                </div>
                <div>
                  <a
                    className="inline-block text-black hover:text-gray-600 dark:text-white dark:hover:text-neutral-300"
                    href="#"
                  >
                    Blog
                  </a>
                </div>
              </div>
            </div>
            {/* End Collapse */}
          </nav>
        </header>
      </>
    </>
  );
};
export default NavBar;
