import React from "react";
import { Button, Input, Select, Card } from "antd";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import debounce from "lodash.debounce";
import axios from "../../axios";
import { stylesBlock, stylesDiv, stylesDivMain } from "./propsForSearch";
const SearchComponent = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [value, setValue] = React.useState("");
  const [show, setShow] = React.useState(false);

  const [dataSource, setDataSource] = React.useState([]);
  const [dataSource2, setDataSource2] = React.useState([]);
  const handleSearch = async () => {
    console.log("search", value);

    const reviews = await axios.get(`/api/search/reviews?q=${value}`);

    setShow(true);
    setDataSource(reviews.data.reviews);
    setDataSource2(reviews.data.comments);
  };
  const inputRef = React.useRef();
  const updateSearchValue = React.useCallback(
    debounce((string) => {
      setValue(string);
      console.log("search", value);
    }, 100),
    []
  );

  console.log(dataSource, dataSource2);
  const onChangeInput = (event) => {
    if (value === "") {
      setDataSource([]);
      setDataSource2([]);
      setShow(false);
    }
    updateSearchValue(event.target.value);
  };

  return (
    <>
      <div className=" border-gray-600 rounded-lg">
        <Input.Search
          ref={inputRef}
          placeholder="Search"
          value={value}
          onChange={onChangeInput}
          onSearch={handleSearch}
          style={{ minWidth: "300px", maxWidth: "500px" }}
        />
        <div style={stylesBlock}>
          {show !== true ? null : (
            <div>
              {dataSource.length > 0 && value !== "" ? (
                <div style={stylesDivMain}>{t("results")}:</div>
              ) : null}
              {dataSource.length > 0 || value === "" ? null : (
                <div style={stylesDivMain}>{t("notResults")}</div>
              )}
            </div>
          )}
          {value !== "" &&
            dataSource.map((item, index) => (
              <div
                key={index}
                style={stylesDiv}
                onClick={() => navigate(`/reviews/${item._id}`)}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span key={index}>{item.title}</span>
                </div>
              </div>
            ))}
          <div>
            {dataSource2.length > 0 && value !== "" ? (
              <div style={stylesDivMain}>{t("foundInComments")}:</div>
            ) : null}
            {dataSource2.length > 0 || value === "" ? null : <div></div>}
          </div>
          {value !== "" &&
            dataSource2.map((item, index) => (
              <div
                key={index}
                style={stylesDiv}
                onClick={() => navigate(`/reviews/${item._id}`)}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span key={index}>
                    {item.title}[{item.group}]
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
// почистить код, стили
//   const arr = dataSource2.map((item) => {
//     return item.reviewId;
//   });
//   const uniqueIds = new Set();
//   const filtered = arr.filter((item) => {
//     if (!uniqueIds.has(item._id)) {
//       uniqueIds.add(item._id);
//       return true;
//     }
//     return false;
//   });
