import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mypageActions } from '../../toolkit/actions/mypage_action';
import UserList from './UserList';
import DiaryList from './DiaryList';

import "../../css/mypage.css"
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useNavigate, useParams } from 'react-router-dom';
import { TabContainer } from 'react-bootstrap';




const Mypage = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const [diary, setDiary] = useState({
        title: "",
        content: "",
    });

    const { title, content, upload } = diary;

    const { date_seq } = useParams();

    const onChangeDiary = (e) => {
        setDiary({...diary, [e.target.name]: e.target.value});
    }

    const onSubmit =  async(e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
   //     formData.append("email", localStorage.getItem("email"));
  //        formData.append("name", localStorage.getItem("name"));
        formData.append("email", "aa@aaa.com");

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: localStorage.getItem("Authorization"),
            }
        };

      
       await  dispatch(mypageActions.getDiaryWrite(formData, config));

        setDiary({
            title: "",
            content: "",
        });

        getUserList();           
        if(key==='Diary')
          document.getElementById("noanim-tab-example-tab-Diary").click();  
        else if(key==='EnterList')   
        document.getElementById("noanim-tab-example-tab-EnterList").click();  
        navigator('/mypage');
    }

   const [key, setKey] = useState('EnterList');

 const handleSelect=(key) =>{
   
    setKey(key);  
  }

 
    const getUserList = () => {
        dispatch(mypageActions.getUserList('aa@aaa.com'));
    };

    // const getDiaryList = () => {
    //     dispatch(mypageActions.getDiaryList());
    // }

    

    useEffect(() => {
        getUserList();     

       
        // getDiaryList();
    }, []);

    const userList = useSelector((state) => state.user.userList);
    const diaryList = useSelector((state) => state.diary.diaryList);
    return (
        <>
            <Container className='pd-content-100'>
                <div className='title-area'>
                    <h1 className='mp-Title'>마이페이지</h1>
                </div>
                <Container className='user-info pd-content-60'>
                    <div className='user-info-img-area'>
                        <img src="images/mypage/thumb1.png" className='user-info-img' />
                    </div>
                    <div className='user-info-desc-area'>
                        { userList && <UserList  />}
                           
                    </div>
                </Container>
                <Container className='user-tab-area pd-content-60'>
                    <div className='title-area'>
                        <h1 className='mp-Title'>EnterList/Diary</h1>
                    </div>
                    <div className='list-diary-area'>
                        <div className='tab-area'>
                            <Tabs 
                                defaultActiveKey="EnterList"
                                 onSelect={handleSelect}
                                transition={false}
                                id="noanim-tab-example"
                                className="tab-li"
                               
                            >
                                <Tab eventKey="EnterList" title="EnterList">
                                    <div className='tab-content-area'>
                                        <div className='tab-content-desc'>
                                            Tab content for EnterList
                                        </div>
                                    </div>

                                </Tab>
                                <Tab eventKey="Diary" title="Diary"  id="diary" >
                                    <div className='tab-content-area'>
                                        <div className='tab-content-desc'>
                                            <div className='user-diary-write'>
                                                <form onSubmit={onSubmit} className='form-Area'>
                                                    <div className='title-form-area'>
                                                        <span>제목 : </span>
                                                        <input type='text' name='title' value={title} onChange={onChangeDiary} />
                                                    </div>
                                                    <textarea name='content' value={content} onChange={onChangeDiary} placeholder='나의 감상을 기록해보세요!'/>
                                                    <div className='user-info-desc-btn pd-top-20'>
                                                        <button type='submit' className='btn'>기록하기</button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className='user-diary-list'>
                                                {diaryList &&
                                                    diaryList.map((diary) => {
                                                        return <DiaryList diary={diary} key={diary.diary_seq} />
                                                    })}
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </Container>
            </Container>
        </>
    );
};

export default Mypage;