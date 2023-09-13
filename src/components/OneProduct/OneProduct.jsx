import { Layout, Image, Form, Rate, Card, Button, message } from "antd";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { groupColor } from "./oneProductProps";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetOneProduct,
  fetchHandleProductsRating,
} from "../../store/ProductSlice/ProductSlice";
import { useTranslation } from "react-i18next";
import Spinner from "../Spinner/Spinner";
const OneProduct = () => {
  const { t } = useTranslation();
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    dispatch(fetchGetOneProduct(path));
  }, [dispatch]);
  const { oneProduct, averageRatingFive, oneProductLoading, productsRatings } =
    useSelector((state) => state.productsSlice);
  const { data } = useSelector((state) => state.accountSlice);

  const filtered = productsRatings.filter((item) => {
    if (data === null) {
      return;
    } else return item.userId === data._id;
  });

  const handleRatingFive = async (id, value) => {
    console.log(id, { ratingFive: value });
    const res = await dispatch(fetchHandleProductsRating({ id, value }));
    if (!res) {
      return message.error(res.payload.message);
    }
    setTimeout(() => {
      dispatch(fetchGetOneProduct(path));
    }, 980);
  };
  if (oneProductLoading === "loading") {
    return <Spinner />;
  }
  return (
    <>
      <div className="max-w-md xs:max-w-lg sm:max-w-3xl md:max-w-3xl lg:max-w-4xl xl:max-w-4xl mx-auto p-4 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden relative">
          <Image.PreviewGroup
            preview={{
              onChange: (current, prev) =>
                console.log(`current index: ${current}, prev index: ${prev}`),
            }}
            items={oneProduct.images}
          >
            <Image
              height={400}
              src={
                oneProduct.images[0] ||
                "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              }
            />
          </Image.PreviewGroup>
          <div className="p-4 ">
            <h2 className="text-xl font-semibold text-gray-800 my-4">
              <ReactMarkdown className="prose">
                {oneProduct.title}
              </ReactMarkdown>
            </h2>
            <span
              className={` absolute top-0 right-2 border mt-4 rounded-full ${
                groupColor[oneProduct.group]
              } px-3 py-1 text-sm font-semibold text-gray-700 mr-1`}
            >
              {oneProduct.group}
            </span>
            <div className="px-2 pt-8">
              <span className=" text-base font-semibold">
                <Rate
                  defaultValue={
                    filtered.find((item) => item.productId === oneProduct._id)
                      ?.ratingFive || 0
                  }
                  disabled={data === null || data === 0}
                  onChange={(value) => handleRatingFive(oneProduct._id, value)}
                />
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-gray-800 font-semibold">
                <span>
                  {t("averageRating")}: {averageRatingFive}
                </span>
              </span>
              {data === null ? (
                <div className="p-4 rounded-md my-4 sm:p-2 flex justify-end">
                  <Button disabled={data === null}>
                    {t("loginForcreateReview")}
                  </Button>
                </div>
              ) : (
                <div className="p-4 rounded-md my-4 sm:p-2 flex justify-end">
                  <Button
                    onClick={() =>
                      navigate(`/reviews/createbyproduct/${oneProduct._id}`)
                    }
                  >
                    {t("createReview")}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OneProduct;

{
  /* <div className="flex items-center justify-center w-full max-w-4xl p-4 ">
        <Card className="w-full border shadow-lg">
          <div className="mx-auto my-6 flex justify-center ">
            <Image.PreviewGroup
              preview={{
                onChange: (current, prev) =>
                  console.log(`current index: ${current}, prev index: ${prev}`),
              }}
              items={oneProduct.images}
            >
              <Image
                height={400}
                src={
                  oneProduct.images[0] ||
                  "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                }
              />
            </Image.PreviewGroup>
          </div>
          <div className="ml-4 flex-grow">
            <div className="p-4 rounded-md border my-4 sm:p-2">
              <h2>
                <ReactMarkdown className="prose">
                  {oneProduct.title}
                </ReactMarkdown>
              </h2>
            </div>

            <div className="p-4 rounded-md my-4 sm:p-2">
              <ReactMarkdown className="prose">
                {oneProduct.group}
              </ReactMarkdown>
            </div>

            <span>
              {t("averageRating")}: {averageRatingFive}
            </span>
          </div>
          {data === null ? (
            <div className="p-4 rounded-md my-4 sm:p-2 flex justify-end">
              <Button disabled={data === null}>
                {t("loginForcreateReview")}
              </Button>
            </div>
          ) : (
            <div className="p-4 rounded-md my-4 sm:p-2 flex justify-end">
              <Button
                onClick={() =>
                  navigate(`/reviews/createbyproduct/${oneProduct._id}`)
                }
              >
                {t("createReview")}
              </Button>
            </div>
          )}
        </Card>
      </div> */
}
