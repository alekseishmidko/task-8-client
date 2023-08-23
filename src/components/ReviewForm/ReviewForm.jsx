import React from "react";
import { Form, Input, Select, Button, Rate, Upload } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { message } from "antd";
const { TextArea } = Input;

const ReviewForm = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  const { Dragger } = Upload;

  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const categories = ["Books", "Music", "Cinema", "Games"];
  return (
    <Form layout="vertical" onFinish={onFinish} className="mx-4">
      <Form.Item
        label="Review title"
        name="reviewTitle"
        rules={[{ required: true, message: "Add title of review" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Product name"
        name="productName"
        rules={[{ required: true, message: "Add name of product" }]}
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
            <Select.Option key={index} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Tags" name="tags">
        {/* добавить теги, которые уже есть на сайте */}

        <Select mode="tags" placeholder="Add tags" />
      </Form.Item>
      <Form.Item
        label="Review text"
        name="reviewText"
        rules={[{ required: true, message: "Add your review" }]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item label="Image" name="image">
        {/* <Upload maxCount={4} beforeUpload={() => false}>
          <Button icon={<UploadOutlined />}>Download</Button>
        </Upload> */}

        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </Dragger>
      </Form.Item>

      <Form.Item label="Rating" name="rating">
        <Rate allowHalf />
      </Form.Item>
      <Form.Item>
        <Button type="default" htmlType="submit">
          To publish review
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ReviewForm;
