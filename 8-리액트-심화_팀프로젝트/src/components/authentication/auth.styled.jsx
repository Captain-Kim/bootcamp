import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
  height: 100vh;

  @media screen and (min-width: 1024px) {
    height: calc(100vh - 80px);
    overflow: hidden;
    .login__content {
      grid-template-columns: repeat(2, max-content);
      justify-content: center;
      align-items: center;
      margin-left: 10rem;
    }
  }
`;

export const Content = styled.div`
  display: grid;
`;

export const ImgWrapper = styled.div`
  justify-self: center;

  img {
    width: 250px;
  }
`;

export const Forms = styled.div`
  position: absolute;
  top: 24rem;
  width: 100%;
  height: 400px;
  @media screen and (min-width: 576px) {
    width: 400px;
    justify-self: center;
  }
`;

export const Form = styled.form`
  position: absolute;
  top: 0;
  width: 100%;
  background-color: #f2f2f2;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 8px 20px rgba(35, 0, 77, 0.2);
  animation-duration: 0.4s;
  animation-name: animateLogin;

  &.none {
    display: none;
  }

  &.block {
    display: block;
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

export const InputBox = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: 0.5rem;
  padding: 1.125rem 1rem;
  background-color: #fff;
  margin-top: 1rem;
  border-radius: 0.5rem;
`;

export const Icon = styled.i`
  font-size: 1.5rem;
  color: #588157;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  font-size: 0.938rem;
  font-weight: 700;
  color: #23004d;
  width: 100%;

  &::placeholder {
    font-size: 0.938rem;
    font-family: 'Open Sans', sans-serif;
    color: #a49eac;
  }
`;

export const Button = styled.button`
  display: block;
  padding: 1rem;
  margin: 2rem 0;
  background-color: #588157;
  color: #fff;
  font-weight: 600;
  text-align: center;
  border-radius: 0.5rem;
  transition: 0.3s;
  cursor: pointer;
  border: none;
  margin: 20px auto;
  width: 100%;

  &:hover {
    background-color: #65bf97;
  }

  &:disabled {
    background-color: #a5a5a5;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  margin: 10px;
`;

export const KakaoButton = styled.img`
  display: block;
  margin: 10px auto;
  cursor: pointer;
  width: 100%;
  transition: 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

export const AgreementText = styled.p`
  cursor: pointer;
  text-align: right;
  margin-top: 1rem;
  margin-right: 1rem;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;