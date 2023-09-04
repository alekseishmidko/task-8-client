import React from "react";
import { Button, Menu } from "antd";
import { fetchGetAllProducts } from "../../store/ProductSlice/ProductSlice";
import { PlusOutlined } from "@ant-design/icons";
import { arr } from "./menuBarProps";
import { useDispatch } from "react-redux";
const MenuBarProduct = () => {
  const dispatch = useDispatch();
  const [menuOptions, setMenuOptions] = React.useState({
    title: "All",
    value: "",
  });

  React.useEffect(() => {
    const parameters = menuOptions.value;
    dispatch(fetchGetAllProducts({ parameters }));
  }, []);

  const handleMenuOptions = (parameters, item) => {
    setMenuOptions(item);
    console.log(parameters, item);
    dispatch(fetchGetAllProducts({ parameters }));
  };
  return (
    <div>
      <Menu mode="horizontal">
        {arr.map((item, index) => (
          <Menu.Item
            key={index}
            onClick={() => {
              handleMenuOptions(item.value, item);
            }}
            defaultValue={arr[0].title}
          >
            {item.title}
          </Menu.Item>
        ))}
        <>
          <Button
            onClick={() => {}}
            type="text"
            icon={<PlusOutlined />}
            className="absolute  right-0 mt-2 mr-1 pb-1"
          ></Button>
        </>
      </Menu>
    </div>
  );
};

export default MenuBarProduct;
{
  /* <Modal
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
          </Modal> */
}
