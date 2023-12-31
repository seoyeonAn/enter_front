import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { infoActions } from "../../toolkit/actions/info_action";
import { useParams } from "react-router-dom";
import InfoCard from "./InfoCard";
import PageNavigation from "./PageNavigation";

// css
import "../../css/info.css";

const InfoList = () => {
  // const { currentPage } = useParams();
  const { currentPage, params } = useParams();
  const dispatch = useDispatch();

  const [selectedSearchKey, setSelectedSearchKey] = useState("");
  const [selectedSearchWord, setSelectedSearchWord] = useState("");

  const infoList = useSelector((state) => state.information.infoList);

  const pv = useSelector((state) =>
    state.information.pv ? state.information.pv : { currentPage: 1}
  );

  const getInfoList = (currentPage, params) => {
    dispatch(infoActions.getInfoList(currentPage, params));
  };

  const handleChangeSelectSearch = (e) => {
    setSelectedSearchKey(e.target.value);
  };

  const handleSearchWordChange = (e) => {
    setSelectedSearchWord(e.target.value);
  };

  const handleSearchInfo = (e) => {
    e.preventDefault();

    const params = {
      searchKey: selectedSearchKey,
      searchWord: selectedSearchWord,
    };

    getInfoList(1, params);
  };

  useEffect(() => {
    getInfoList(currentPage, params);
  }, [currentPage, params]);


  return (
    <div className="container pd-content-100">
      <div className="selectBar-Area">
        <div className="selectBar">
          <div className="fieldOne">
            <select
              className="selectBox"
              onChange={handleChangeSelectSearch}
              value={selectedSearchKey}
            >
              <option name="searchKey" value="" className="options">
                전체
              </option>
              <option name="searchKey" value="exhibition" className="options">
                전시
              </option>
              <option name="searchKey" value="show" className="options">
                공연
              </option>
              <option name="searchKey" value="museum" className="options">
                박물관
              </option>
            </select>
          </div>
          <div className="fieldTwo">
            <input
              type="text"
              className="inputField"
              placeholder=" 제목을 입력하세요"
              onChange={handleSearchWordChange}
            />
            <button
              type="submit"
              className="btnSearch"
              onClick={handleSearchInfo}
            >
              검색
            </button>
          </div>
        </div>
        <div className="totalSearch">
          <div className="total">
            검색 결과 총
            {pv.totalCount === undefined ?
            <strong className="strongText"> 0</strong> : <strong className="strongText"> {pv.totalCount}</strong>}건
           </div>
        </div>
      </div>


      {pv.totalCount === undefined ? <div className="noSearch">검색 결과가 없습니다.</div> : <div className="row">
        {infoList &&
          infoList.map((information) => {
            return (
              <InfoCard information={information} key={information.infoSeq} />
            );
          })}
          
      </div>}

      {pv.totalCount === undefined ? null :pv && <PageNavigation getInfoList={getInfoList} />}

    </div>
  );
};

export default InfoList;
