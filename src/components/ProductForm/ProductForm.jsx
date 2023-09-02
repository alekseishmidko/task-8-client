import React from "react";
import { Input, Form, Select } from "antd";

const { Option } = Select;
const arr = ["books", "music", "movies", "games"];
const ProductForm = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div>
      <div className="ml-4 flex-grow">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>

          <Form.Item label="Group" name="group">
            <Select>
              {arr.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Content" name="content">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ProductForm;
