import "./App.css";
import Home from "./pages/Home";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "./api/profileAPI";
import {
  getLoginAction,
  getSaveProfileAction,
  getSaveTokenAction
} from "./redux/actions";
// import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route, Navigate } from "react-router-dom";
import SupportAdmin from "./components/ChatSupport/SupportAdmin/index";
import SupportEngine from "./components/ChatSupport/SupportEngine/index";
import Cookies from "js-cookie";

//Pages
// import Register from "./pages/Register";
// import Login from "./pages/Login";
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Help from "./pages/Help";
import Header from "./components/header/Header";
import FAQ from "./pages/FAQ";
import PreHeader from "./components/preheader/PreHeader";
import Footer from "./components/footer/Footer";
// import Dashboard from "./pages/dashboard/Dashboard ";
import AddProduct from "./pages/addProduct/AddProduct";
import VerifyOTP from "./components/verify-otp";

import PartnerDispute from "./pages/PartnerDispute";
import CancellationForm from "./components/cancellationForm";
import ContactUs from "./pages/ContactUs/ContactUs";
import Chat from "./pages/chat/Chat";
import BookingRequest from "./pages/bookingRequest/BookingRequest";
import CancellationPolicy from "./pages/cancellationPage/CancellationPolicy";
import UpdateProfile from "./pages/updateProfile/index";
import BookingHistory from "./pages/bookingHistory";
import Feedback from "./pages/feedback/Feedback";
import HomePage from "./pages/HomePage";

import Policy from "./pages/Policy";
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/Admin';
import Admin from './pages/Admin/Admin';
import CreateProduct from './pages/Admin/CreateProduct';
import CreateCategory from './pages/Admin/CreateCategory';
import Users from './pages/Admin/Users';
import Profile from './pages/user/Profile';
import Order from './pages/user/Order';
import Products from './pages/Admin/Product';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
import AdminOrder from './pages/Admin/AdminOrder';
import About from "./pages/About";
import Contact from "./pages/Contact";

import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";
import EquipmentReport from "./pages/EquipmentReport";

export default function App() {
  const authState = useSelector((state) => state.authReducer);
  const tokenState = useSelector((state) => state.tokenReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const access = Cookies.get("access-token");
    const refresh = Cookies.get("refresh-token");
    dispatch(
      getSaveTokenAction({
        accessToken: access,
        refreshToken: refresh
      })
    );
  }, [tokenState.token.accessToken]);

  useEffect(async () => {
    const access = Cookies.get("access-token");
    if (access) {
      const uuid = Cookies.get("uuid");
      dispatch(getLoginAction());
      const data = await getProfile({
        uuid: uuid,
        accessToken: access
      });
      console.log(data);
      dispatch(getSaveProfileAction(data));
    }
  }, []);

  return (
    <>
      {/*
      <p id="transcript">Transcript: {transcript}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button> */}
      <PreHeader />
      {/* <Header />  */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="verify-otp" element={<VerifyOTP />} />
        <Route path="help" element={<Help />} />
        {/* <Route path="Dashboard" element={<Dashboard />} /> */}
        <Route path="addProduct" element={<AddProduct />} />
        <Route path="update-profile" element={<UpdateProfile />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="bookingRequest/:id" element={<BookingRequest />} />
        <Route path="chat" element={<Chat />} />
        <Route path="booking-history" element={<BookingHistory />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="partner-dispute" element={<PartnerDispute />} />
        <Route path="support" element={<SupportAdmin />} />
        <Route path="policy" element={<CancellationPolicy />} />
        <Route path="equipment-report/:id" element={<EquipmentReport />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="*" element={<div>Not Found</div>} />
        <Route path="shop" element={< HomePage />} />


        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Order />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path="admin" element={<Admin />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrder />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />


      </Routes>

      <Footer />
      <SupportEngine />
    </>
  );
}
