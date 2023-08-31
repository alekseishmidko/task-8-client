import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import LoginPage from "./Pages/LoginPage";
import EditorComponent from "./components/ReviewEditor/ReviewEditor";
import RegisterPage from "./Pages/RegisterPage";
import { useSelector } from "react-redux";
import { ConfigProvider, theme } from "antd";
import AccountPage from "./Pages/AccountPage";
import ReviewForm from "./components/ReviewForm/ReviewForm";
import MarkdownForm from "./components/MarkdownInput/MarkDownInput";
import OneReviewPage from "./Pages/OneReviewPage";
import AdminPage from "./Pages/AdminPage";
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
          <Route path="/test" element={<MarkdownForm />} />
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

// выдать количество лайков пользователя и указать рядом с именем
// автодополнение набора тегов при редактировании обзора

// Сделать страницу с произведениями , и там же создание нового обзора
// Админка .   блокировать? удалять, назначать других
// Админка. возможность просматривать обзоры пользователя,
// продумать постановку рейтинга, сделать на сайте

// вопрос по лайкам как сделать так чтобы сервер не падал при постановке лайка от разных пользователей???

//

// вопросы по рейтингам у продуктов или обзоров. как сделать так чтобы при изменении рейтинга через handleRatingReview результат
// пересчитывался в средний рейтинг и отображался  в базе+++
