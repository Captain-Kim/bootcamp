import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setSignIn } from './../store/slice/newsFeedSlice';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 500px;
  margin: 50px auto;
  border: 5px solid #4854847c;
  box-sizing: border-box;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 8px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  margin: 5px;
  padding: 5px 15px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const supabase = createClient(
  'https://nozekgjgeindgyulfapu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vemVrZ2pnZWluZGd5dWxmYXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcxNDI1MDEsImV4cCI6MjAzMjcxODUwMX0.Wu1dt8WSMSro-_ieydr-ghmfcKPr568Ovm6dfzgrB00'
);

const LoginPage = ({ signOut }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const signIn = useSelector((state) => state.newsFeed.signIn);

  const signInWithEmailPassword = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) {
        throw error;
      }

      const user = data.user;
      const { data: userMetadata, error: userMetadataError } = await supabase
        .from('users')
        .select('nickname')
        .eq('id', user.id)
        .single();

      if (userMetadataError) {
        throw userMetadataError;
      }

      dispatch(setSignIn(true));
      alert(`${userMetadata.nickname}님 환영합니다.`);
      navigate('/');
    } catch (error) {
      console.error('로그인 중 오류 발생:', error.message);
      alert('로그인 오류 발생! 존재하지 않는 아이디, 비밀번호입니다.');
    }
  };

  async function signInWithGithub() {
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: 'github'
    });

    if (error) {
      console.error('깃허브 로그인 에러', error.message);
      alert('로그인 오류가 발생하였습니다, 다시 시도해주세요.');
      return
    }
    console.log('OAuth 데이터:', data);

    if (data) {
      dispatch(setSignIn(true));
      navigate('/');
    } else {
      alert('회원가입이 필요합니다.');
      navigate('/signup');
    }
  }

  console.log(signIn);
  return (
    <Container>
      <Title>로그인 페이지</Title>
      {signIn ? (
        <>
          <p>환영합니다!</p>
          <Button onClick={signOut}>로그아웃</Button>
        </>
      ) : (
        <Form onSubmit={signInWithEmailPassword}>
          <Label htmlFor="email">아이디:</Label>
          <Input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Label htmlFor="password">비밀번호:</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">로그인</Button>
          <Button type="button" onClick={signInWithGithub}>
            GitHub로 로그인
          </Button>
          <Button type="button" onClick={() => navigate('/signup')}>
            회원가입
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default LoginPage;
