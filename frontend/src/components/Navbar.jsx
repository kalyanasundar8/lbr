import React from "react";

const Navbar = () => {
  return (
    <div className="w-full bg-white shadow-sm py-3 px-[200px] flex items-center justify-between">
      <h1 className="font-logoFont text-2xl">LBR</h1>
      <nav className="font-primaryFont text-[17px] flex items-center space-x-5">
        <button>Sign In</button>
        <button className="font-semibold bg-green-500 px-3 py-1 rounded-[3px]">Sign Up</button>
      </nav>
    </div>
  );
};

export default Navbar;
