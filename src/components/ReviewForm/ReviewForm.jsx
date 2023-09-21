import React from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Rate,
  Upload,
  message,
  AutoComplete,
} from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { fetchCreateReview } from "../../store/ReviewsSlice/ReviewsSlice";
import instance from "../../axios";
import { AlertMessage } from "../AlertMessage/AlertMessage";
import { fetchGetAllProducts } from "../../store/ProductSlice/ProductSlice";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";
import RollBackButton from "../RollBackButton/RollBackButton";
import Spinner from "../Spinner/Spinner";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;
const { Dragger } = Upload;
//
const ReviewForm = () => {
  const { allProducts, allProductsLoading } = useSelector(
    (state) => state.productsSlice
  );
  const { allUnicTags } = useSelector((state) => state.reviewsSlice);
  const [inputMessage, setInputMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isInputValid, setIsInputValid] = React.useState(true);
  console.log(allProducts);
  const { t } = useTranslation();
  const [images, setUploadedImages] = React.useState([]);
  console.log(images, "images");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pathname = useLocation().pathname;
  const paramsId = useParams().id;

  const onFinish = async (values) => {
    try {
      console.log(values);
      values.content = inputMessage;
      values.images = images;
      if (product) {
        values.productId = product?._id;
      }
      pathname?.slice(0, -32) === "/admin"
        ? (values.createByAdminId = paramsId)
        : (values.createByAdminId = 0);
      console.log(values);
      const res = await dispatch(fetchCreateReview(values));
      console.log(res, "res");

      if (res.error) {
        return AlertMessage("error", res.payload.message || res.payload);
      }

      AlertMessage("success", "Review is created");
      setTimeout(() => {
        navigate("/reviews");
      }, 850);
    } catch (error) {
      return console.error("error while fetchCreateReview:", error);
    }
  };

  console.log(pathname, "pathname", paramsId, "paramsId");
  console.log(pathname.slice(0, -24), "-24");
  // /reviews/create
  // /admin/64e6538a72d53ec57fcd84c5/create
  //  /reviews/createbyproduct/64ecfb9eb95ca780bde596da
  React.useEffect(() => {
    const parameters = "";
    dispatch(fetchGetAllProducts({ parameters }));
  }, []);

  const product = allProducts.filter((item) => {
    return item?._id === paramsId;
  })[0];
  console.log(product?.title, product?._id, "prodeuct title, group");
  if (allProductsLoading === "loading") {
    return <Spinner />;
  }
  const categories = [
    { title: "Books", value: "books" },
    { title: "Games", value: "games" },
    { title: "Movies", value: "movies" },
    { title: "Music", value: "music" },
  ];
  const props = {
    name: "files",
    multiple: true,
    maxCount: 4,
    beforeUpload: (file) => {
      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        message.error("File size exceeds the limit (5MB).");
        return false;
      }
      const allowedTypes = ["image/jpeg", "image/png"];

      if (!allowedTypes.includes(file.type)) {
        message.error("Only JPEG, PNG files are allowed.");
        return false; // Отмена загрузки
      }

      return true;
    },
    action: `${instance.defaults.baseURL}/api/reviews/upload`,
    onChange(info) {
      const { status, response } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        const flat = info.fileList
          .map((item) => {
            return item.response;
          })

          .flatMap((item) => item)
          .filter((item) => item !== undefined);

        setUploadedImages(flat);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const handleValidate = (value) => {
    if (!value) {
      setIsInputValid(false);
      setErrorMessage("Please add your review!");
    } else {
      setIsInputValid(true);
      setErrorMessage("");
    }
  };

  const tagChildren = allUnicTags.map((tag) => ({ value: tag }));
  return (
    <div className="w-full max-w-screen-sm mx-auto p-4 mt-12">
      <Link to={-1} className="absolute top-14 left-2 z-50">
        <RollBackButton />
      </Link>
      <Form layout="vertical" onFinish={onFinish} className="mx-4">
        <Form.Item
          label={t("reviewTitle")}
          name="title"
          rules={[{ required: true, message: "Add title of review" }]}
        >
          <Input />
        </Form.Item>
        {pathname.slice(0, -24) !== "/reviews/createbyproduct/" ? (
          <Form.Item
            label={t("productTitle")}
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
            label={t("productTitle")}
            name="productId"
            // rules={[{ required: true, message: "Add name of product" }]}
          >
            <Input
              // value={product._id}
              disabled
              defaultValue={`${product?.title}[${product?.group}]`}
            />
          </Form.Item>
        )}
        <Form.Item
          label={t("group")}
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

        {/*  */}
        <label htmlFor="content">
          <span className="text-red-500 font-bold">* </span>Content
        </label>
        <AutoComplete
          value={inputMessage}
          options={tagChildren}
          onSearch={(value) => setInputMessage(value)}
          onSelect={(value) => setInputMessage((prev) => prev + value)}
          onPressEnter={onFinish}
          size="large"
          className={`w-full ${isInputValid ? "" : "border-red-500"}`}
          bordered={true}
          onBlur={() => handleValidate(inputMessage)}
        >
          <TextArea
            rows={4}
            label={t("content")}
            name="content"
            rules={[{ required: true, message: "Add your review" }]}
          />
        </AutoComplete>
        {!isInputValid && <div className="text-red-500">{errorMessage}</div>}
        {/*  */}
        <Form.Item label={t("uploadYourImages")} name="files" className="mt-4">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag images(.jpg and .png only!) to this area to upload
            </p>
          </Dragger>
        </Form.Item>

        <Form.Item label={t("rating")} name="rating">
          <Rate count={10} />
        </Form.Item>
        <Form.Item>
          <Button type="default" htmlType="submit">
            {t("toPublishReview")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ReviewForm;
