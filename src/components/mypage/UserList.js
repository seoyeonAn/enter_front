import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserList = ({ user }) => {

 
    const [users, setUsers] = useState({
        email: "",
        password: "",
        name: "",
        phone: "",
    });

    const { email, password, name, phone } = users;

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("Authorization"),
        },
    };

    const handleValueChange = (e) => {
        setUsers({ ...users, [e.target.name]: e.target.value });
    };

    const [passwordCheck, setPasswordCheck] = useState("");

    const passChange = (e) => {
        if (password !== e.target.value) setPasswordCheck("비밀번호 불일치");
        else setPasswordCheck("비밀번호 일치");
    }

    const info = async () => {
        await axios
            .get("/mypage", config)
            .then((response) => {
                console.log(response.data);
               // setUsers({ ...response.data, password: "" });
               setUsers({...response.data.userList[0]});
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        info();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!password) {
            alert("비밀번호를 입력하세요.");
            return;
        };

        console.log("user:", users);
        setUsers({...users, "email":email});
        await axios
            .post("/mypage", users, config)
            .then((response) => {
                localStorage.setItem("name", name);
                window.location.replace("/mypage")
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className='user-info-email user-info-desc'>
                    <span className='user-info-desc-l'>이메일</span>
                    <span className='user-info-desc-r'>{user.email}</span>
                </div>
                <div className='user-info-name user-info-desc'>
                    <span className='user-info-desc-l'>이름</span>
                    <input type='text' className='user-info-desc-r' name='name' value={name} onChange={handleValueChange} />
                </div>
                <div className='user-info-pass user-info-desc'>
                    <span className='user-info-desc-l'>비밀번호</span>
                    <input type='password' className='user-info-desc-r' name='password' onChange={handleValueChange} />
                </div>
                <div className='user-info-pass'>
                    <div className='user-info-desc'>
                        <span className='user-info-desc-l'>비밀번호 확인</span>
                        <input type='password' className='user-info-desc-r' name='password2' onChange={passChange} />
                    </div>
                    <span className='passcheck'>{passwordCheck}</span>
                </div>
                <div className='user-info-phone user-info-desc'>
                    <span className='user-info-desc-l'>전화번호</span>
                    <input type='text' className='user-info-desc-r' name='phone' value={user.phone} onChange={handleValueChange} />
                </div>
                <div className='user-info-desc-btn pd-top-60'>
                    <button type='submit' className='btn'>변경하기</button>
                </div>
            </form>
        </>
    );
};

export default UserList;