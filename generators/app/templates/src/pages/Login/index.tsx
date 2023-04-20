import React, { useState } from "react";
import login from "@/assets/images/login.jpeg";
import {} from "konva";
import { fetchLogin } from "./fetch";
import { LoginParam } from "./data";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [param, setParam] = useState<LoginParam>({
    name: "",
    password: "",
  });

  const navigate = useNavigate();

  const onLogin = async (): Promise<void> => {
    if (param?.name && param?.password) {
      const data = await fetchLogin(param);

      if (data?.data) {
        localStorage.setItem("authorization", data?.data);
        navigate("/");
      }
    }
  };

  return (
    <div className=" h-full w-full flex items-center justify-center bg-gray-100">
      <div className="w-screenlg rounded-lg bg-white shadow-default flex overflow-hidden">
        <div className="w-1/2 px-24 flex flex-col justify-center">
          <h1 className="text-4xl">Welcome back</h1>
          <div className="mt-6 mb-8 text-xl text-gray-600">
            Welcome back! Please enter your details.
          </div>
          <div>
            <div className="text-xl mb-3">User</div>
            <input
              type="text"
              onChange={(e) => {
                setParam({ ...param, name: e.target?.value });
              }}
              className="w-full shadow-gray-900 border-default border-gray-400 py-4 rounded-lg px-4 outline-none text-4 focus:shadow-default"
            />
          </div>
          <div className="mt-6">
            <div className="text-xl mb-3">Password</div>
            <input
              type="password"
              onChange={(e) => {
                setParam({ ...param, password: e.target?.value });
              }}
              className="w-full shadow-gray-900 border-default border-gray-400 py-4 rounded-lg px-4 outline-none text-4 focus:shadow-default"
            />
          </div>
          <div className="flex justify-between my-6 items-center">
            <label htmlFor="color-input-red">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="color-input-red"
                  id="color-input-red"
                  className="w-6 h-6 rounded-lg border-default border-gray-400"
                />
                <div className="ml-2 text-sm">Remember for 30 days</div>
              </div>
            </label>
            <div className="ml-2 text-sm">Forgot password</div>
          </div>
          <button
            type="button"
            className="w-full bg-gray-900 text-white font-semibold rounded-lg py-3 text-lg"
            onClick={onLogin}
          >
            Sign in
          </button>
        </div>
        <div className="w-1/2">
          <img src={login} alt="login" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};
export default Login;
