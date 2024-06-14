import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import MyPage from '../pages/MyPage';
import CommitDetail from '../pages/CommitDetail';
import DetailPage from '../pages/DetailPage';
import Test from '../components/Test';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import HomeHeader from '../components/HomeHeader';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import { setSignIn } from '../store/slice/newsFeedSlice';

const EmptySpace = styled.div`
  height: 100px;
`;

const Router = ({ signOut, comments }) => {
  const signIn = useSelector((state) => state.newsFeed.signIn);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error checking session:', error.message);
      } else if (data?.user) {
        dispatch(setSignIn(true));
      }
      setChecked(true);
    };

    checkSession();
  }, [dispatch]);

  if (!checked) {
    return null;
  }

  return (
    <BrowserRouter>
      <HomeHeader signOut={signOut} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={signIn ? <MyPage /> : <Navigate to="/login" />} />
        <Route path="/commitdetail" element={signIn ? <CommitDetail /> : <Navigate to="/login" />} />
        <Route path="/detailpage" element={<DetailPage />} />
        <Route path="/test" element={<Test comments={comments} />} />
        <Route path="/login" element={<LoginPage signOut={signOut} />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      <EmptySpace />
    </BrowserRouter>
  );
};

export default Router;
