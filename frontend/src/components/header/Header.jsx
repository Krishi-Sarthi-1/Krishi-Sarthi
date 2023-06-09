import React, { useState } from "react";
import "./Header.css";

import { useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { getLogoutAction } from "../../redux/actions";
import Cookies from "js-cookie";

// import Login from "../../pages/Login";
// import Register from "../../pages/Register";
import Register from '../../pages/Auth/Register';
import Login from '../../pages/Auth/Register';

import { Link } from "react-router-dom";
// import { Contact Us } from "../../pages/ContactUs/ContactUs";

//images
import userIcon from "../../img/user_icon.svg";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const tokenState = useSelector((state) => state.tokenReducer);
  const authState = useSelector((state) => state.authReducer);

  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="h-16 inPhone mb-8">
      <div className="flex content-center">
        <div className="flex items-center ml-auto cursor-pointer lg:ml-32">
          <img
            onClick={() => navigate("/")}
            src={logo}
            className="logoWeb"
            alt=""
          />
          <h3 className="text-md font-bold opacity-[.70]">
            Krishi <br /> Sarthi
          </h3>
        </div>
        <div className="w-5/12 mx-auto flex-2">
          <ul className="flex mt-4 items-around">
            <li
              onClick={() => navigate("/")}
              className="text-lg cursor-pointer font-semibold text-[#219653] hover:opacity-90 lg:ml-7 ml-6 mr-1.5"
            >
              Home
            </li>
            <li
              className="text-lg cursor-pointer font-semibold text-[#219653] hover:opacity-90 ml-6 mr-1.5"
              onClick={() => navigate("/shop")}
            >
              Products
            </li>
            {/* <li
              className="text-lg cursor-pointer font-semibold text-[#219653] hover:opacity-90 ml-6 mr-1.5"
              onClick={() => navigate("/categories")}
            >
              Category
            </li> */}
            <li
              className="text-lg cursor-pointer font-semibold text-[#219653] hover:opacity-90 ml-6 mr-1.5"
              onClick={() => navigate("/dashboard/Admin")}
            >
              Add Product
            </li>
            <li
              onClick={() => navigate("/help")}
              className="text-lg cursor-pointer font-semibold text-[#219653] hover:opacity-90 ml-6 mr-1.5"
            >
              Help
            </li>
            <li>

              <Link to="/contact">
                <p className="text-lg cursor-pointer font-semibold text-[#219653] hover:opacity-90 ml-6 mr-1.5">
                  Contact Us
                </p>
              </Link>{" "}

            </li>
          </ul>
        </div>
        {!Cookies.get("refresh-token") ? (
          <div className="flex items-center">
            {/* <button
              onClick={() => setShowLogin(true)}
              className="hover:bg-[#219653] bg-white border-2 transition border-[#219653] text-[#219653] hover:text-white font-bold py-1 px-8 rounded mx-2"
            >
              Login
            </button> */}
            {/* <button
              onClick={() => setShowRegister(true)}
              className="hover:bg-[#219653] bg-white border-2 transition border-[#219653] text-[#219653] hover:text-white font-bold py-1 px-8 rounded mx-4"
            >
              Sign Up
            </button> */}
          </div>
        ) : (
          <div
            onMouseOver={(prev) => setShow(true)}
            onMouseLeave={(prev) => setShow(false)}
            className="my-auto"
          >
            <div className="relative z-40 flex items-center px-4 py-1 my-auto mr-5 text-gray-700 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
              <img
                className="w-8 h-8 mr-3 rounded-full"
                src={userIcon}
                alt="profile_pic"
              />
              <p className="text-lg font-semibold">
                {"Hi, " + authState.user.data.first_name}
              </p>
            </div>
            {show && (
              <div
                onMouseOver={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                className="absolute z-40 p-1 bg-white border-2 rounded-lg border-slate-400"
              >
                <p
                  onClick={() => navigate("/update-profile")}
                  className="px-5 py-2 text-gray-600 bg-white border-b border-solid cursor-pointer border-slate-400 hover:bg-gray-200"
                >
                  Profile
                </p>
                <p
                  onClick={() => {
                    Cookies.remove("access-token");
                    Cookies.remove("refresh-token");
                    Cookies.remove("uuid");
                    dispatch(getLogoutAction());
                    navigate("/login");
                  }}
                  className="px-5 py-2 text-gray-600 bg-white border-solid cursor-pointer border-slate-400 hover:bg-gray-200"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      {showLogin ? (
        <div className="">
          <Login onClick={setShowLogin} />
        </div>
      ) : (
        <div></div>
      )}
      {showRegister ? <Register onClick={setShowRegister} /> : <div></div>}
    </div>
  );
};

export default Header;