import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Header = styled.div`
  padding: 0;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #000000;
  box-shadow: 0 4px 2px -2px gray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
`;

const HeaderBtns = styled.div`
  /* position: absolute;
  right: 20px; */
  display: ${(props) => (props.hide === 'true' ? 'none' : 'flex')};
`;

const HeaderBtn = styled.button`
  /* margin-right: 50px; */
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  margin-right: 20px;
  transition: 0.5s;
  background-image: linear-gradient(to right, #a1c4fd 0%, #c2e9fb 51%, #a1c4fd 100%);
  text-align: center;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  font-weight: bold;
  border-radius: 10px;

  &:hover {
    background-position: right center;
    background-image: linear-gradient(to right, #a1c4fd 0%, #c2e9fb 51%, #a1c4fd 100%);
  }
`;

// const HomeImage = styled.img`
//   position: absolute;
//   left: 20px;
//   width: 40px;
//   height: 40px;
//   cursor: pointer;
//   display: ${(props) => (props.hide === 'true' ? 'none' : 'flex')};
// `;

const Logo = styled(Link)`
  font-size: 28px;
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding-left: 20px;
`;

const HomeHeader = ({ signOut }) => {
  const [hideButtons, setHideButtons] = useState(false);
  const signIn = useSelector((state) => state.newsFeed.signIn);

  const checkZoom = () => {
    const zoomLevel = Math.round((window.outerWidth / window.innerWidth) * 100);
    //이 비율에 100을 곱하고 소수점을 반올림하여 줌 레벨을 백분율로 계산, 줌 레벨이 150%라면 이 값은 150이 됨
    setHideButtons(zoomLevel >= 150);
  };

  // window.outerWidth 브라우저 창의 외부 너비를 픽셀 단위로 반환. 브라우저 창의 전체 너비(스크롤바와 도구 모음 포함)
  // window.innerWidth 브라우저 창의 내부 너비를 픽셀 단위로 반환. 이는 스크롤바를 제외한 창의 콘텐츠 영역의 너비

  useEffect(() => {
    window.addEventListener('resize', checkZoom);
    checkZoom();

    return () => {
      window.removeEventListener('resize', checkZoom);
    };
  }, []);

  const navigate = useNavigate();

  const moveMyPage = () => {
    navigate('/mypage');
  };

  // const moveHome = () => {
  //   navigate('/');
  // };

  const moveLogin = () => {
    navigate('/login');
  };

  const moveCommitDetail = () => {
    console.log('Before signIn=', signIn);
    navigate('/commitdetail');
    console.log('After signIn=', signIn);
  };

  return (
    <>
      <Header>
        {/* <HomeImage onClick={moveHome} hide={hideButtons ? 'true' : 'false'} /> */}

        <Logo className="header__logo" to="/">
          Our Knowledge
        </Logo>
        <HeaderBtns hide={hideButtons ? 'true' : 'false'}>
          {signIn ? (
            <>
              <HeaderBtn onClick={signOut}>로그아웃</HeaderBtn>
              <HeaderBtn onClick={moveCommitDetail}>글쓰기</HeaderBtn>
            </>
          ) : (
            <HeaderBtn onClick={moveLogin}>로그인</HeaderBtn>
          )}
          <HeaderBtn onClick={moveMyPage}>마이페이지</HeaderBtn>
        </HeaderBtns>
      </Header>
    </>
  );
};

export default HomeHeader;
