import React from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Rate,
  Upload,
  Layout,
  Menu,
  Modal,
} from "antd";
import { PlusOutlined, InboxOutlined } from "@ant-design/icons";
import CreatePostForm from "../FormComponent/FormComponent";
import ProductForm from "../ProductForm/ProductForm";
import { message } from "antd";
const { Option } = Select;

const { TextArea } = Input;
const { Dragger } = Upload;
const MenuBar = () => {
  const [menuOptions, setMenuOptions] = React.useState("");
  const arr = [
    { title: "All", value: "" },
    { title: "Books", value: "books" },
    { title: "Games", value: "games" },
    { title: "Movies", value: "movies" },
    { title: "Music", value: "music" },
  ];
  // modal
  const [open, setOpen] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const [form] = Form.useForm();
  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log(values);
    });
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = (values) => {
    console.log(values);
  };
  const categories = ["books", "music", "movies", "games"];
  return (
    <div>
      <Menu mode="horizontal">
        {arr.map((item, index) => (
          <Menu.Item
            key={index}
            onClick={() => setMenuOptions(item.value)}
            defaultValue={menuOptions}
          >
            {item.title}
          </Menu.Item>
        ))}
        <>
          <Button
            onClick={showModal}
            type="text"
            icon={<PlusOutlined />}
            className="absolute  right-0 mt-2 mr-1 pb-1"
          ></Button>
          <Modal
            okType="default"
            title="Create a new Product"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item label="Title" name="title">
                <Input />
              </Form.Item>

              <Form.Item label="Group" name="group">
                <Select>
                  {categories.map((item, index) => (
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
          </Modal>
        </>
      </Menu>
    </div>
  );
};

export default MenuBar;
