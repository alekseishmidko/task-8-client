import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetRelatedReviews } from "../../store/ReviewsSlice/ReviewsSlice";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const RelatedReviews = ({ productId, id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  React.useEffect(() => {
    console.log(id, productId, "useEfss");
    dispatch(fetchGetRelatedReviews({ id, productId }));
  }, []);
  const { relatedReviews } = useSelector((state) => state.reviewsSlice);
  console.log(relatedReviews);
  return (
    <>
      {
        <div className=" w-full max-w-4xl px-6">
          <h2 className="text-lg font-semibold mb-4">
            {t("recommendedReviews")}
          </h2>
          <div className="flex justify-between gap-6 overflow-x-auto">
            {relatedReviews.map((item, index) => (
              <div
                className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-2 mb-4 cursor-pointer"
                key={index}
              >
                <Link to={`/reviews/${item._id}`}>
                  <div className="w-full bg-white border rounded-md shadow-md p-3 text-center">
                    <img
                      src={
                        item.images[0] ||
                        "https://res.cloudinary.com/dmpjxhwal/image/upload/v1694009851/cucokdvpp2ekz0jymskn.jpg"
                      }
                      alt={item.title}
                      className="mx-auto h-20 w-20 object-cover rounded-full"
                    />
                    <h3 className="text-md font-semibold mt-2">{item.title}</h3>
                    <p className="text-gray-600">{item.group}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      }
    </>
  );
};

export default RelatedReviews;
