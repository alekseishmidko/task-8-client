import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetRelatedReviews } from "../../store/ReviewsSlice/ReviewsSlice";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, Image } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
const RelatedReviews = ({ productId, id }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchGetRelatedReviews({ id, productId }));
  }, []);
  const { relatedReviews } = useSelector((state) => state.reviewsSlice);

  return (
    <>
      <div className=" w-full max-w-4xl ">
        {relatedReviews.length > 0 && (
          <h2 className="text-lg font-semibold mb-4 pl-4">
            {t("recommendedReviews")}
          </h2>
        )}
        <div className="flex flex-wrap  ">
          {relatedReviews.map((item, index) => (
            <div
              className="w-full xs:w-1/1 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-2 mb-4 cursor-pointer"
              key={index}
            >
              <Card
                size="small"
                onClick={() => navigate(`/reviews/${item._id}`)}
              >
                <div className="flex justify-center relative ">
                  <Image
                    preview={false}
                    src={
                      item?.images[0] ||
                      "https://res.cloudinary.com/dmpjxhwal/image/upload/v1694009851/cucokdvpp2ekz0jymskn.jpg"
                    }
                    alt={item?.title}
                    className="relative rounded "
                  />
                </div>

                <div className="flex justify-center">
                  <ReactMarkdown className="mt-2 prose">
                    {item?.title}
                  </ReactMarkdown>
                </div>
                <div className="flex justify-center">
                  <p className="text-md font-semibold">{item.group}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RelatedReviews;
