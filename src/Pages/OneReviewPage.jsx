import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {
  Layout,
  Card,
  Typography,
  Button,
  Input,
  Form,
  Select,
  Slider,
  Rate,
  AutoComplete,
} from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchGetOneReview,
  fetchUpdateReview,
} from "../store/ReviewsSlice/ReviewsSlice";
const { Option } = Select;
// const { Title, Text } = Typography;
const OneReviewPage = () => {
  const { themeMode } = useSelector((state) => state.themeSlice);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchGetOneReview({ id }));
  }, [dispatch, id]);
  const { title, group, content, rating } = useSelector(
    (state) => state.reviewsSlice.oneReview
  );
  const { averageRatingFive, allUnicTags } = useSelector(
    (state) => state.reviewsSlice
  );
  console.log(title, group, content, rating, "allUnicTags");
  //
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = React.useState(false);
  const arr = ["books", "music", "movies", "games"];
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    form.validateFields().then((values) => {
      // Здесь можно отправить изменения на сервер
      dispatch(fetchUpdateReview({ id, values }));
      console.log(values);
      setIsEditing(false);
      dispatch(fetchGetOneReview({ id }));
    });
  };

  return (
    <Layout className="flex justify-center items-center min-h-screen">
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          color: themeMode === false ? "#fff" : "",
        }}
      >
        <RollbackOutlined onClick={() => navigate(-1)} />
      </div>

      <div className="flex items-center justify-center w-full max-w-4xl p-4 ">
        <Card className="w-full border shadow-lg">
          <div className="flex-none w-29 h-33 mx-auto my-6">
            <img
              className="object-cover w-full h-full "
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          </div>
          <div className="ml-4 flex-grow">
            <Form
              form={form}
              initialValues={{ title, group, content }}
              layout="vertical"
              disabled={!isEditing}
            >
              {isEditing ? (
                <Form.Item label="Title" name="title">
                  <Input />
                </Form.Item>
              ) : (
                <div className="p-4 rounded-md border my-4">
                  <ReactMarkdown className="prose">{title}</ReactMarkdown>
                </div>
              )}
              {isEditing ? (
                <Form.Item label="Group" name="group">
                  <Select defaultValue={group}>
                    {arr.map((item, index) => (
                      <Option key={index} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              ) : (
                <div className="p-4 rounded-md border my-4">
                  <ReactMarkdown className="prose">{group}</ReactMarkdown>
                </div>
              )}

              {isEditing ? (
                <Form.Item label="Content" name="content">
                  <Input.TextArea defaultValue={content} />
                </Form.Item>
              ) : (
                <div className="p-4 rounded-md border">
                  <ReactMarkdown className="prose">{content}</ReactMarkdown>
                </div>
              )}

              <Form.Item
                label="Author rating"
                name="rating"
                className="mt-4 px-1"
                defaultValue={rating}
              >
                <Slider
                  defaultValue={rating}
                  min={0}
                  max={10}
                  marks={{ 0: "0", 2: "2", 4: "4", 6: "6", 8: "8", 10: "10" }}
                  step={1}
                />
              </Form.Item>
            </Form>
            <Rate disabled defaultValue={averageRatingFive} />
            <div className="mt-4">
              {isEditing ? (
                <Button onClick={handleSaveClick}>Save</Button>
              ) : (
                <Button onClick={handleEditClick}>Edit</Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default OneReviewPage;
