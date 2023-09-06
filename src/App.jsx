import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { useSelector } from "react-redux";
import { ConfigProvider, theme } from "antd";
import AccountPage from "./Pages/AccountPage";
import ReviewForm from "./components/ReviewForm/ReviewForm";
import OneReviewPage from "./Pages/OneReviewPage";
import AdminPage from "./Pages/AdminPage";
import ReviewsByUserPage from "./Pages/ReviewsByUserPage";
import ProductPage from "./Pages/ProductPage";
import ReviewPage from "./Pages/ReviewPage";
// import CreatePostForm from "./components/FormComponent/FormComponent";
import { AuthProvider } from "./AuthContext";
import CreateReviewPage from "./Pages/CreateReviewPage";
import CreateProductPage from "./Pages/CreateProductPage";
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
          <Route path="/products" element={<ProductPage />} />
          <Route path="/reviews" element={<ReviewPage />} />

          <Route
            path="/reviews/create"
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

          {/* <Route path="/reviewForm" element={<ReviewForm />} /> */}
        </Routes>
      </ConfigProvider>
    </>
  );
}

export default App;
// комментарии , гугл, фейсбук,  перевод сайта,
// логика поиска
// написать сокет (comments,)
// автодополнение набора тегов при редактировании обзора
// галерея для просмотра фото (скорее всего через модалку)
// оптимизировать бек, раскидать переменные

// сделать страницу с одним обзором или продуктом ,
// создал обзор или продукт , возврат на страницу откуда пришел , добавить кноку назад и стилей
// поиск по тегам
//  сделвть страницу 404

// Админка. возможность просматривать обзоры пользователя, редактировать, удалять, создавать от имени юзера  блокировать юзера?
// (наполнить   юзера обзорами и доделать функционла)

//
//  ??? вопрос по лайкам как сделать так чтобы сервер не падал при постановке лайка от разных пользователей ???

//

//  Review оценка от автора = (0-10), каждый авторизованный юзер может поставить рейтинг (0-5 звезд) на  обзор
//  Product каждый авторизованный юзер может поставить рейтинг (0-5 звезд) на  произведение / сделать контроллер на основе likes
//  Likes каждый авторизованный пользователь может поставить лайк обзору (не более 1 лайка от юзера на обзор)  +++

//
// вопросы по рейтингам у продуктов или обзоров. как сделать так чтобы при изменении рейтинга через handleRatingReview результат
// пересчитывался в средний рейтинг и отображался  в базе+++
//  ??? вопрос как не ломать приложение при перезагрузке страницы, получается некоторые данные хранить в ЛС???+++
