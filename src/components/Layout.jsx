import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="base-container">
        <Outlet />
      </div>
      {/* <main className='base-container'>
          {children}
        </main> */}
    </div>
  );
};

export default Layout;
