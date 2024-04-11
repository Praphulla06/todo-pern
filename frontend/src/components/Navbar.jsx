import React from "react";
import { Link, Outlet } from "react-router-dom";
import { House, Plus } from "@phosphor-icons/react";
const Navbar = () => {
  return (
    <div className="flex justify-evenly m-4 p-2">
      <Link to={"/"} className=" transition-all ease-linear hover:scale-110 ">
        {" "}
        <House size={32} />{" "}
      </Link>
      <Link
        to={"/createTask"}
        className=" transition-all ease-linear hover:scale-110 "
      >
        <Plus size={32} />
      </Link>{" "}
      <Outlet />
    </div>
  );
};

export default Navbar;
