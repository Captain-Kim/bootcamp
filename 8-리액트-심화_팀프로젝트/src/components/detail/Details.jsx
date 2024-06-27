import React, { useState, useEffect } from 'react';
import * as S from './Details.styled';
import { useParams } from 'react-router-dom';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useGetPlace from '../../hooks/useGetPlace';
import Button from '../Button/Button';
import { getCurrentUser, handleAddJjim, handleDeleteJjim } from '../api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useGetAllJjim from '../../hooks/useGetAllJjim';
import useGetJjim from '../../hooks/useGetJjim';
import LoadingSpinners from '../Loading/LoadingSpinners';

const Details = () => {
  const festId = useParams().festId;
  const [isStarted, setIsStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [isJiimed, setIsJiimed] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const defaultImageUrl =
    'https://kmfvncclriiektxphias.supabase.co/storage/v1/object/public/images/default/default.jpg?t=2024-06-18T02%3A18%3A29.813Z';

  // 아직 찜 기능 완성 X, 테스트 중..

  const queryClient = useQueryClient();
  const { mutate: jjimAddMutate } = useMutation({
    mutationFn: () => handleAddJjim(festId, currentUser?.id),
    onSuccess: () => {
      queryClient.invalidateQueries(['jjim']);
    }
  });

  const { mutate: jjimDeleteMutate } = useMutation({
    mutationFn: () => handleDeleteJjim(festId, currentUser?.id),
    onSuccess: () => {
      queryClient.invalidateQueries(['jjim']);
    }
  });

  const { data: place, isError, isPending } = useGetPlace(festId);
  const { data: allJjim } = useGetAllJjim();
  const { data: myJjim } = useGetJjim(festId, currentUser?.id);

  useEffect(() => {
    if (place) {
      const today = Date.now();
      const dateStart = Date.parse(place.st_date);
      const dateEnd = Date.parse(place.ed_date);

      setIsStarted(today >= dateStart);
      setIsEnded(today > dateEnd);
    }
    if (place?.address) {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(place?.address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const newCoords = new kakao.maps.LatLng(result[0].y, result[0].x);
          setLat(newCoords.Ma);
          setLng(newCoords.La);
        }
      });
    }
    const checkUser = async () => {
      const gotUser = await getCurrentUser();
      setCurrentUser(gotUser);
    };
    checkUser();
    if (myJjim?.length > 0) setIsJiimed(true);
    else setIsJiimed(false);
  }, [place]);

  useEffect(() => {
    if (myJjim?.length > 0) setIsJiimed(true);
    else setIsJiimed(false);
  }, [myJjim]);

  if (isPending) {
    return <LoadingSpinners />;
  }

  const FestMap = () => {
    return (
      <Map
        center={{ lat, lng }}
        style={{
          width: '500px',
          height: '300px',
          borderRadius: '20px'
        }}
      >
        <MapMarker position={{ lat, lng }}></MapMarker>
      </Map>
    );
  };

  if (isPending) {
    return (
      <>
        <S.Section>
          <S.TitleDiv>
            <S.FestState></S.FestState>
            <S.FestTitle></S.FestTitle>
            <S.FestOutline> | 0000.00.00 ~ 0000.00.00</S.FestOutline>
          </S.TitleDiv>
          <S.ContentsDiv>
            <S.ImageDiv>
              <S.Image src={defaultImageUrl} alt="행사 이미지" />
            </S.ImageDiv>
            <S.TextDiv>
              <S.ButtonDiv>
                <S.H3>행사정보</S.H3>
                <Button></Button>
              </S.ButtonDiv>
              <br />
              <S.H4></S.H4>
            </S.TextDiv>
            <S.DetailDiv>
              <S.DescriptionDiv>
                <S.LabelUl>
                  <S.ContentLi>
                    <S.Label> </S.Label>
                    <S.Span></S.Span>{' '}
                  </S.ContentLi>
                  <S.ContentLi>
                    <S.Label> </S.Label>
                    <S.Span></S.Span>{' '}
                  </S.ContentLi>
                  <S.ContentLi>
                    <S.Label> </S.Label>
                    <S.Span></S.Span>{' '}
                  </S.ContentLi>
                  <S.ContentLi>
                    <S.Label> </S.Label>
                    <S.Span></S.Span>
                  </S.ContentLi>
                  <S.ContentLi>
                    <S.Label> </S.Label> <S.Span></S.Span>
                  </S.ContentLi>
                  <S.ContentLi>
                    <S.Label> </S.Label> <S.Span></S.Span>
                  </S.ContentLi>
                </S.LabelUl>
              </S.DescriptionDiv>
              <FestMap></FestMap>
            </S.DetailDiv>
          </S.ContentsDiv>
        </S.Section>
      </>
    );
  }
  if (isError) return <div>데이터를 불러오는 데 실패했습니다</div>;

  return (
    <>
      <S.Section>
        <S.TitleDiv>
          <S.FestState $bgColor={isStarted ? (isEnded ? '#495057' : '#a7c957') : '#495057'}>
            {isStarted ? (isEnded ? '종료' : '진행 중') : '진행 전'}
          </S.FestState>
          <S.FestTitle>{place?.name}</S.FestTitle>
          <S.FestOutline>
            {place?.region} | {place?.st_date} ~ {place?.ed_date}
          </S.FestOutline>
        </S.TitleDiv>
        <S.ContentsDiv>
          <S.ImageDiv>
            <S.Image src={place?.image || defaultImageUrl} alt="행사 이미지" />
          </S.ImageDiv>
          <S.TextDiv>
            <S.ButtonDiv>
              <S.H3>행사정보</S.H3>
              {currentUser ? (
                isJiimed ? (
                  <Button bgColor="red" onClick={jjimDeleteMutate}>
                    찜 취소
                  </Button>
                ) : (
                  <Button bgColor="green" onClick={jjimAddMutate}>
                    찜 하기
                  </Button>
                )
              ) : (
                ''
              )}
            </S.ButtonDiv>
            <br />
            <S.H4>{place?.description}</S.H4>
          </S.TextDiv>
          <S.DetailDiv>
            <S.DescriptionDiv>
              <S.LabelUl>
                <S.ContentLi>
                  <S.Label>카테고리 </S.Label>
                  <S.Span>{place?.category}</S.Span>{' '}
                </S.ContentLi>
                <S.ContentLi>
                  <S.Label>시작일 </S.Label>
                  <S.Span>{place?.st_date}</S.Span>{' '}
                </S.ContentLi>
                <S.ContentLi>
                  <S.Label>종료일 </S.Label>
                  <S.Span>{place?.ed_date}</S.Span>{' '}
                </S.ContentLi>
                <S.ContentLi>
                  <S.Label>주소 </S.Label>
                  <S.Span>{place?.address}</S.Span>
                </S.ContentLi>
                <S.ContentLi>
                  <S.Label>이용요금</S.Label> <S.Span>{place?.pricing}</S.Span>
                </S.ContentLi>
                <S.ContentLi>
                  <S.Label>이용가능 시간</S.Label>{' '}
                  <S.Span>
                    {place?.st_time.substr(0, 5)}~{place?.ed_time.substr(0, 5)}
                  </S.Span>
                </S.ContentLi>
              </S.LabelUl>
            </S.DescriptionDiv>
            <FestMap></FestMap>
          </S.DetailDiv>
        </S.ContentsDiv>
      </S.Section>
    </>
  );
};

export default Details;
