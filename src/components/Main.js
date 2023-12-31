import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import "../css/main.css";
import "../css/common.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { algoActions } from "../toolkit/actions/algorithm_action";
import { tasterActions } from "../toolkit/actions/mainTaster_action";
import AlgoCard from "./AlgoCard";
import axios from "axios";
import ExhibitionTaster from "./main/ExhibitionTaster";
import ShowTaster from "./main/ShowTaster";
import MuseumTaster from "./main/MuseumTaster";
import { Link } from "react-router-dom";
import { calendarActions } from "../toolkit/actions/calendar_action";
import CalendarList from "./main/CalendarList";

const Main = () => {
  //const dispatch = useDispatch();

  const algoList = useSelector((state) => state.algorithm.algoList);
  const loginList = useSelector((state) => state.login.loginList);
  const exhibitionList = useSelector(
    (state) => state.exhibition.exhibitionList
  );
  const showList = useSelector((state) => state.show.showList);
  const museumList = useSelector((state) => state.museum.museumList);

  const calendarList = useSelector((state) => state.calendar.calendarList);

  const dispatch = useDispatch();

  const getAlgorithm = () => {
    dispatch(algoActions.getAlgoList(loginList.email));
  };

  const getMainTaster = () => {
    dispatch(tasterActions.getMainTaster());
  };
  //console.log("exhibition list: ", exhibitionList);

  useEffect(() => {
    if (loginList.email) {
      getAlgorithm();
    }
    getMainTaster();
  }, [loginList]);

  //React Calendar
  const [value, onChange] = useState(new Date());

  const getFormattedDate = (date) => {
    return `${date.getFullYear()}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
  };

  const formattedDate = getFormattedDate(value);

  const getCalendar = () => {
    dispatch(calendarActions.getCalendarList(formattedDate));
  };

  // 선택된 날짜가 변경될 때마다 getCalendar 함수 호출
  useEffect(() => {
    getCalendar();
  }, [formattedDate]);

  return (
    <div className="main">
      {/* slide-Area */}
      <div className="slide-Area pd-bottom-100">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="images/main/slide1.png"
              alt="First slide"
            />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="images/main/slide2.png"
              alt="Second slide"
            />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="images/main/slide3.png"
              alt="Third slide"
            />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {loginList.name != null ? (
        <>
          <div className="container pd-content-100 ranking-List-Area">
            <h1 className="algoTitle title">
              {loginList.name + " 님을 위한 추천 "}
            </h1>
            <ul className="algoList">
              {algoList &&
                algoList.map((algorithm) => {
                  return (
                    <AlgoCard algorithm={algorithm} key={algorithm.info_seq} />
                  );
                })}
            </ul>
          </div>
        </>
      ) : (
        <></>
      )}

      {/* banner */}
      <div className="container pd-content-100">
        <ul className="banner-List">
          <li className="list-Item">
            <img src="images/main/banner1.png" />
          </li>
          <li className="list-Item">
            <img src="images/main/banner2.png" />
          </li>
          <li className="list-Item">
            <img src="images/main/banner3.png" />
          </li>
          <li className="list-Item">
            <img src="images/main/banner4.png" />
          </li>
          <li className="list-Item">
            <img src="images/main/banner5.png" />
          </li>
          <li className="list-Item">
            <img src="images/main/banner6.png" />
          </li>
        </ul>
      </div>

      {/* Ranking-List */}
      <div className="container pd-content-100 taster-List-Area">
        <div>
          <h1 className="title">문화예술 맛보기</h1>
        </div>
        <div className="taster-List pd-top-60">
          <div className="tab-area">
            <Tab.Container id="left-tabs-example" defaultActiveKey="1">
              <Nav variant="pills" className="pd-bottom-60">
                <Nav.Item>
                  <Nav.Link eventKey="1">전시</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="2">공연</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="3">박물관</Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="1">
                  <div className="taster-List-content">
                    {exhibitionList &&
                      exhibitionList.map((exhibition) => {
                        return (
                          <ExhibitionTaster
                            exhibition={exhibition}
                            key={exhibition.infoSeq}
                          />
                        );
                      })}
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="2">
                  <div className="taster-List-content">
                    {showList &&
                      showList.map((show) => {
                        return <ShowTaster show={show} key={show.infoSeq} />;
                      })}
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="3">
                  <div className="taster-List-content">
                    {museumList &&
                      museumList.map((museum) => {
                        return (
                          <MuseumTaster museum={museum} key={museum.infoSeq} />
                        );
                      })}
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
          <div className="btn-area pd-top-40">
            <Link to={"/info/1"} className="btn btn-origin">
              더보기
            </Link>
          </div>
        </div>
      </div>
      {/* Calender/list */}
      <div className="container pd-content-100 calender-daylist-Area">
        <div className="calender-Area">
          {/* <Calendar /> */}
          <Calendar
            onChange={onChange}
            value={value}
            formatDay={(locale, date) =>
              date.toLocaleString("en", { day: "numeric" })
            }
          />
        </div>
        <div className="day-List-Area">
          <ul className="day-List">
            {calendarList ? (
              <>
                {calendarList &&
                  calendarList.map((calendar) => {
                    return (
                      <CalendarList
                        calendar={calendar}
                        key={calendar.info_seq}
                      />
                    );
                  })}
              </>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
      <div className="container pd-content-100">
        <h1 className="title">인기 동영상</h1>
        <div className="videoBox pd-top-60">
          <ReactPlayer
            className="video"
            url={"https://youtu.be/rrI7tOhoVzA?si=U49HzIgORu8ErKAA"}
            height="300px"
            playing={true}
            muted={true}
            controls={true}
          />

          <ReactPlayer
            className="video"
            url={"https://youtu.be/EvStWwidM98?si=GKlEBoS5BSAicp_0"}
            height="300px"
            playing={false}
            muted={true}
            controls={true}
          />

          <ReactPlayer
            className="video"
            url={"https://youtu.be/G0ZuPjha-c8?si=Tri8gcbMQxh_KSxO"}
            height="300px"
            playing={false}
            muted={true}
            controls={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
