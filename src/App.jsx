import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { useSelector } from "react-redux";
import { ConfigProvider, theme } from "antd";
import AccountPage from "./Pages/AccountPage";
import OneReviewPage from "./Pages/OneReviewPage";
import AdminPage from "./Pages/AdminPage";
import ReviewsByUserPage from "./Pages/ReviewsByUserPage";
import ProductPage from "./Pages/ProductPage";
import ReviewPage from "./Pages/ReviewPage";
import CreateReviewPage from "./Pages/CreateReviewPage";
import CreateProductPage from "./Pages/CreateProductPage";
import NotFoundPage from "./Pages/NotFoundPage";
import OneProductPage from "./Pages/OneProductPage";
import { AuthProvider } from "./AuthContext";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import SearchPage from "./Pages/SearchPage";
function App() {
  const { themeMode } = useSelector((state) => state.themeSlice);
  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: themeMode ? theme.defaultAlgorithm : theme.darkAlgorithm,
        }}
      >
        <I18nextProvider i18n={i18n}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
              path="/account"
              Component={() => (
                <AuthProvider>
                  <AccountPage />
                </AuthProvider>
              )}
            />
            <Route path="/account/:id" element={<OneReviewPage />} />

            <Route
              path="/admin"
              Component={() => (
                <AuthProvider>
                  <AdminPage />
                </AuthProvider>
              )}
            />

            <Route
              path="/admin/:id"
              Component={() => (
                <AuthProvider>
                  <ReviewsByUserPage />
                </AuthProvider>
              )}
            />
            <Route
              path="/admin/:id/record/:id"
              Component={() => (
                <AuthProvider>
                  <OneReviewPage />
                </AuthProvider>
              )}
            />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/products/:id" element={<OneProductPage />} />
            <Route path="/reviews" element={<ReviewPage />} />

            <Route path="/reviews/:id" Component={() => <OneReviewPage />} />
            <Route
              path="/reviews/create"
              Component={() => (
                <AuthProvider>
                  <CreateReviewPage />
                </AuthProvider>
              )}
            />
            <Route
              path="/reviews/createbyproduct/:id"
              Component={() => (
                <AuthProvider>
                  <CreateReviewPage />
                </AuthProvider>
              )}
            />
            <Route
              path="admin/:id/create"
              Component={() => (
                <AuthProvider>
                  <CreateReviewPage />
                </AuthProvider>
              )}
            />
            <Route
              path="/products/create"
              Component={() => (
                <AuthProvider>
                  <CreateProductPage />
                </AuthProvider>
              )}
            />

            <Route path="/search" element={<SearchPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </I18nextProvider>
      </ConfigProvider>
    </>
  );
}

export default App;
// оптимизировать бек, раскидать переменные
// сделать сайт адаптивнее
// логика лайков
// гугл, гитхаб,
// автодополнение набора тегов при редактировании обзора

// стили и адаптив, страница обзора сделать по новой. поставить логику постановки лайка
// Админка. блокировать юзера?
// сервер обернуть в trycatch , обернуть в handleError
// поиск по тегам(опционально)

//  ??? как хранить тему ???
//

//  Review оценка от автора = (0-10), каждый авторизованный юзер может поставить рейтинг (0-5 звезд) на  обзор
//  Product каждый авторизованный юзер может поставить рейтинг (0-5 звезд) на  произведение / сделать контроллер на основе likes
//  Likes каждый авторизованный пользователь может поставить лайк обзору (не более 1 лайка от юзера на обзор)  +++

//
// ??? вопросы по рейтингам у продуктов или обзоров. как сделать так чтобы при изменении рейтинга через handleRatingReview результат
// пересчитывался в средний рейтинг и отображался  в базе ??? +++
// ??? вопрос как не ломать приложение при перезагрузке страницы, получается некоторые данные хранить в ЛС ??? +++
//  ??? вопрос по лайкам как сделать так чтобы сервер не падал при постановке лайка от разных пользователей ??? +++
