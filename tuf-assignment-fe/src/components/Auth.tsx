import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import spinner from "../assets/spinner.svg";
import { Button } from "./Button";
import Input from "./ui/Input";

const Auth = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { isLoading, login } = useAuth();

  const onChangeEmail = (e: any) => setData({ ...data, email: e.target.value });
  const onChangePassword = (e: any) =>
    setData({ ...data, password: e.target.value });

  const submit = (e: any) => {
    e.preventDefault();
    login(data);
  };

  const navigate = useNavigate();
  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login) navigate("/dashboard");
  }, [localStorage]);
  return (
    <div className="w-screen flex items-center justify-center h-screen">
      <div className="relative mx-auto w-full max-w-md bg-[#2b3a53] px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-white">Sign in</h1>
            <p className="mt-2 text-gray-300">
              Sign in below to access your account
            </p>
          </div>
          <div className="mt-5">
            <form onSubmit={submit}>
              <div className="relative mt-6">
                <Input
                  value={data.email}
                  setValue={(val: string) => setData({ ...data, email: val })}
                  placeholder="Enter your email"
                />
              </div>
              <div className="relative mt-6">
                <Input
                  value={data.password}
                  setValue={(val: string) =>
                    setData({ ...data, password: val })
                  }
                  placeholder="Enter your password"
                  type="password"
                />
              </div>
              <div className="my-6 flex items-center justify-center">
                <Button
                  onClick={() => {
                    login;
                  }}
                  loading={isLoading}
                  className="bg-slate-500 px-12 w-full py-6 flex items-center justify-center "
                >
                  Sign in
                </Button>
              </div>
              <p className="text-center text-sm text-gray-300">
                Don&#x27;t have an account yet?
                <span
                  aria-disabled
                  className="font-semibold ml-1 cursor-pointer  text-gray-400 hover:underline focus:text-gray-800 focus:outline-none"
                >
                  Sign up
                </span>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
