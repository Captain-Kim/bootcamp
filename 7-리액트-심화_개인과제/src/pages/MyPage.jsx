import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../redux/authSlice';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #ffffff;
  min-height: 50vh;
  max-width: 300px;
  margin: 100px auto;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const InputFieldWithLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  gap: 10px;
  width: 100%;
  max-width: 500px;
  margin-bottom: 20px;

  label {
    font-weight: bold;
    margin-bottom: 6px;
    font-size: 16px;
  }

  input {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 6px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s;

    &:focus {
      border-color: #007bff;
      outline: none;
    }
  }
`;

const InputFieldWithButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  gap: 10px;
  width: 100%;
  max-width: 500px;
  margin-bottom: 20px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;

  input[type="file"] {
    display: none;
  }

  label {
    padding: 12px 16px;
    font-size: 1em;
    border: none;
    background-color: #86acd9;
    color: white;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 10px;

    &:hover {
      background-color: #649bbd;
    }
  }

  span {
    flex: 1;
    padding: 12px;
    font-size: 1em;
    color: #333;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 24px;
  width: 100%;
  max-width: 500px;
  height: 48px;
  background: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const CurrentProfilePic = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  margin-bottom: 20px;
  border: 3px solid #ddd;
`;

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [newNickname, setNewNickname] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      const fetchUserInfo = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          const response = await axios.get(
            "https://moneyfulpublicpolicy.co.kr/user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserInfo(response.data);
          console.log('GET 요청에 대한 응답입니다요(userInfo) =>', userInfo);
        } catch (error) {
          console.error("서버에서 유저 정보를 못 받아왔습니다요 이유는 =>", error);
        }
      };
      fetchUserInfo();
    }
  }, [isAuthenticated, navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileName(file.name);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("nickname", newNickname);
      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }

      const response = await axios.patch(
        "https://moneyfulpublicpolicy.co.kr/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        const updatedNickname = response.data.nickname;
        const updatedAvatar = response.data.avatar;

        setUserInfo((prevState) => ({
          ...prevState,
          nickname: response.data.nickname,
          avatar: updatedAvatar,
        }));
        setUser((prevState) => ({
          ...prevState,
          nickname: response.data.nickname,
          avatar: updatedAvatar,
        }));
        alert("프로필이 업데이트되었습니다.");
        localStorage.setItem('nickname', updatedNickname);
        setNewNickname("");
        setSelectedFile(null);
        setFileName("");
      } else {
        alert("프로필 업데이트에 실패했습니다.");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("프로필 업데이트에 실패했습니다.");
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <form onSubmit={handleProfileUpdate}>
        <InputFieldWithLabel>
          <label>현재 닉네임 : {userInfo.nickname}</label>
          <label>변경할 닉네임</label>
          <input
            type="text"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
          />
        </InputFieldWithLabel>
        <InputFieldWithLabel>
          <label>현재 프로필 사진</label>
          <CurrentProfilePic src={userInfo.avatar} />
          <label>변경할 프로필 사진 선택</label>
          <InputFieldWithButton>
            <label htmlFor="file-upload">파일 선택</label>
            <span>{fileName}</span>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
            />
          </InputFieldWithButton>
        </InputFieldWithLabel>
        <Button type="submit">프로필 업데이트 하기</Button>
      </form>
    </Container>
  );
};

export default MyPage;
