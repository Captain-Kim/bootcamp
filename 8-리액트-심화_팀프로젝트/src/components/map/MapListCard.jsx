import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { promises } from './Map';
const { kakao } = window;

const List = styled.li`
  width: 343px;
  height: 519px;
  border: 1px solid #b2b9c0;
  border-radius: 16px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  & .date {
    color: #b2b9c0;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    margin-top: 10px;
  }

  & .title {
    color: #495057;
    font-size: 20px;
    font-weight: 600;
    line-height: 32px;
  }

  & .desc {
    color: #1b1d1f;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    height: 48px;

    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: keep-all;
  }

  & .default__btn {
    width: 49%;
    height: 40px;
    border-radius: 8px;
    background-color: #495057;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: 400;
  }

  & .default__btn--delete {
  }

  & .default__btn--mapmove {
  }

  & .card__btns__box {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
  }

  & .card__item {
    width: 100%;
  }

  img {
    width: 300px;
    height: 295px;
    object-fit: cover;
  }
`;

function MapListCard({ places, map }) {
  const navigate = useNavigate();

  const handleMove = async () => {
    const coordinate = await promises(places.address);
    if (map) {
      var moveLatLon = new kakao.maps.LatLng(coordinate.getLat(), coordinate.getLng());
      map.setLevel(5);
      map.panTo(moveLatLon);
    }
  };

  return (
    <>
      {places && (
        <List>
          <img src={places.image} alt={places.name} />
          <div className="card__item">
            <p className="date">{`${places.st_date} ~ ${places.ed_date}`}</p>
            <p className="title">{places.name}</p>
            <p className="desc">{places.description}</p>

            <div className="card__btns__box">
              <button onClick={handleMove} className="default__btn default__btn--mapmove" type="button">
                지역이동
              </button>

              <button
                className="default__btn default__btn--delete"
                type="button"
                onClick={() => navigate(`/detail/${places.post_id}`)}
              >
                상세보기
              </button>
            </div>
          </div>
        </List>
      )}
    </>
  );
}

export default MapListCard;
