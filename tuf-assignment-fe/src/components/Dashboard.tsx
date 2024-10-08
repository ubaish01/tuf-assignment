import { useEffect, useState } from "react";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import { Button } from "./Button";
import useBanner, { bannerType } from "../hooks/useBanner";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Joyride from "react-joyride";
import { JOYRIDE_STEPS_FOR_DASHBOARD } from "../constants";

const STATE = {
  EDIT: 1,
  PREVIEW: 2,
};

const Dashboard = () => {
  const { banner, toggleBanner, updateBanner, isLoading } = useBanner();
  const [state, setState] = useState(STATE.PREVIEW);
  const [data, setData] = useState<bannerType>({
    heading: "",
    content: "",
    timer: 60,
    link: "",
    active: false,
  });

  const navigate = useNavigate();
  const { logout } = useAuth();
  const showJoyride = !localStorage.getItem("dashboard-tour-done");

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (!login) {
      return navigate("/");
    }
    if (banner) setData(banner);
  }, [banner]);

  const joyrideCB = (event: any) => {
    if (event.action === "reset") {
      localStorage.setItem("dashboard-tour-done", "true");
    }
  };

  return (
    <>
      <div className="w-full xl:px-72 lg:px-60 md:px-32 sm:px-12 px-2 relative py-24 flex flex-col items-center justify-center h-screen">
        <div className="fixed top-8 right-0 px-8  w-full flex items-center justify-between">
          <Link
            to="/"
            className="text-white rounded-full p-3 hover:scale-105 duration-200 hover:bg-slate-700 bg-slate-600 flex items-center justify-center size-16"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-12"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </Link>
          <Button
            className="bg-slate-600 px-12 step-6 py-4 flex items-center justify-center gap-2 "
            onClick={logout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
            Logout
          </Button>
        </div>
        {state === STATE.EDIT ? (
          <>
            <div className="bg-[#2b3a53] text-gray-400 gap-2 2xl:w-2/4 md:3/4 w-full grid grid-cols-2  md:p-8 sm:p-4 p-2 py-4   rounded-md">
              <div className="col-span-2">
                <span className="px-2 py-2">Heading of the banner</span>
                <Input
                  placeholder="eg: 20% off on on diwali"
                  value={data.heading}
                  setValue={(val: any) => setData({ ...data, heading: val })}
                />
              </div>
              <div className="col-span-2">
                <span className="px-2 py-2">Description of the banner</span>

                <Textarea
                  placeholder="eg: Lorem ipsum dolor sit amet."
                  inputClass="h-40"
                  value={data.content}
                  setValue={(val: any) => setData({ ...data, content: val })}
                />
              </div>
              <div className="col-span-2">
                {" "}
                <span className="px-2 py-2">Redirected link</span>
                <Input
                  placeholder="eg: https://takeyouforward.org/sale"
                  value={data.link}
                  setValue={(val: any) => setData({ ...data, link: val })}
                />
              </div>
              <div className="col-span-1">
                <span className="px-2 py-2">Timer(in seconds)</span>
                <Input
                  placeholder="eg: 60"
                  value={data.timer}
                  type="number"
                  setValue={(val: any) => setData({ ...data, timer: val })}
                />
              </div>
              <div className="col-span-1 flex flex-col px-2">
                <span className="px-2 py-2">Banner active</span>
                <label className="inline-flex items-center px-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data?.active}
                    onClick={() => {
                      setData({ ...data, active: !data.active });
                    }}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            <div className="gap-2 sm:flex-row flex-col mt-2 flex px-2">
              <Button
                className="bg-slate-600  px-24 py-2 w-full "
                onClick={() => {
                  setData(banner as bannerType);
                  setState(STATE.PREVIEW);
                }}
              >
                Reset
              </Button>
              <Button
                className="bg-slate-500   px-24  py-2 w-full "
                loading={isLoading}
                onClick={async () => {
                  await updateBanner(data);
                  setState(STATE.PREVIEW);
                }}
              >
                Update
              </Button>
            </div>
          </>
        ) : isLoading ? (
          <>
            <h1 className="mb-2 animate-pulse text-3xl font-semibold bg-gray-500 h-8 w-80 rounded-md"></h1>
            <div className="bg-[#2b3a53]  animate-pulse flex-col flex text-gray-400 gap-2 2xl:w-2/4 md:3/4 w-full   md:p-8 sm:p-4 p-2 py-4   rounded-md">
              <div className="text-2xl h-6 w-72 rounded-md bg-gray-500"></div>
              <div className="grid gap-1 my-4">
                <div className="text-2xl h-3 w-[20rem] rounded-md bg-gray-500"></div>
                <div className="text-2xl h-3 w-[30rem] rounded-md bg-gray-500"></div>
                <div className="text-2xl h-3 w-[16rem] rounded-md bg-gray-500"></div>
                <div className="text-2xl h-3 w-[32rem] rounded-md bg-gray-500"></div>
              </div>
              <div className="flex items-center gap-2">
                Link :{" "}
                <div className="underline cursor-pointer h-4 w-[16rem] rounded-md bg-gray-500"></div>
              </div>
              <div>
                <div className="col-span-1 flex flex-col ">
                  <span className=" py-2">Banner active</span>
                  <label className="inline-flex items-center px-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data?.active}
                      onClick={toggleBanner}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>{" "}
              </div>
            </div>
            <Button className="bg-slate-500   px-24  mt-2" onClick={() => {}}>
              Edit
            </Button>
          </>
        ) : (
          <>
            <h1 className="mb-2 text-3xl font-semibold text-white">
              Banner Content Preview
            </h1>
            <div className="bg-[#2b3a53] flex-col flex text-gray-400 gap-2 2xl:w-2/4 md:3/4 w-full   md:p-8 sm:p-4 p-2 py-4   rounded-md">
              <div className="text-2xl step-1">{data?.heading}</div>
              <div className="step-2">{data?.content}</div>
              <div>
                Link :{" "}
                <span className="underline step-3 cursor-pointer">
                  {data?.link}
                </span>
              </div>
              <div>
                <div className="col-span-1 step-4 flex flex-col ">
                  <span className=" py-2">Banner active</span>
                  <label className="inline-flex items-center px-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data?.active}
                      onClick={toggleBanner}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>{" "}
              </div>
            </div>
            <Button
              className="bg-slate-500 step-5  px-24  mt-2"
              onClick={() => setState(STATE.EDIT)}
            >
              Edit
            </Button>
          </>
        )}
      </div>
      {!isLoading && showJoyride ? (
        <Joyride
          callback={joyrideCB}
          steps={JOYRIDE_STEPS_FOR_DASHBOARD}
          continuous
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Dashboard;
