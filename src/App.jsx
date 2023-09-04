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
          <Route path="/account/:id" element={<OneReviewPage />} />
          <Route path="/reviewForm" element={<ReviewForm />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/:id" element={<ReviewsByUserPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/reviews" element={<ReviewPage />} />

          {/* <Route path="/test" element={<MarkdownForm />} /> */}
        </Routes>
      </ConfigProvider>
    </>
  );
}

export default App;
// комментарии , гугл, фейсбук,  перевод сайта,  как и где хранить картинки (multer?)
// логика поиска
// написать сокет (comments, ratings, likes)

//

//  Review оценка от автора = (0-10), каждый авторизованный юзер может поставить рейтинг (0-5 звезд) на  обзор
//  Product каждый авторизованный юзер может поставить рейтинг (0-5 звезд) на  произведение / сделать контроллер на основе likes
//  Likes каждый авторизованный пользователь может поставить лайк обзору (не более 1 лайка от юзера на обзор)  +++
//
// ***автодополнение набора тегов при редактировании обзора

// Сделать страницу с произведениями наполнить обзорами,создание нового обзора
// сделать страницу с обзорами, cтили текста ,
// поиск по тегам
//
//

// Админка. возможность просматривать обзоры пользователя, редактировать, удалять, создавать от имени юзера  блокировать юзера?
// (наполнить   юзера обзорами и доделать функционла)

//

//
//  ??? вопрос по лайкам как сделать так чтобы сервер не падал при постановке лайка от разных пользователей???
//  ??? вопрос как не ломать приложение при перезагрузке страницы, получается некоторые данные хранить в ЛС???
//  ??? как хранить изображения в облаке???

//

//

//

//
// вопросы по рейтингам у продуктов или обзоров. как сделать так чтобы при изменении рейтинга через handleRatingReview результат
// пересчитывался в средний рейтинг и отображался  в базе+++
