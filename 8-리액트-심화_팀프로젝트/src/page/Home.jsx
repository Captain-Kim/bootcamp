import { useEffect, useState } from 'react';
import styled from 'styled-components';
import checkSignIn from '../components/authentication/checkSignIn';
import CatagoryBar from '../components/main/CatagoryBar';
import useFileterStore from '../store/useFileterStore';

import Map from '../components/map/Map';
import MapListCard from '../components/map/MapListCard';
import usePlaces from '../hooks/usePlaces';
import useAuthStore from '../store/store';
import LoadingSpinners from '../components/Loading/LoadingSpinners';

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  height: calc(100vh - 146px);
  .map__ul__wrap {
    width: 400px;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    padding: 20px 0;

    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-track {
      background-color: gray;
    }
    &::-webkit-scrollbar-thumb {
      background-color: skyblue;
    }
    &::-webkit-scrollbar-button {
      display: none;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: blue;
      transition: all 0.2s;
    }

    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
    }

    & > li:not(:last-child) {
      margin-bottom: 20px;
    }
  }
`;

function Home() {
  const isSignedIn = useAuthStore((state) => state.isSignedIn);
  const filteredData = useFileterStore((state) => state.filteredData);
  const [map, setMap] = useState(null);

  useEffect(() => {
    checkSignIn();
  }, []);

  const { data: places, error, isLoading } = usePlaces();

  if (isLoading) {
    return <LoadingSpinners />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleMapLoad = (loadedMap) => {
    setMap(loadedMap);
  };

  return (
    <>
      <CatagoryBar />
      <Wrap>
        <ul className="map__ul__wrap">
          {filteredData && filteredData.map((data, idx) => (
            <MapListCard key={idx} places={data} map={map} />
          ))}
        </ul>
        <Map places={filteredData} onMapLoad={handleMapLoad} />
      </Wrap>
    </>
  );
}

export default Home;
