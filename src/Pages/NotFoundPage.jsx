import React from "react";
import { Result, Button, Layout } from "antd";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import { useTranslation } from "react-i18next";
const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <Header />
      <Result
        className="min-h-screen"
        status="404"
        title="404"
        subTitle={t("subtitle")}
        extra={
          <Link to="/">
            <Button type="default">{t("backToHome")}</Button>
          </Link>
        }
      />
    </Layout>
  );
};

export default NotFoundPage;
