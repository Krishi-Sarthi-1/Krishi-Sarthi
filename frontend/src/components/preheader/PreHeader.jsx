import React from "react";
import "./PreHeader.css";
import logo from "../../img//logo.png";

const PreHeader = () => {
  const width = window.innerWidth;
  console.log(width);
  return (
    <div className="bg-[#219653] px-6 py-2 md:inline-block hidden w-full">
      <div className="flex items-center justify-between ml-6">
        <div className="flex items-center justify-center">
          {/* <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
            className="logo"
            alt=""
          /> */}
          <img src={logo} className="logo" alt="" />
          <p className="ml-1 text-xs font-semibold text-white sm:text-sm">
            Kisaan Upkaran Ka Ek Matra Sarthi
          </p>
        </div>
        <div className="">
          <div className="" id="google_element"></div>
        </div>
      </div>
    </div>
  );
};

export default PreHeader;
