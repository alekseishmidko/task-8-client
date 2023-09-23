import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider
        redirectUri="http://localhost:3000/"
        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
