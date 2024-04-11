import React from "react";
import { Link, Outlet } from "react-router-dom";
import { House, Plus } from "@phosphor-icons/react";

const Navbar = () => {
  return (
    // Responsive container with some additional padding and shadow for depth
    <div className="flex justify-between items-center bg-white shadow-md px-4 py-2 lg:max-w-4xl lg:mx-auto">
      <Link to={"/"} className="flex items-center space-x-2 transition-all ease-linear hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <House size={32} className="text-gray-800" />
        <span className="hidden sm:block text-gray-800 font-medium">Home</span>
      </Link>
      <Link to={"/createTask"} className="flex items-center space-x-2 transition-all ease-linear hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <Plus size={32} className="text-gray-800" />
        <span className="hidden sm:block text-gray-800 font-medium">Create Task</span>
      </Link>
      <Outlet />
    </div>
  );
};

export default Navbar;
