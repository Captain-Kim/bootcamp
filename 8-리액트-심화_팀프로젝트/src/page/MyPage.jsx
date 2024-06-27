import styled from 'styled-components';
import MapComponent from '../components/mypage/MapComponent';
import supabase from '../components/api/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import LoadingSpinners from '../components/Loading/LoadingSpinners';

function MyPage() {
  const navigate = useNavigate();
  const selectMapData = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    const { data: teamData } = await supabase.from('hearts').select('*, places(*)').eq('user_id', user.id);
    return teamData.map((data) => data.places);
  };

  const { data: mapData, isPending } = useQuery({
    queryKey: ['teamData'],
    queryFn: selectMapData
  });

  if (isPending) {
    return <LoadingSpinners />;
  }

  return (
    <StWrap>
    <StContainer>
      <StLeftBox>
        <StTitleLeft>내가 찜한 축제</StTitleLeft>
        <MapComponent mapData={mapData} />
      </StLeftBox>
      <StRightBox>
        <StGraphTitle>
          <p style={{ width: '30%' }}>포스터</p>
          <p style={{ width: '35%' }}>축제이름</p>
          <p style={{ width: '25%' }}>축제일정</p>
        </StGraphTitle>
        <StGraphSrollBox>
          {mapData.map((data, index) => (
            <StGraphBox key={index} onClick={() => navigate(`/detail/${data.post_id}`)}>
              <StGraphImg src={data.image} />
              <p style={{ width: '30%' }}>{data.name}</p>
              <div>
                <p>{data.st_date}</p>
                <p>~ {data.ed_date}</p>
              </div>
            </StGraphBox>
          ))}
        </StGraphSrollBox>
      </StRightBox>
    </StContainer>
    </StWrap>
  );
}

export default MyPage;
const StWrap = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StContainer = styled.div`
  width: 80%;
  height: 700px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2%;
  background-color: white;
  border-radius: 15px;
  padding: 2%;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;;
`;
const StLeftBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const StTitleLeft = styled.h2`
  font-size: 1.5rem;
`;
const StRightBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 615px;
  overflow-y: auto;
`;
const StGraphTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 40px auto;
  border-bottom: 2px solid #000;
  padding-bottom: 10px;
  justify-content: space-around;

  p {
    text-align: center;
    word-wrap: break-word;
    font-size: 1.2rem;
  }
`;
const StGraphSrollBox = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;
const StGraphBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  white-space: nowrap;
  margin: 10px auto;
  cursor: pointer;
  p {
    white-space: pre-wrap;
    text-align: center;
    line-height: 26px;
    max-width: 170px;
    font-size: 1.1rem;
  }
`;
const StGraphImg = styled.img`
  width: 150px;
  height: 150px;
  text-align: center;
`;
