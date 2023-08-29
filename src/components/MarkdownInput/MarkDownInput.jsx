import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Form, Input, Select, Rate, Button } from "antd";

const { Option } = Select;
const { TextArea } = Input;

const MarkdownForm = () => {
  const [markdownContent, setMarkdownContent] = useState("");
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Form values:", values);
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item label="Title" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Group" name="group" rules={[{ required: true }]}>
        <Select>
          <Option value="books">Books</Option>
          <Option value="music">Music</Option>
          <Option value="movie">Movie</Option>
          <Option value="games">Games</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Rating" name="rating" rules={[{ required: true }]}>
        <Rate allowHalf />
      </Form.Item>

      <Form.Item label="Content" name="content" rules={[{ required: true }]}>
        <TextArea
          autoSize={{ minRows: 6 }}
          onChange={(e) => setMarkdownContent(e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Content Preview">
        <ReactMarkdown children={markdownContent} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MarkdownForm;
