import styled from 'styled-components';

const ModalWindow = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s;

  &.open {
    visibility: visible;
    opacity: 1;
    pointer-events: auto;
  }

  & > div {
    width: 400px;
    height: 60vh;
    max-height: 200vh;
    overflow-y: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2em;
    background: white;
    border-radius: 1rem;
  }

  header {
    font-weight: bold;
  }

  h1 {
    font-size: 150%;
    margin: 0 0 15px;
  }
`;

const ModalClose = styled.a`
  color: #aaa;
  line-height: 50px;
  font-size: 80%;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  width: 70px;
  text-decoration: none;

  &:hover {
    color: black;
  }
`;

const ScrollableContent = styled.div`
  max-height: 400px;
  overflow-y: auto;
  margin-top: 20px;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #b3b3b3;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
`;

const SignUpConfirmModal = ({ isOpen, onClose }) => {
  return (
    <ModalWindow className={isOpen ? 'open' : ''}>
      <div>
        <ModalClose href="#" onClick={onClose} title="Close">
          Close
        </ModalClose>
        <h1 style={{ fontWeight: 'bold' }}>함께라서 더 즐거운 Festiall</h1>
        <div>회원가입 시 아래 항목에 동의한 것으로 간주됩니다.</div>
        <ScrollableContent>
          <div>
            우린 더 높이 <br />
            하늘에 닿을 것처럼 외쳐 너를 깨워 <br />
            올려 봐, 노려봐, 넌 내 거니까 다 <br />
            자꾸 널 보면 탐이, 탐이 나 <br />
          </div>
          <br />
          <div>
            해야, 해야, 해야 <br />
            한입에 널 삼킬 때야 (탐이, 탐이 나) <br />
            해야, 해야, 해야 <br />
            이미 내가 이긴 패야 (널 보면 탐이, 탐이 나) <br />
            해야, 해야, 해야 <br />
            뜨겁게 떠오르는 해야 <br />
            별안간 홀린 그 순간 bite <br />
            단 한 번에 난 널 휘리휘리 <br />
            catch ya <br />
          </div>
          <br />
          <img
            src="https://www.viva100.com/mnt/images/file/2024y/05m/09d/2024050901000655400028591.jpg"
            width="200px"
            style={{ borderRadius: '30px', display: 'block', margin: '0 auto' }}
          />
        </ScrollableContent>
      </div>
    </ModalWindow>
  );
};

export default SignUpConfirmModal;