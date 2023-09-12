import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Layout } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetOneReview } from "../store/ReviewsSlice/ReviewsSlice";

import RollBackButton from "../components/RollBackButton/RollBackButton";
import Spinner from "../components/Spinner/Spinner";
import Header from "../components/Header/Header";

import OneReview from "../components/OneReview/OneReview";
import CommentBlock from "../components/CommentBlock/CommentBlock";
import RelatedReviews from "../components/RelatedReviews/RelatedReviews";

const OneReviewPage = () => {
  const { oneReview, averageRatingFive, isOneReviewLoading, reviewsRatings } =
    useSelector((state) => state.reviewsSlice);
  const dispatch = useDispatch();
  const { id } = useParams();
  React.useEffect(() => {
    dispatch(fetchGetOneReview({ id }));
  }, [dispatch, id]);
  if (isOneReviewLoading === "loading") {
    return <Spinner />;
  }
  return (
    <>
      <Header />
      <Layout className="flex justify-center items-center min-h-screen">
        <Link to={-1} className="absolute top-16 left-2 z-50">
          <RollBackButton />
        </Link>
        <OneReview />
        <RelatedReviews
          oneReview={oneReview}
          productId={oneReview.productId}
          id={id}
        />

        <CommentBlock />
      </Layout>
    </>
  );
};

export default OneReviewPage;
{
  /* <div className="flex items-center justify-center w-full max-w-4xl p-4 ">
<Card className="w-full border shadow-lg">
  <div className="mx-auto my-6 flex justify-center">
    <img
      className="object-cover bordered  h-64 sm:h-48 md:h-64 lg:h-72 xl:h-80 "
      alt={oneReview.title}
      src={
        oneReview.images[0] ||
        "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      }
    />
  </div>
  <div className="ml-4 flex-grow">
    <Form
      form={form}
      
      layout="vertical"
      disabled={!isEditing}
    >
      {isEditing ? (
        <Form.Item label="Title" name="title">
          <Input defaultValue={oneReview.title} />
        </Form.Item>
      ) : (
        <div className="p-4 rounded-md border my-4 sm:p-2">
          <h2>
            <ReactMarkdown className="prose">
              {oneReview.title}
            </ReactMarkdown>
          </h2>
        </div>
      )}
      {isEditing ? (
        <Form.Item label="Group" name="group">
          <Select defaultValue={oneReview.group}>
            {arr.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ) : (
        <div className="p-4 rounded-md border my-4 sm:p-2">
          <ReactMarkdown className="prose">
            {oneReview.group}
          </ReactMarkdown>
        </div>
      )}

      {isEditing ? (
        <Form.Item label="Content" name="content">
     
          <ReactMarkdown className="prose">
            {oneReview.content}
          </ReactMarkdown>
        </Form.Item>
      ) : (
        <div className="p-4 rounded-md border my-4 sm:p-2">
          <ReactMarkdown className="prose">
            {oneReview.content}
          </ReactMarkdown>
        </div>
      )}

      <Form.Item
        label=" "
        name="rating"
        className="mt-4 px-1"
        defaultValue={oneReview.rating || 0}
      >
        {!isEditing ? (
          <span>Author rating : {oneReview.rating}</span>
        ) : (
          <Slider
            defaultValue={oneReview.rating}
            min={0}
            max={10}
            marks={{
              0: "0",
              2: "2",
              4: "4",
              6: "6",
              8: "8",
              10: "10",
            }}
            step={1}
          />
        )}
      </Form.Item>
    </Form>
    <div className="px-6 py-4">
      <span className=" text-base font-semibold">
        <Rate
          defaultValue={
            filtered.find((item) => item.reviewId === _id)
              ?.ratingFive || 0
          }
          disabled={data === null || data === 0}
          onChange={(value) => handleRatingFive(_id, value)}
        />
      </span>
    </div>
    <div className="px-6 py-4 flex justify-between">
      <span className=" text-base font-semibold">
        average rating:{" "}
        {averageRatingFive === null ? 0 : averageRatingFive}
      </span>
      <BadgeLike count={3} />
    </div>
    {data !== null && (
      <div className="mt-4">
        {isEditing ? (
          <Button onClick={handleSaveClick}>Save</Button>
        ) : (
          <Button onClick={handleEditClick}>Edit</Button>
        )}
      </div>
    )}
  </div>
</Card>
</div> */
}
