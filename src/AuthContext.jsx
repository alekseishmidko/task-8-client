import React, { createContext, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrent, fetchLogin } from "./store/AccountSlice/AccountSlice";
import { logout } from "./store/AccountSlice/AccountSlice";
import { StorageKeys } from "./consts/storageKeys";
import LoginPage from "./Pages/LoginPage";
import Spinner from "./components/Spinner/Spinner";
export function AuthProvider({ children }) {
  const { data, authLoading } = useSelector((state) => state.accountSlice);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (localStorage.getItem(StorageKeys.TOKEN)) {
      dispatch(fetchCurrent());
    }
  }, [dispatch]);
  if (authLoading === "loading") {
    return <Spinner />;
  }
  if (!data) {
    return <LoginPage />;
  }

  return children;
}
export function useAuth() {
  const { data } = useSelector((state) => state.accountSlice);
  const dispatch = useDispatch();
  const login = ({ email, password }) => {
    dispatch(fetchLogin({ email, password }));
  };
  const logOut = () => {
    dispatch(logout());
  };

  return { login, logOut, authUser: data };
}
