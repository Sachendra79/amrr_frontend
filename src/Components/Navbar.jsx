import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import navImg from "../Assets/logo.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Navbar = () => {
  
  



  return (
    <div className=" bg-slate-900" >
      <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto">
        <NavLink to="/">
          <div className="ml-5 mb-3">
            <img className=" h-12" src={navImg} alt="navImg" />
           
          </div>
        </NavLink>
        <div className="flex items-center font-medium text-slate-100 mr-5 space-x-6">
          <NavLink to="/" className=" hover:text:2xl hover:text-green-400">
            <p>ViewItem</p>
          </NavLink>

          <NavLink to="/AddItem" className=" hover:text:2xl hover:text-green-400">
           <p>AddItem</p>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
