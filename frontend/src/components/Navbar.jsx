import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("userData"));

  return (
    <div className="w-full bg-white shadow-sm py-3 px-[20px] flex items-center justify-between md:px-[100px] xl:py-[0px]">
      <h1 className="font-logoFont text-xl md:text-2xl xl:text-2xl">LBR</h1>
      <nav className="font-primaryFont text-[15px] md:text-[18px] md:py-4 flex items-center space-x-5">
        {user === null ? (
          <div className="flex items-center space-x-2">
            <Link className="">Sign In</Link>
            <Link
              to="/signup"
              className="font-bold bg-green-500 px-2 py-1 rounded-[3px]"
            >
              Sign Up
            </Link>
          </div>
        ) : user.verified === true ? (
          <h1>{user.PassengerName}</h1>
        ) : (
          ""
        )}
      </nav>
    </div>
  );
};

export default Navbar;
