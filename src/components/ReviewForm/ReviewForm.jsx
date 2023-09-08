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
import { useNavigate, Link } from "react-router-dom";
import RollBackButton from "../RollBackButton/RollBackButton";
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
      const res = await dispatch(fetchCreateReview(values));
      AlertMessage("success", "Review is created");
      setTimeout(() => {
        navigate("/reviews");
      }, 850);
      if (res.error) {
        return AlertMessage("error", res.payload.message);
      }
    } catch (error) {
      return console.error("error while fetchCreateReview:", error);
    }
  };

  React.useEffect(() => {
    const parameters = "";
    dispatch(fetchGetAllProducts({ parameters }));
  }, []);
  const { allProducts } = useSelector((state) => state.productsSlice);

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
          <Rate allowHalf count={10} />
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
// const props = {
//   name: "files",
//   multiple: true,
//   maxCount: 4,
//   beforeUpload: (file) => {
//     const maxSize = 2 * 1024 * 1024;
//     if (file.size > maxSize) {
//       message.error("File size exceeds the limit (5MB).");
//       return false;
//     }
//     const allowedTypes = ["image/jpeg", "image/png"];

//     if (!allowedTypes.includes(file.type)) {
//       message.error("Only JPEG, PNG files are allowed.");
//       return false; // Отмена загрузки
//     }

//     return true;
//   },
//   action: `${instance.defaults.baseURL}/api/reviews/upload`,
//   onChange(info) {
//     const { status, response } = info.file;
//     if (status !== "uploading") {
//       console.log(info.file, info.fileList);
//     }
//     if (status === "done") {
//       message.success(`${info.file.name} file uploaded successfully.`);
//       const flat = info.fileList
//         .map((item) => {
//           return item.response;
//         })
//         .flatMap((item) => item);
//       setUploadedImages(flat);
//     } else if (status === "error") {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
//   onDrop(e) {
//     console.log("Dropped files", e.dataTransfer.files);
//   },
// };
