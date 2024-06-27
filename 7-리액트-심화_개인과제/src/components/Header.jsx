import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';


const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 15px 30px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  // width: 100%;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  margin-right: 25px;
  font-size: 18px;
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 15px;
  border: 2px solid #ddd;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;

const Username = styled.span`
  font-size: 18px;
  color: white;
  margin-right: 15px;
  font-weight: 600;
`;

const LogoutButton = styled.button`
  padding: 8px 15px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e60000;
  }
`;

const Header = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <HeaderContainer>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/mypage">내 프로필</NavLink>
      </NavLinks>
      <ProfileContainer>
        <ProfileImage src={user && user.avatar} alt="Profile" />
        <Username>{user ? user.nickname : '로그인 필요'}</Username>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </ProfileContainer>
    </HeaderContainer>
  );
};

export default Header;
