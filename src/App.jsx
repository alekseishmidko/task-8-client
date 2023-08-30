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
import OneReview from "./components/OneReview/OneReview";
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
          <Route path="/account/:id" element={<OneReview />} />
          <Route path="/reviewForm" element={<ReviewForm />} />
          <Route path="/test" element={<MarkdownForm />} />
        </Routes>
      </ConfigProvider>
    </>
  );
}

export default App;
// комментарии , гугл, фейсбук,  перевод сайта,  как и где хранить картинки (multer?)
// логика поиска
// написать сокет
// markdown, подсказка тегов при создании обзора.

//

//  Review оценка от автора = (0-10), каждый авторизованный юзер может поставить рейтинг (0-5 звезд) на  обзор
//  Product каждый авторизованный юзер может поставить рейтинг (0-5 звезд) на  произведение / сделать контроллер на основе likes
//  Likes каждый авторизованный пользователь может поставить лайк обзору (не более 1 лайка от юзера на обзор)  +++
//

// выдать количество лайков пользователя и указать рядом с именем
// автодополнение набора тегов при редактировании обзора

// маркдовн поэкспериментровать, сделать чтобы на всех страницах подсвечивалось маркдовн разметка обзора
// Сделать страницу с произведениями , и там же создание нового обзора
// Админка . Сначала список всех пользователей с ссылкой на них
// Админка. возможность просматривать обзоры пользователя, блокировать? удалять, назначать других

// вопрос по лайкам как сделать так чтобы сервер не падал при постановке лайка от разных пользователей???
// почему при первом клике на обзор он не рендерится ???

//

// вопросы по рейтингам у продуктов или обзоров. как сделать так чтобы при изменении рейтинга через handleRatingReview результат
// пересчитывался в средний рейтинг и отображался  в базе+++
