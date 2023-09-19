import React from "react";
import { Button, Input, Select, Card } from "antd";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import debounce from "lodash.debounce";

import { stylesBlock, stylesDiv, stylesDivMain } from "./propsForSearch";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetSearch } from "../../store/SearchSlice/SearchSlice";
import ReactMarkdown from "react-markdown";
const SearchComponent = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [value, setValue] = React.useState("");
  const [show, setShow] = React.useState(false);
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = React.useState([]);
  const [dataSource2, setDataSource2] = React.useState([]);
  const { searchedReviews, searchedComments, searchLoading } = useSelector(
    (state) => state.searchSlice
  );
  // console.log(searchedReviews, searchedComments);
  const handleSearch = async () => {
    console.log("search", value);

    // const reviews = await axios.get(`/api/search/reviews?q=${value}`);
    const res = await dispatch(fetchGetSearch(value));
    // console.log(res, "res");

    setShow(true);
    setDataSource(res.payload.reviews.slice(0, 7));
    setDataSource2(res.payload.comments.slice(0, 4));
    // console.log(dataSource, dataSource2);
  };

  const searchRef = React.useRef();
  const updateSearchValue = React.useCallback(
    debounce((string) => {
      setValue(string);
      // console.log("search", value);
    }, 100),
    []
  );

  const onChangeInput = (event) => {
    if (value === "") {
      setDataSource([]);
      setDataSource2([]);
      setShow(false);
    }
    updateSearchValue(event.target.value);
  };

  React.useEffect(() => {
    const handleClickOutSide = (event) => {
      if (!event.composedPath().includes(searchRef.current)) {
        setValue("");
      }
    };

    document.body.addEventListener("click", handleClickOutSide);
    return () => {
      document.body.removeEventListener("click", handleClickOutSide);
    };
  }, []);
  return (
    <>
      <div className=" border-gray-600 rounded-lg " ref={searchRef}>
        <Input.Search
          placeholder={t("search")}
          value={value}
          onChange={onChangeInput}
          onSearch={handleSearch}
          style={{ minWidth: "200px", maxWidth: "500px" }}
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
                  <span key={index}>
                    <ReactMarkdown>{item.title}</ReactMarkdown>
                  </span>
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
                    <ReactMarkdown>{item.title}</ReactMarkdown>
                  </span>
                </div>
              </div>
            ))}
          <div>
            {(dataSource2.length > 0 && value !== "") ||
            (dataSource.length > 0 && value !== "") ? (
              <div style={stylesDivMain} onClick={() => navigate("/search")}>
                {t("allSearchResults")}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
