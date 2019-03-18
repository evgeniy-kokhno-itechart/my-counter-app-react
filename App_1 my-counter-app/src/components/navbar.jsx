import React, { Component } from "react";

const NavBar = ({ numberOfCounters }) => {
  console.log("NavBar has been rendered");
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Navbar
        <span className="badge badge-spill badge-secondary">
          {numberOfCounters}
        </span>
      </a>
    </nav>
  );
};

export default NavBar;
