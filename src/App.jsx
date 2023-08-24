import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import LoginPage from "./Pages/LoginPage";
// import Header from "./components/Header/Header";
// import ReviewForm from "./components/ReviewForm/ReviewForm";
// import TabContent from "./components/TabContent/TabContent";
import RegisterPage from "./Pages/RegisterPage";
import { useSelector } from "react-redux";
import { ConfigProvider, theme } from "antd";
import AccountPage from "./Pages/AccountPage";
function App() {
  const { themeMode } = useSelector((state) => state.themeSlice);
  console.log(themeMode);
  return (
    <>
      <ConfigProvider
        theme={{
          algorithm:
            themeMode === true ? theme.defaultAlgorithm : theme.darkAlgorithm,
        }}
      >
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </ConfigProvider>
    </>
  );
}

export default App;
// комментарии , гугл, фейсбук,  перевод сайта,  как и гдле хранить картинки
// прорисовать структуру связей, написать сущности и хотя бы простой роутинг для них
//  логика поиска
// написать сокет
//
