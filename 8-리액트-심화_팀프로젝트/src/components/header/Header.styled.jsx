import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  height: 80px;
  background-color: #fff;
  border-bottom: 1px solid rgb(237, 237, 237);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 40px;
`;

export const LeftSide = styled.ul`
  width: 50%;
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const RightSide = styled.ul`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  gap: 20px;
`;

export const Logo = styled.img`
  width: 150px;
  height: 45px;
  object-fit: fill;
  cursor: pointer;
`;

export const SearchInput = styled.input`
  width: 90%;
  height: 100%;
  color: rgb(34, 34, 34);
  font-size: 14px;
  border: 0;
  outline: none;
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 15px;

  width: 500px;
  color: rgb(34, 34, 34);
  font-size: 14px;
  line-height: 24px;
  border: 1px solid rgb(237, 237, 237);
  border-radius: 42px;
  background-color: rgb(255, 255, 255);

  button {
    all: unset;
    font-size: 25px;
    cursor: pointer;
  }
`;

export const SearchButton = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

export const Nav = styled(Link)`
  flex: 0 0 auto;
  display: flex;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0px 16px;
  font-size: 14px;
  line-height: 24px;
  font-weight: 700;
  color: rgb(34, 34, 34);
  border: 1px solid rgb(223, 223, 223);
  border-radius: 2px;
  background-color: transparent;
  &:hover {
    background-color: rgb(252, 252, 252);
  }
`;
