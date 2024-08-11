import React, { useEffect, useState } from "react";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import { Button } from "./Button";
import useBanner from "../hooks/useBanner";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { banner, updateBanner, isLoading } = useBanner();
  const [data, setData] = useState({
    heading: "",
    content: "",
    timer: 60,
    link: "",
    active: false,
  });

  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (!login) {
      return navigate("/");
    }
    if (banner) setData(banner);
  }, [banner]);

  return (
    <div className="w-full xl:px-72 lg:px-60 md:px-32 sm:px-12 px-2 relative py-24 flex flex-col items-center justify-center h-screen">
      <div className="fixed top-8 right-8">
        <Button
          className="bg-slate-600 px-12 py-4 flex items-center justify-center gap-2 "
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
            setData(banner);
          }}
        >
          Reset
        </Button>
        <Button
          className="bg-slate-500   px-24  py-2 w-full "
          loading={isLoading}
          onClick={() => {
            updateBanner(data);
          }}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
