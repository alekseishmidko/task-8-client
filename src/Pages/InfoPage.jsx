import React from "react";
import Header from "../components/Header/Header";
import Layout from "antd/es/layout/layout";
import { Card, Avatar, Divider, Space, Tooltip } from "antd";
import { PhoneOutlined, MailOutlined, GithubOutlined } from "@ant-design/icons";

import { useTranslation } from "react-i18next";
const { Meta } = Card;
const InfoPage = () => {
  const { t } = useTranslation();
  return (
    <Layout className=" min-h-screen">
      <Header />

      <div className="flex justify-center mt-20 h-screen">
        <div className="w-full sm:w-1/2">
          <div className="flex justify-center">
            <h2 className="my-2 font-semibold text-lg ">{t("information")} </h2>
          </div>

          <Card hoverable>
            <Avatar
              size={128}
              src="https://avatars.githubusercontent.com/u/118507792?s=400&v=4"
              className="mx-auto mt-2 mb-4"
            />
            <Meta title={t("shmidko")} description={t("bio")} />
            <Divider />
            <Space direction="vertical">
              <Tooltip title="Github">
                <GithubOutlined />
                <a
                  className="ml-2 font-semibold"
                  href="https://github.com/alekseishmidko"
                >
                  Github
                </a>
              </Tooltip>
              <Tooltip title="Phone">
                <PhoneOutlined />
                <span className="ml-2 font-semibold">+79001232987</span>
              </Tooltip>
              <Tooltip title="Email">
                <MailOutlined />
                <a
                  href="mailto:alexeishmidko@gmail.com"
                  className="ml-2 font-semibold"
                >
                  alexeishmidko@gmail.com
                </a>
              </Tooltip>
            </Space>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default InfoPage;
