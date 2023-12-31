import axios from "axios";
import {
  diaryReducers,
  enterReducers,
  userReducers,
} from "../reducers/mypage_reducer";

function getUserList(email) {
  return async (dispatch) => {
    console.log("axios getUserList call with email: ", email);
    const data = await axios
      .get(`/mypage/${email}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
    console.log(data);
    dispatch(userReducers.getUserList({ userList: data.userList }));
    dispatch(diaryReducers.getDiaryList({ diaryList: data.diaryList }));
    dispatch(enterReducers.getEnterList({ enterList: data.enterList }));
  };
}

// function getDiaryList() {
//     return async (dispatch) => {
//         const data = await axios
//         .get("/mypage")
//         .then((response) => response.data)
//         .catch((error) => {
//             console.log(error);
//         });
//         dispatch(diaryReducers.getDiaryList({data}));
//     };
// }

function getDiaryWrite(formData, config) {
  return async () => {
    await axios
      .post("/mypage/diarywrite", formData, config)
      .then((response) => response.data);
  };
}

function getEnterUpdate(enterSeq, completed) {
  axios
    .put(`/mypage/${enterSeq}/${completed}`)
    // .then((response) => {
    //   window.location.replace("/mypage");
    // })
    .catch((error) => {
      console.log(error);
    });
}

export const mypageActions = {
  getUserList,
  getDiaryWrite,
  getEnterUpdate,
  // ,getDiaryList
};
