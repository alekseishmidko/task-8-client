import { Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import LoginPage from "./Pages/LoginPage";
// import Header from "./components/Header/Header";
import ReviewForm from "./components/ReviewForm/ReviewForm";
// import TabContent from "./components/TabContent/TabContent";
import RegisterPage from "./Pages/RegisterPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* <ReviewForm /> */}
      </Routes>
    </>
  );
}

export default App;
