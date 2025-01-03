import clsx from "clsx";
import React, { useState } from "react";
import { Link } from "react-router";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container base-container ">
        {/* Logo */}
        <Link to="/" className="logo">
          <img
            className="min-w-40"
            src="https://raw.githubusercontent.com/gocomet-india/frontend-hotel-assignment/286ebfc6c07d6a38969da05b673b21be6e89eab3/book-my-hotel-logo.svg"
            alt="Logo"
          />
        </Link>

        {/* Menu Items */}
        <div
          className={`menu flex-grow w-full gap-10 ml-10 md:gap-16 md:ml-16 ${
            isMobileMenuOpen ? "menu-open" : ""
          }`}
        >
          <Link to="/" className="menu-item">
            Home
          </Link>
          <Link to="/hotels" className="menu-item">
            Hotels
          </Link>
          <Link to="/places" className="menu-item">
            Places
          </Link>
          <Link to="/signin" className="menu-item  sm:ml-auto">
            Sign in
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex-grow">
          {/* <button className="menu-toggle ml-auto ">☰</button> */}
          <button
            className={clsx(
              "menu-toggle ml-auto h-8",
              isMobileMenuOpen ? "menu-open" : ""
            )}
            onClick={toggleMobileMenu}
          >
            <span className="hamburger"></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
