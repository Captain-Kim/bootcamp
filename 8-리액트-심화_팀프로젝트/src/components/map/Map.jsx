import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const { kakao } = window;

const StMap = styled.div`
  width: calc(100% - 400px);
  height: 100%;
  z-index: 0;
`;

var geocoder = new kakao.maps.services.Geocoder();

export const promises = (address) => {
  return new Promise((resolve, reject) => {
    geocoder.addressSearch(address, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        return resolve(coords);
      } else {
        reject(`Failed to get coordinates for address: ${address}`);
      }
    });
  });
};

export default function Map({ places, onMapLoad }) {
  const [location, setLocation] = useState({
    center: { lat: 36.2683, lng: 127.6358 }
  });

  const mapRef = useRef(null);

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
      center: new kakao.maps.LatLng(location.center.lat, location.center.lng),
      level: 12
    });

    mapRef.current = map;
    if (onMapLoad) {
      onMapLoad(map);
    }

    const addressList = places.map((data) => data.address);
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
    if (places && places.length > 0) {
      loadMap();
    }
  }, [places]);

  return <StMap id="map"></StMap>;
}
