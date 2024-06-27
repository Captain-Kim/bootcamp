import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../api/supabaseClient';
import signInWithKakao from './signInWithKakao';
import SignUpConfirmModal from './SignUpConfirmModal';
import {
  Container,
  Content,
  ImgWrapper,
  Forms,
  Form,
  Title,
  InputBox,
  Icon,
  Input,
  Button,
  ErrorMessage,
  KakaoButton,
  AgreementText
} from './auth.styled';

const ErrorMessages = ({ messages }) => {
  return (
    <>
      {messages.map((message, index) => (
        <ErrorMessage key={index}>{message}</ErrorMessage>
      ))}
    </>
  );
};

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const newErrorMessages = [...errorMessages];
    if (!validateEmail(e.target.value)) {
      newErrorMessages[0] = '이메일 형식을 확인해주세요.';
    } else {
      newErrorMessages[0] = '';
    }
    setErrorMessages(newErrorMessages);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const newErrorMessages = [...errorMessages];
    if (e.target.value.length < 6) {
      newErrorMessages[1] = '비밀번호는 6자리 이상으로 설정해주세요';
    } else {
      newErrorMessages[1] = '';
    }
    setErrorMessages(newErrorMessages);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    const newErrorMessages = [...errorMessages];
    if (password !== e.target.value) {
      newErrorMessages[2] = '비밀번호가 일치하지 않습니다';
    } else {
      newErrorMessages[2] = '';
    }
    setErrorMessages(newErrorMessages);
  };

  useEffect(() => {
    const isFormValid = () => {
      const isPasswordsMatching = password === confirmPassword;
      const isEmailValid = validateEmail(email);
      const isFieldsFilled = email && password && confirmPassword;
      return isFieldsFilled && isPasswordsMatching && isEmailValid && !errorMessages.some(message => message !== '');
    };

    setIsButtonDisabled(!isFormValid());
  }, [email, password, confirmPassword, errorMessages]);

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
      });

      if (error) {
        throw error;
      }

      const userId = data.user.id;
      const userEmail = data.user.email;

      const { data: insertData, error: insertError } = await supabase.from('Users').insert([{ user_id: userId, email: userEmail }]);

      if (insertError) {
        throw insertError;
      }

      alert(`${data.user.email} 님 회원가입을 축하드립니다!`);
      navigate('/');
    } catch (error) {
      const signUpError = `회원가입 중 에러가 발생했습니다.: ${error.message}`;
      setErrorMessages([signUpError]);
      console.error(signUpError);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Content>
        <ImgWrapper>
          <img
            src="https://kmfvncclriiektxphias.supabase.co/storage/v1/object/public/images/public/Festiall_Model.png?t=2024-06-18T03%3A56%3A18.517Z"
            alt="user login"
          />
        </ImgWrapper>
        <Forms>
          <Form className="block" id="login-up" onSubmit={handleSignUp}>
            <Title>회원가입 페이지</Title>
            <InputBox>
              <Icon className="bx bx-at"></Icon>
              <Input type="email" placeholder="이메일" value={email} onChange={handleEmailChange} />
            </InputBox>
            <InputBox>
              <Icon className="bx bx-lock"></Icon>
              <Input type="password" placeholder="비밀번호" value={password} onChange={handlePasswordChange} />
            </InputBox>
            <InputBox>
              <Icon className="bx bx-lock"></Icon>
              <Input
                type="password"
                placeholder="비밀번호 재입력"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </InputBox>
            
            <ErrorMessages messages={errorMessages.filter(message => message !== '')} />

            <AgreementText onClick={openModal}>회원가입 약관 확인하기</AgreementText>
            <Button type="submit" disabled={isButtonDisabled}>
              회원가입
            </Button>
            <KakaoButton src="src/assets/kakao_login_medium_wide.png" onClick={signInWithKakao} />

          </Form>
        </Forms>
      </Content>
      <SignUpConfirmModal isOpen={isModalOpen} onClose={closeModal} />
    </Container>
  );
};

export default SignUp;