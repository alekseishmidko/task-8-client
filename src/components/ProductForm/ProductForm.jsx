import React from "react";
import { Form, Input, Select, Button, Rate, Upload, Layout } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { message } from "antd";
import { categories, props } from "./propsForProductsForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateProduct } from "../../store/ProductSlice/ProductSlice";
import instance from "../../axios";

// import { fetchGetAllProducts } from "../../store/ProductSlice/ProductSlice";
const { TextArea } = Input;
const { Dragger } = Upload;
//
const ProductForm = () => {
  const [images, setUploadedImages] = React.useState([]);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    values.images = images;
    console.log("Form values:", values);
    dispatch(fetchCreateProduct(values));
  };

  return (
    <div className="w-full max-w-screen-sm mx-auto p-4">
      <Form layout="vertical" onFinish={onFinish} className="mx-4">
        <Form.Item
          label="Product title"
          name="title"
          rules={[{ required: true, message: "Add title of review" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Group"
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

        <Form.Item label="Upload your images" name="files">
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
            To publish product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductForm;
