import React from "react";

import { useNavigate } from "react-router-dom";

const Navigation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-primary-navyDark">
      <nav className="h-14 leading-14 lg:w-screenlg xl:w-screenxl 2xl:w-screen2xl m-auto">
        <div className="flex justify-between">
          <ul className="flex text-white font-sans text-sm">
            <li className="mr-8 cursor-pointer">TOP</li>
            <li className="mr-8 cursor-pointer" onClick={() => navigate("/")}>
              HOME
            </li>
            <li className="mr-8 cursor-pointer">LOGIN</li>
          </ul>

          <ul className="text-white">
            <li className="cursor-pointer" onClick={() => navigate("/login")}>
              Sign in
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
