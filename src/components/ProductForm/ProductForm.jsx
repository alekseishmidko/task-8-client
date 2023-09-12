import React from "react";
import { Form, Input, Select, Button, Rate, Upload, Layout } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { categories, props } from "./propsForProductsForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateProduct } from "../../store/ProductSlice/ProductSlice";
import { useNavigate } from "react-router-dom";
import { AlertMessage } from "../AlertMessage/AlertMessage";
import RollBackButton from "../RollBackButton/RollBackButton";
import { Link } from "react-router-dom";
const { Dragger } = Upload;
import { useTranslation } from "react-i18next";
//
const ProductForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [images, setUploadedImages] = React.useState([]);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      values.images = images;
      console.log("Form values:", values);
      const res = await dispatch(fetchCreateProduct(values));
      AlertMessage("success", "Product is created");
      setTimeout(() => {
        navigate("/products");
      }, 850);

      if (res.error) {
        return AlertMessage("error", res.payload.message);
      }
    } catch (error) {
      return console.error("error while fetchCreateProduct:", error);
    }
  };

  return (
    <div className="w-full max-w-screen-sm mx-auto p-6  min-h-screen">
      <Link to={-1} className="absolute top-16 left-2 z-50">
        <RollBackButton />
      </Link>
      <Form layout="vertical" onFinish={onFinish} className="mx-4">
        <Form.Item
          label={t("productTitle")}
          name="title"
          rules={[{ required: true, message: "Add title of review" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t("group")}
          name="group"
          rules={[{ required: true, message: "Choise your group" }]}
        >
          <Select>
            {categories.map((item, index) => (
              <Select.Option key={index} value={item.value}>
                {item.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label={t("uploadYourImages")} name="files">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag images to this area to upload
            </p>
          </Dragger>
        </Form.Item>
        <Form.Item>
          <Button type="default" htmlType="submit">
            {t("toPublishProduct")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductForm;
