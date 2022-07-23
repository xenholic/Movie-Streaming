import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { showSuccess } from "../helpers/swal";

const Sidebar = () => {
  let navigate = useNavigate();
  let { pathname: pathName } = useLocation();
  const handleNavigation = (url) => {
    navigate(url);
  };

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
    showSuccess("Logout Success!");
  };

  return (
    <div className="sidebar">
      <h1>PojanFlix</h1>
      <div
        onClick={() => handleNavigation("/")}
        className={`menu-box ${pathName === "/" ? "active" : null}`}
      >
        <i className="fa-solid fa-house"></i>
        <p>Dashboard</p>
      </div>
      <div
        onClick={() => handleNavigation("/genres")}
        className={`menu-box ${pathName === "/genres" ? "active" : null}`}
      >
        <i className="fa-solid fa-tag"></i>
        <p>Genre</p>
      </div>
      <div
        onClick={() => handleNavigation("/addAdmin")}
        className={`menu-box ${pathName === "/addAdmin" ? "active" : null}`}
      >
        <i className="fa-solid fa-user-plus"></i>
        <p>Add Admin</p>
      </div>
      <div onClick={logoutHandler} className="menu-box">
        <i className="fa-solid fa-right-from-bracket"></i>
        <p>Sign Out</p>
      </div>
    </div>
  );
};

export default Sidebar;
