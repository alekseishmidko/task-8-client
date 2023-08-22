import React from "react";
import { Button, Input } from "antd";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4 ">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between mx-2 ">
        <div className="flex items-center justify-center md:justify-start ">
          <img src="/logo.png" alt="Logo" className="h-8 w-8 md:mr-4" />
          <span className="text-lg font-semibold">My Website</span>
        </div>
        <div className="flex items-center justify-center md:flex-1">
          <div className="flex items-center  border-gray-600 rounded-lg">
            <Input
              type="text"
              placeholder="Search..."
              className="px-3 py-2 rounded-lg border-none focus:outline-none"
            />
            <Button className="bg-blue-500 text-white px-4 ml-2 rounded-lg">
              Search
            </Button>
          </div>
        </div>
        <div className="mt-4 md:mt-0 md:ml-4 mr-3">
          <Button className="text-white">Log In</Button>
          <Button className="bg-blue-500 text-white px-4  rounded-lg ml-2">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
