import { FadeLoader } from 'react-spinners';
import styled from 'styled-components';

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function LoadingSpinners() {
  return (
    <Wrap>
      <FadeLoader color="#4D607B" />
    </Wrap>
  );
}

export default LoadingSpinners;
