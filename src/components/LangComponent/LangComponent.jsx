import React from "react";
import { useTranslation } from "react-i18next";
import { Avatar } from "antd";
const LangComponent = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = React.useState(
    localStorage.getItem("selectedLanguage") || "en"
  );
  React.useEffect(() => {
    localStorage.setItem("selectedLanguage", selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage]);

  const handleLang = () => {
    setSelectedLanguage(selectedLanguage === "ru" ? "en" : "ru");
  };
  return (
    <div className=" cursor-pointer flex items-center" onClick={handleLang}>
      <Avatar size={27} className="px-2">
        <span>{selectedLanguage.toUpperCase()}</span>
      </Avatar>
    </div>
  );
};

export default LangComponent;
