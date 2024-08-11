import React from "react";
import clsx from "clsx";
import { bannerType } from "../hooks/useBanner";
import { Link } from "react-router-dom";

const Banner: React.FC<{
  timer: string;
  active: boolean;
  banner?: bannerType;
  closeBanner: () => void;
}> = ({ timer, active, banner, closeBanner }) => {
  const login = localStorage.getItem("login");

  return (
    <div className="bg-slate-800  relative overflow-hidden ">
      <header className="h-24 sm:h-32 flex items-center z-30 w-full">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="uppercase step-0 font-black text-3xl bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
            TakeUforward
          </div>
          <div className="flex items-center">
            <nav className="font-sen text-white uppercase text-lg lg:flex items-center hidden">
              <Link to="/" className="py-2 px-6 flex">
                Home
              </Link>
              <Link to="/" className="py-2 px-6 flex">
                Watch
              </Link>
              <Link to="/" className="py-2 px-6 flex">
                Product
              </Link>
              <Link to="/" className="py-2 px-6 flex">
                Contact
              </Link>
              <Link to="/auth" className="py-2 step-6 px-6 flex">
                {login ? "Admin" : "Signin"}
              </Link>
            </nav>
            <button className="lg:hidden flex flex-col ml-4">
              <span className="w-6 h-1 bg-white mb-1"></span>
              <span className="w-6 h-1 bg-white mb-1"></span>
              <span className="w-6 h-1 bg-white mb-1"></span>
            </button>
          </div>
        </div>
      </header>
      <div
        className={clsx(
          active ? "translate-x-0" : "translate-x-[90%]",
          // active ? "flex" : "hidden",
          " bg-slate-800 flex relative justify-center duration-1000 z-20 transition-all items-center overflow-hidden"
        )}
      >
        <section className="bg-slate-800 w-full h-screen items-center justify-center flex body-font ">
          <div className="container mx-auto flex md:px-24 md:py-10 md:flex-row flex-col items-center">
            <div className="lg:flex-grow mt-5 md:mt-0   md:w-1.5/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 className="text-2xl  step-1 capitalize font-extrabold leading-9 tracking-tight mb-3 text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-normal">
                {banner?.heading}
              </h1>
              <p className="mb-8 md:pl-0 step-2  pl-2 pr-2 leading-relaxed dark:text-gray-300">
                {banner?.content}
              </p>
              <div className="flex justify-center">
                <Link
                  to={banner?.link || ""}
                  target="_blank"
                  className="inline-flex step-3 text-white bg-emerald-600 border-0 py-2 px-6 focus:outline-none hover:bg-emerald-600 rounded text-lg"
                >
                  Get Started 🚀
                </Link>
                <a
                  onClick={closeBanner}
                  className="ml-4 inline-flex step-4 cursor-pointer text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
                >
                  Close Banner
                </a>
              </div>
              <div className="text-white text-2xl step-5 mt-4">
                Banner will automatically disapear in{" "}
                <span className="bg-gradient-to-r font-bold from-purple-500 to-pink-600 bg-clip-text text-transparent">
                  {timer}
                </span>
              </div>
            </div>
            <div className="lg:max-w-lg lg:w-full mb-5 md:mb-0 md:w-1/2 w-3/6">
              <img
                className="object-cover object-center rounded"
                alt="hero"
                src="https://www.svgrepo.com/show/490900/hot-air-balloon.svg"
              />
            </div>
          </div>
        </section>
      </div>

      <div
        className={clsx(
          active ? "translate-y-0" : "-translate-y-[100%]",
          // active ? "flex" : "hidden",
          "  flex relative duration-1000 z-20 transition-all items-center overflow-hidden"
        )}
      >
        <div className="flex  w-full justify-center items-center py-48 pt-24 ">
          <div className="mx-auto mt-10 flex justify-center px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8">
            <div className="text-center ">
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-200 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">
                  {/* <span className="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                    {timer}
                  </span> */}
                </span>
                <span className="block xl:inline">
                  <span className="mb-1 block">Learn DS & Algo</span>
                  <span className="bg-gradient-to-r from-indigo-400 to-pink-600 bg-clip-text text-transparent">
                    With an AI powered platform
                  </span>
                </span>
                <div className="mt-2">
                  10X faster
                  <span className="relative mt-3 whitespace-nowrap text-blue-600">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 418 42"
                      className="absolute top-3/4 left-0 right-0 m-auto h-[0.58em] w-fit fill-pink-400/50"
                      preserveAspectRatio="none"
                    >
                      <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
                    </svg>
                    <span className="relative ml-3">Learning and growth.</span>
                  </span>
                </div>
              </h1>
              {/* <div className="items-center justify-center text-6xl flex font-bold xl:inline">
                <div className="text-white text-3xl">
                  {" "}
                  Hurry up, Clock is tickeling
                </div>
                <div className="bg-gradient-to-r ml-2 from-purple-500 font-bolder to-pink-600 bg-clip-text text-transparent">
                  {timer}
                </div>
              </div> */}
              <p className="mx-auto mt-3 max-w-xl text-lg text-slate-400 sm:mt-5 md:mt-5">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis
                quas eaque, quam illo iure minima placeat ducimus dolores
                tenetur, a optio consequatur facilis reiciendis magni velit nemo
                eos veniam perspiciatis? Ex, accusantium.
              </p>
              <div className="mt-5 sm:mt-8 mb-12 sm:flex sm:justify-center">
                <div className="rounded-md shadow">
                  <a
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 md:py-4 md:px-10 md:text-lg"
                    href="#"
                  >
                    Explore courses 🚀
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
