/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import styled from 'styled-components';
const { kakao } = window;

const StMap = styled.div`
  width: 100%;
  height: 100%;
  margin: 20px auto;
  border: 1px solid #d8d8d8;
  height: 575px;
`;

export default function MapComponent({ mapData }) {
  const loadMap = async () => {
    if (!kakao || !kakao.maps) {
      console.error('Kakao Maps API를 로드할 수 없습니다.');
      return;
    }

    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
      console.error('지도를 표시할 div 요소를 찾을 수 없습니다.');
      return;
    }

    var map = new kakao.maps.Map(mapContainer, {
      center: new kakao.maps.LatLng(36.2683, 127.6358),
      level: 13
    });

    const addressList = mapData.map((data) => data.address);
    var geocoder = new kakao.maps.services.Geocoder();

    const promises = addressList.map((address) => {
      return new Promise((resolve, reject) => {
        geocoder.addressSearch(address, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            resolve(coords);
          } else {
            reject(new Error(`Failed to get coordinates for address: ${address}`));
          }
        });
      });
    });
    let lattings = await Promise.allSettled(promises);
    lattings = lattings.filter((f) => f.status === 'fulfilled').map((m) => m.value);

    var clusterer = new kakao.maps.MarkerClusterer({
      map: map,
      averageCenter: true,
      minLevel: 10,
      disableClickZoom: true
    });

    var markers = lattings.map(function (data, i) {
      return new kakao.maps.Marker({
        position: data
      });
    });

    clusterer.addMarkers(markers);

    kakao.maps.event.addListener(clusterer, 'clusterclick', function (cluster) {
      var level = map.getLevel() - 1;
      map.setLevel(level, { anchor: cluster.getCenter() });
    });
  };

  useEffect(() => {
    loadMap();
  }, []);

  return <StMap id="map"></StMap>;
}
