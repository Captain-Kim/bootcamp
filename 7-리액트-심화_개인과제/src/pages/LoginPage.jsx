import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';


const Container = styled.div`
  position: relative;
  margin: 50px auto;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--padding);
  background-color: #c4dfff;
  border-radius: 7px;
`;

const Input = styled.input`
  padding: 15px;
  font-size: 1.2em;
  border: none;
  margin: 30px auto;
`;

const Button = styled.button`
  padding: 15px;
  font-size: 1.2em;
  border: none;
  background-color: #ffe4c4;
  color: #547fb2;
  border-radius: 4px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;

const SignUpBox = styled.div`
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #86acd9;
  display: flex;
  justify-content: center;
  align-items: center;
  top: var(--padding);
  right: -35px;
  cursor: pointer;
  transition: all 500ms ease-in-out;

  &.active {
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    padding: 30px;
    cursor: default;
    border-radius: 7px;
  }

  &.active input,
  &.active button {
    padding: 15px;
    font-size: 1.2em;
    border: none;
    margin: 0;
    // width: 340px;
  }

  &.active input {
    margin-bottom: 10px;
  }
`;

const CloseButton = styled.span`
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: #fff;
  border-radius: 50%;
  top: 5px;
  right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #547fb2;
  font-weight: 700;
  cursor: pointer;
`;

const Icon = styled.i`
  font-size: 1.9em;
  color: #fff;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;
const LoginPage = () => {
  const [signUpActive, setSignUpActive] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [signUpNickname, setSignUpNickname] = useState('');
  const [signUpId, setSignUpId] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleClick = () => {
    if (signUpActive) return;
    setSignUpActive(true);
  };

  const removeActive = () => {
    setSignUpActive(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (signUpNickname === '' || signUpId === '' || signUpPassword === '') {
      alert("모든 필드를 입력해주세요.");
      return;
    }
  
    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/register",
        {
          id: signUpId,
          nickname: signUpNickname,
          password: signUpPassword,
        }
      );
  
      const data = response.data;
      if (data.success) {
        // 회원가입 성공 후 로그인 처리
        console.log("회원가입 성공 => ", data);
        dispatch(login({ token: data.accessToken, user:data }));
        navigate('/');
      } else {
        alert('회원가입에 실패했습니다. 계정을 확인해주세요.');
      }
    } catch (error) {
      console.error('SignUp error:', error);
      alert('회원가입에 실패했습니다.');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/login",
        {
          id,
          password,
        }
      );
      const data = response.data;
      if (data.success) {
        console.log("날아온 유저 데이터 => ", data);
        dispatch(login({ token: data.accessToken, user: data }));
        navigate('/');
      } else {
        alert('로그인에 실패했습니다. 계정을 확인해주세요.')
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('로그인에 실패했습니다.')
    }
  };

  return (
    <Container>
      <form onSubmit={handleLoginSubmit}>
        <Input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">로그인</Button>
      </form>

      <SignUpBox className={signUpActive ? 'active' : ''} onClick={handleClick}>
        {signUpActive ? (
          <>
            <CloseButton
              onClick={(e) => {
                e.stopPropagation();
                removeActive();
              }}
            >
              X
            </CloseButton>
            <Input
              type="text"
              name="nickname"
              placeholder="닉네임"
              value={signUpNickname}
              onChange={(e) => setSignUpNickname(e.target.value)}
            />
            <Input
              type="text"
              name="id"
              placeholder="아이디"
              value={signUpId}
              onChange={(e) => setSignUpId(e.target.value)}
            />
            <Input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
            />
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleSignUp(e);
              }}
            >
              가입하기
            </Button>
          </>
        ) : (
          <Icon className="material-icons">가입</Icon>
        )}
      </SignUpBox>
    </Container>
  );
};

export default LoginPage;
