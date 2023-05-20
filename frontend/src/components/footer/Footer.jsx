import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import logo from "../../img//logo.png";
import Vector from "../../img//Vector.png";
import Vector1 from "../../img//Vector1.png";
import Vector2 from "../../img//Vector2.png";
import footerBg from "../../img//footerBg.png";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#219653] inPhone py-20">
      <div className="flex items-center justify-center">
        <div className="flex-1 border-r-2 border-black-600">
          <div
            className="flex items-center justify-center mx-8 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo} className="footerLogo" alt="" />
            <div className="ml-4">
              <h3 className="mt-4 text-2xl font-bold text-white">
                Krishi <br /> Sarthi
              </h3>
              <p className="mt-2 font-normal text-white text-md">
                Kisaan upkaran ka ek Matra Sarthi.
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 px-16 border-r-2 border-black-600">
          <div className="flex">
            <ul className="mr-24 list-none">
              <li
                className="text-lg font-bold text-white cursor-pointer"
                onClick={() => navigate("/")}
              >
                Home
              </li>
              {/* <li className='text-lg font-medium text-white cursor-pointer'>Menu</li> */}
              <li className="text-lg font-medium text-white cursor-pointer">
                Market
              </li>
            </ul>
            <ul>
              <li
                className="text-lg font-bold text-white cursor-pointer"
                onClick={() => navigate("/support-center")}
              >
                Support Center
              </li>
              <li
                className="text-lg font-medium text-white cursor-pointer"
                onClick={() => navigate("help")}
              >
                Help Center
              </li>
              <li
                className="text-lg font-medium text-white cursor-pointer"
                onClick={() => navigate("/partner-dispute")}
              >
                Partner Dispute
              </li>
              <li
                className="text-lg font-medium text-white cursor-pointer"
                onClick={() => navigate("faq")}
              >
                FAQs
              </li>
            </ul>
          </div>
          <p className="mt-4 text-white text-md text-medium">
            Please provide us Feedback{" "}
            <button
              onClick={() => navigate("/feedback")}
              className="text-xl underline"
            >
              HERE
            </button>
          </p>
        </div>
        <div className="flex-1 px-16 border-r-2 border-black-600">
          <h1 className="w-2/3 ml-6 text-xl font-bold text-white">
            Give us a follow on social media
          </h1>
          <div className="flex my-5 justify-left">
            <img
              className="mx-3 ml-6 cursor-pointer socialIcons"
              src={Vector}
              alt=""
            />
            <img
              className="mx-3 ml-6 cursor-pointer socialIcons"
              src={Vector1}
              alt=""
            />
            <img
              className="mx-3 ml-6 cursor-pointer socialIcons"
              src={Vector2}
              alt=""
            />
          </div>
          <p className="ml-6 text-lg text-white">
            Made by : <strong>KRISHI-SARTHI</strong>
          </p>
        </div>
        <div className="flex flex-1 mr-6">
          <img src={logo} className="footerBgImg" alt="" />
          <h1 className="mt-6 text-xl font-bold text-white">
            Kisaan Upkaran
            Ka Ek Matra Sarthi
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
