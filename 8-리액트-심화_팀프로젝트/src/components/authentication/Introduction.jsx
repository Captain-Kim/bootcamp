import React, { useEffect, useState, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const effects = [
  '어디론가 떠나고 싶나요?', 
  '소중한 사람들과 추억을 남기고 싶나요?', 
  '그렇다면 지금 당장', 
  'Festiall로 숨 참고 Love Dive'
];

const gradients = [
  ['#2F7336', '#073b4c'],
  ['#AAFFA9', '#5A3F37'],
  ['#00467F', '#A5CC82']
];

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const blinkAnimation = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const Container = styled.div`
  height: 100vh;
  overflow: auto;
  scroll-snap-type: y mandatory;
`;

const Page = styled.div`
  height: 100vh;
  width: 100vw;
  scroll-snap-align: center;
  font-size: 3rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: #fff;
  background: linear-gradient(270deg, ${props => props.$startColor}, ${props => props.$endColor});
  background-size: 400% 400%;
  animation: ${gradientAnimation} 4s ease infinite;

  @media (min-width: 768px) {
    font-size: 5rem;
  }
`;

const Text = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  ${({ effect }) => effect && css`
    &.text--${effect} {
      &.out .char {
        opacity: 0;
        transition: opacity 0.5s;
      }
      &.in .char {
        opacity: 1;
        transition: opacity 0.5s;
      }
    }
  `}
`;

const Char = styled.span`
  display: inline-block;
  white-space: pre;
`;

const LastPageText = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  cursor: pointer;
  animation: ${({ $visible }) => $visible ? 'fadeIn 2s forwards, blink 2s infinite' : 'none'};

  &.text--scroll {
    &.out .char {
      opacity: 0;
      transition: opacity 0.5s;
    }
    &.in .char {
      opacity: 1;
      transition: opacity 0.5s;
    }
  }

  &:hover {
    transform: scale(1.1);
    transition: transform 0.3s;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  @keyframes blink {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }
`;

const ScrollHint = styled.div`
  position: absolute;
  top: 10%;
  font-size: 1.5rem;
  animation: ${blinkAnimation} 2s infinite;
`;

const Introduction = () => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hoverVisible, setHoverVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (container) {
        const position = container.scrollTop;
        const maxScroll = container.scrollHeight - container.clientHeight;
        setScrollPosition(position);
        if (position >= maxScroll) {
          setHoverVisible(true);
        } else {
          setHoverVisible(false);
        }
      }
    };

    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const renderText = (text, effect) => (
    <Text className={`text text--${effect} ${scrollPosition > 0 ? 'in' : 'out'}`}>
      {text.split('').map((char, index) => (
        <Char key={index}>{char}</Char>
      ))}
    </Text>
  );

  const renderLastPageText = (text) => (
    <LastPageText className={`text text--scroll ${hoverVisible ? 'in' : 'out'}`} $visible={hoverVisible} onClick={() => navigate('/signup')}>
      {text.split('').map((char, index) => (
        <Char key={index}>{char}</Char>
      ))}
    </LastPageText>
  );

  return (
    <Container ref={containerRef}>
      <Page $startColor="#6be585" $endColor="#2C7744">
        <ScrollHint>딩동~💌 Festiall이 보낸 메시지가 도착했어요. 굴려굴려 스크롤</ScrollHint>
        {renderText('왜 표정이 안 좋나요?', 'scroll')}
      </Page>
      {effects.map((effect, index) => {
        const gradient = gradients[index % gradients.length];
        return (
          <Page key={index} $startColor={gradient[0]} $endColor={gradient[1]}>
            {renderText(effect.charAt(0).toUpperCase() + effect.substr(1), effect)}
          </Page>
        );
      })}
      <Page $startColor="#2C7744" $endColor="#6be585">
        {renderLastPageText('회원가입 하러 가기!')}
      </Page>
    </Container>
  );
};

export default Introduction;