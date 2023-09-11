import React from "react";
import { Form, Input, Select, Button, Rate, Upload, Layout } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { message } from "antd";
import { categories, props } from "./propsForReviewForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateReview } from "../../store/ReviewsSlice/ReviewsSlice";
import instance from "../../axios";
import { AlertMessage } from "../AlertMessage/AlertMessage";
import { fetchGetAllProducts } from "../../store/ProductSlice/ProductSlice";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";
import RollBackButton from "../RollBackButton/RollBackButton";
import Spinner from "../Spinner/Spinner";

const { TextArea } = Input;
const { Dragger } = Upload;
//
const ReviewForm = () => {
  const [images, setUploadedImages] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      values.images = images;
      pathname.slice(0, -32) === "/admin"
        ? values.productId
        : (values.productId = paramsId);

      //  (values.productId = paramsId);
      pathname.slice(0, -32) === "/admin"
        ? (values.createByAdminId = paramsId)
        : (values.createByAdminId = 0);
      console.log(values);
      const res = await dispatch(fetchCreateReview(values));
      console.log(res, "res");
      // setTimeout(() => {
      //   navigate("/reviews");
      // }, 850);
      if (res.error) {
        return AlertMessage("error", res.payload.message);
      }
      AlertMessage("success", "Review is created");
    } catch (error) {
      return console.error("error while fetchCreateReview:", error);
    }
  };
  const pathname = useLocation().pathname;
  const paramsId = useParams().id;
  console.log(pathname, "pathname", paramsId, "paramsId");
  console.log(pathname.slice(0, -32));
  // /reviews/create
  // /admin/64e6538a72d53ec57fcd84c5/create
  //  /reviews/createbyproduct/64ecfb9eb95ca780bde596da
  React.useEffect(() => {
    const parameters = "";
    dispatch(fetchGetAllProducts({ parameters }));
  }, []);
  const { allProducts, allProductsLoading } = useSelector(
    (state) => state.productsSlice
  );
  const product =
    allProducts.filter((item) => {
      return item._id === paramsId;
    })[0] || {};
  console.log(product.title, product.group, "prodeuct title, group");
  if (allProductsLoading === "loading") {
    return <Spinner />;
  }
  return (
    <div className="w-full max-w-screen-sm mx-auto p-4">
      <Link to={-1} className="absolute top-16 left-2 z-50">
        <RollBackButton />
      </Link>
      <Form layout="vertical" onFinish={onFinish} className="mx-4">
        <Form.Item
          label="Review title"
          name="title"
          rules={[{ required: true, message: "Add title of review" }]}
        >
          <Input />
        </Form.Item>
        {pathname.slice(0, -24) !== "/reviews/createbyproduct/" ? (
          <Form.Item
            label="Product name"
            name="productId"
            rules={[{ required: true, message: "Add name of product" }]}
          >
            <Select>
              {allProducts.map((item, index) => (
                <Select.Option key={index} value={item._id}>
                  {item.title} [{item.group}]
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        ) : (
          <Form.Item
            label="Product name"
            name="productId"
            // rules={[{ required: true, message: "Add name of product" }]}
          >
            <Input
              value={product._id}
              disabled
              defaultValue={`${product.title}[${product.group}]`}
            />
          </Form.Item>
        )}
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

        <Form.Item
          label="Review text"
          name="content"
          rules={[{ required: true, message: "Add your review" }]}
        >
          <TextArea rows={4} />
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

        <Form.Item label="Rating" name="rating">
          <Rate count={10} />
        </Form.Item>
        <Form.Item>
          <Button type="default" htmlType="submit">
            To publish review
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ReviewForm;
