import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import MyPage from "./pages/MyPage";
import Login from "./pages/LoginPage";
import { jsonApi } from "../api";
import { useQuery } from '@tanstack/react-query';

import { useDispatch, useSelector } from "react-redux";
import { loadUserFromStorage } from "../redux/authSlice";

function App() {

  const dispatch = useDispatch();
  const { isAuthenticated, user, nickname } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  const { data: expenses, error, isLoading } = useQuery({
    queryKey: ['expenses'],
    queryFn: async () => {
      const { data } = await jsonApi.get('/expenses');
      return data;
    },
    staleTime: Infinity
  });

  if (isLoading) return <div>로딩중입니다</div>;
  if (error) return <div>에러 발생 : {error.massage}</div>;
  console.log('json 서버에서 불러온 데이터입니다요 =>', expenses);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  const PublicRoute = ({ element }) => {
    return !isAuthenticated ? element : <Navigate to="/mypage" />;
  };

  return (
    <BrowserRouter>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={<PrivateRoute element={<Home expenses={expenses} />} />}
            />
            <Route
              path="/detail/:id"
              element={<PrivateRoute element={<Detail expenses={expenses} />} />}
            />
            <Route path="/login"
              element={<PublicRoute element={<Login />} />} />
            <Route path="/mypage"
              element={<PrivateRoute element={<MyPage />} />} />
          </Routes>
        </Layout>
    </BrowserRouter>
  );
}

export default App;
