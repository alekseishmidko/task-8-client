import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetRelatedReviews } from "../../store/ReviewsSlice/ReviewsSlice";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const RelatedReviews = ({ productId, id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchGetRelatedReviews({ id, productId }));
  }, []);
  const { relatedReviews } = useSelector((state) => state.reviewsSlice);
  // console.log(relatedReviews);

  return (
    <>
      {
        <div className=" w-full max-w-3xl px-6">
          <h2 className="text-lg font-semibold mb-4">
            {t("recommendedReviews")}
          </h2>
          <div className="flex flex-wrap ">
            {relatedReviews.map((item, index) => (
              <div
                className="w-full xs:w-1/1 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-4 cursor-pointer"
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
// const arr = [
//   {
//     _id: "65009f35d14f2372bb44d2c9",
//     title: "SADFGH",
//     content: "SDFDGFHGJHKGHFGDFSDAS TJYMTNBRDVSC",
//     group: "movies",
//     rating: 8,
//     ratingFive: [],
//     likes: 0,
//     userId: "64e653ee72d53ec57fcd84c8",
//     tags: [],
//     images: [],
//     comments: [],
//     productId: "64ecfb9eb95ca780bde596da",
//     createdAt: "2023-09-12T17:26:13.090Z",
//     updatedAt: "2023-09-12T17:26:13.090Z",
//     __v: 0,
//   },
//   {
//     _id: "65009f35d14f2372bb44d2c9",
//     title: "SADFGH",
//     content: "SDFDGFHGJHKGHFGDFSDAS TJYMTNBRDVSC",
//     group: "movies",
//     rating: 8,
//     ratingFive: [],
//     likes: 0,
//     userId: "64e653ee72d53ec57fcd84c8",
//     tags: [],
//     images: [],
//     comments: [],
//     productId: "64ecfb9eb95ca780bde596da",
//     createdAt: "2023-09-12T17:26:13.090Z",
//     updatedAt: "2023-09-12T17:26:13.090Z",
//     __v: 0,
//   },
//   {
//     _id: "65009f35d14f2372bb44d2c9",
//     title: "SADFGH",
//     content: "SDFDGFHGJHKGHFGDFSDAS TJYMTNBRDVSC",
//     group: "movies",
//     rating: 8,
//     ratingFive: [],
//     likes: 0,
//     userId: "64e653ee72d53ec57fcd84c8",
//     tags: [],
//     images: [],
//     comments: [],
//     productId: "64ecfb9eb95ca780bde596da",
//     createdAt: "2023-09-12T17:26:13.090Z",
//     updatedAt: "2023-09-12T17:26:13.090Z",
//     __v: 0,
//   },
//   {
//     _id: "65009f35d14f2372bb44d2c9",
//     title: "SADFGH",
//     content: "SDFDGFHGJHKGHFGDFSDAS TJYMTNBRDVSC",
//     group: "movies",
//     rating: 8,
//     ratingFive: [],
//     likes: 0,
//     userId: "64e653ee72d53ec57fcd84c8",
//     tags: [],
//     images: [],
//     comments: [],
//     productId: "64ecfb9eb95ca780bde596da",
//     createdAt: "2023-09-12T17:26:13.090Z",
//     updatedAt: "2023-09-12T17:26:13.090Z",
//     __v: 0,
//   },
//   {
//     _id: "65009f35d14f2372bb44d2c9",
//     title: "SADFGH",
//     content: "SDFDGFHGJHKGHFGDFSDAS TJYMTNBRDVSC",
//     group: "movies",
//     rating: 8,
//     ratingFive: [],
//     likes: 0,
//     userId: "64e653ee72d53ec57fcd84c8",
//     tags: [],
//     images: [],
//     comments: [],
//     productId: "64ecfb9eb95ca780bde596da",
//     createdAt: "2023-09-12T17:26:13.090Z",
//     updatedAt: "2023-09-12T17:26:13.090Z",
//     __v: 0,
//   },
//   {
//     _id: "65009f35d14f2372bb44d2c9",
//     title: "SADFGH",
//     content: "SDFDGFHGJHKGHFGDFSDAS TJYMTNBRDVSC",
//     group: "movies",
//     rating: 8,
//     ratingFive: [],
//     likes: 0,
//     userId: "64e653ee72d53ec57fcd84c8",
//     tags: [],
//     images: [],
//     comments: [],
//     productId: "64ecfb9eb95ca780bde596da",
//     createdAt: "2023-09-12T17:26:13.090Z",
//     updatedAt: "2023-09-12T17:26:13.090Z",
//     __v: 0,
//   },
// ];
