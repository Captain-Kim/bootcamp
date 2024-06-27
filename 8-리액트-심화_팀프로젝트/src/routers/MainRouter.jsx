import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import SignUp from "../components/authentication/SignUp";
import Login from "../components/authentication/Login";
import DetailPage from "../page/DetailPage";
import DefaultLayout from "../layouts/DefaultLayout";
import AdminPost from "../components/Admin/AdminPost";
import Admin from "../components/Admin/Admin";
import Introduction from '../components/authentication/Introduction';
import MyPage from '../page/MyPage';
import { AdminRouters } from "./AdminRouters";
import PrivateRouters from "./PrivateRouters";
import PublicRouters from "./PublicRouters";

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      // 여기에 각자 페이지 연결해주시면 됩니다!
      { path: "/", element: <Home /> },

      { path: "/detail/:festId", element: <DetailPage /> },
      {
        element: <PublicRouters />, children: [
          { path: "/login", element: <Login /> },
          { path: "/signup", element: <SignUp /> },
          { path: '/introduction', element: <Introduction /> },
        ]
      },
      {
        element: <PrivateRouters />, children: [
          { path: '/mypage', element: <MyPage /> },
        ]
      },
      {
        element: <AdminRouters />, children: [
          { path: "/adminpage", element: <Admin /> },
          { path: "/adminpost", element: <AdminPost /> },
          { path: "/adminpost/:postId", element: <AdminPost /> },
        ]
      },
    ]
  }
]);

export default function MainRouter() {
  return <RouterProvider router={router} />;
}
