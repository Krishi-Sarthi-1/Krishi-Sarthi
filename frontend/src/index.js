// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import SupportAdmin from './components/ChatSupport/SupportAdmin/index';

// const path = window.location.pathname

// ReactDOM.render(
//   <React.StrictMode>
//     { path.indexOf('/support') === -1 ? <App /> : <SupportAdmin /> }
//   </React.StrictMode>,
//   document.getElementById('root')
// );
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from './context/auth';
import { SearchProvider } from './context/search';
import 'antd/dist/reset.css';
import { CartProvider } from './context/cart';

ReactDOM.render(
  <AuthProvider>
  <SearchProvider>
    <CartProvider>
  <CookiesProvider>
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
  </CookiesProvider>
  </CartProvider>
    </SearchProvider>
  </AuthProvider>,
 
  document.getElementById("root")
);
