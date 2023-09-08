import { Layout } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import RollBackButton from "../RollBackButton/RollBackButton";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetOneProduct } from "../../store/ProductSlice/ProductSlice";
import { useTranslation } from "react-i18next";
const OneProduct = () => {
  const { t } = useTranslation();
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  React.useEffect(() => {
    console.log(path);
    dispatch(fetchGetOneProduct(path));
  }, [dispatch]);
  const { oneProduct, averageRatingFive } = useSelector(
    (state) => state.productsSlice
  );
  console.log(oneProduct);
  return (
    <Layout>
      <div className="flex justify-center h-screen">
        <Link to={-1} className="absolute top-16 left-2 z-50">
          <RollBackButton />
        </Link>
        <div className="w-full sm:w-3/4 md:w-3/4 lg:w-2/3 xl:w-2/3 p-4 my-auto">
          <div className="bg-white rounded-lg shadow-lg ">
            <img
              src={oneProduct.images}
              alt={oneProduct.title}
              className="w-full h-64 sm:h-48 md:h-64 lg:h-72 xl:h-80 object-cover"
            />
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
    </Layout>
  );
};

export default OneProduct;
