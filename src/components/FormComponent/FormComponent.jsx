import React from "react";
import { Form, Input, Select, Rate, Button } from "antd";
import EditorComponent from "./EditorComponent"; // Подставьте путь к компоненту редактора EditorJS

const { Option } = Select;

const CreatePostForm = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter a title" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Group"
        name="group"
        rules={[{ required: true, message: "Please select a group" }]}
      >
        <Select>
          <Option value="books">Books</Option>
          <Option value="music">Music</Option>
          <Option value="movie">Movie</Option>
          <Option value="games">Games</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: "Please enter content" }]}
      >
        <EditorComponent />
      </Form.Item>

      <Form.Item
        label="Images"
        name="images"
        valuePropName="fileList"
        getValueFromEvent={(e) => e.fileList}
      >
        {/* <Upload
          listType="picture-card"
          // Customize your Upload component here
        >
          <Button icon={<UploadOutlined />}>Upload Images</Button>
        </Upload> */}
      </Form.Item>

      <Form.Item
        label="Rating"
        name="rating"
        rules={[{ required: true, message: "Please select a rating" }]}
      >
        <Rate allowHalf />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Post
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreatePostForm;
