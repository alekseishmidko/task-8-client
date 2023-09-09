import { Layout, Image, Form, Rate, Card } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import RollBackButton from "../RollBackButton/RollBackButton";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetOneProduct } from "../../store/ProductSlice/ProductSlice";
import { useTranslation } from "react-i18next";
import Spinner from "../Spinner/Spinner";
const OneProduct = () => {
  const { t } = useTranslation();
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchGetOneProduct(path));
  }, [dispatch]);
  const { oneProduct, averageRatingFive, oneProductLoading } = useSelector(
    (state) => state.productsSlice
  );
  if (oneProductLoading === "loading") {
    return <Spinner />;
  }
  return (
    <>
      <div className="flex items-center justify-center w-full max-w-4xl p-4 ">
        <Card className="w-full border shadow-lg">
          <div className="mx-auto my-6 flex justify-center">
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
        </Card>
      </div>
    </>
  );
};

export default OneProduct;
{
  /* <Layout>
        <div className="flex justify-center min-h-screen">
          <Link to={-1} className="absolute top-16 left-2 z-50">
            <RollBackButton />
          </Link>
          <div className="w-full sm:w-3/4 md:w-3/4 lg:w-2/3 xl:w-2/3 p-4 my-auto">
            <div className="bg-white rounded-lg shadow-lg">
              <Image.PreviewGroup
                preview={{
                  onChange: (current, prev) =>
                    console.log(
                      `current index: ${current}, prev index: ${prev}`
                    ),
                }}
                items={oneProduct.images}
              >
                <Image
                  height={300}
                  src={
                    oneProduct.images ||
                    "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
                  }
                />
              </Image.PreviewGroup>
              <div className="px-6 py-4">
                <ReactMarkdown className="prose">
                  {oneProduct.title}
                </ReactMarkdown>
              </div>
              <div className="px-6 py-4">
                <p className="text-gray-600">{oneProduct.group}</p>
              </div>
              <div className="px-6 py-4">
                <p className="text-lg font-semibold">
                  {t("averageRating")}:
                  {averageRatingFive === null ? 0 : averageRatingFive}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout> */
}
{
  /* <Layout>
        <div className="flex justify-center h-screen">
          <Link to={-1} className="absolute top-16 left-2 z-50">
            <RollBackButton />
          </Link>
          <div className="w-full sm:w-3/4 md:w-3/4 lg:w-2/3 xl:w-2/3 p-4 my-auto">
            <div className="bg-white rounded-lg shadow-lg flex">
              <div className="w-1/2 p-6">
                <ReactMarkdown className="prose">
                  {oneProduct.title}
                </ReactMarkdown>
                <p className="text-gray-600">{oneProduct.group}</p>
                <p className="text-lg font-semibold">
                  {t("averageRating")}:
                  {averageRatingFive === null ? 0 : averageRatingFive}
                </p>
              </div>

              <div className="w-1/2 p-6">
                <Image.PreviewGroup
                  preview={{
                    onChange: (current, prev) =>
                      console.log(
                        `current index: ${current}, prev index: ${prev}`
                      ),
                  }}
                  items={oneProduct.images}
                >
                  <Image
                    height={400}
                    src={
                      oneProduct.images ||
                      "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
                    }
                  />
                </Image.PreviewGroup>
              </div>
            </div>
          </div>
        </div>
      </Layout> */
}
