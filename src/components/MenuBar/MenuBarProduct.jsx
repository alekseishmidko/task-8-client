import React from "react";
import { Button, Menu } from "antd";
import { fetchGetAllProducts } from "../../store/ProductSlice/ProductSlice";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const MenuBarProduct = () => {
  const { t } = useTranslation();
  const { data } = useSelector((state) => state.accountSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOptions, setMenuOptions] = React.useState({
    title: "All",
    value: "",
  });
  const arr = [
    { title: t("all"), value: "" },
    { title: t("books"), value: "books" },
    { title: t("games"), value: "games" },
    { title: t("movies"), value: "movies" },
    { title: t("music"), value: "music" },
  ];
  React.useEffect(() => {
    const parameters = menuOptions.value;
    dispatch(fetchGetAllProducts({ parameters }));
  }, []);

  const handleMenuOptions = (parameters, item) => {
    setMenuOptions(item);
    // console.log(parameters, item);
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
          {data !== null && (
            <Button
              onClick={() => {
                navigate("/products/create");
              }}
              type="text"
              icon={<PlusOutlined />}
              className="absolute  right-0 mt-2 mr-1 pb-1"
            ></Button>
          )}
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
