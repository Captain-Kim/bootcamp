import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinners from '../Loading/LoadingSpinners';
import supabase from '../api/supabaseClient';
import useDebounce from '../../hooks/useDebounce';
import usePlaces from '../../hooks/usePlaces';
import {
  Container,
    Header,
    Logo,
    SearchBar,
    EventList,
    EventItem,
    EventDetails,
    ButtonGroup,
    Button,
} from './Admin.styled';


const Admin = () => {
  const { data, error, isLoading } = usePlaces();
  const [places, setPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000); // apply useDebounce
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setPlaces(data);
    }
  }, [data]);

  if (isLoading) {
    return <LoadingSpinners />;
  }
  if (error) return <Container>데이터 불러오다 에러가 났습니다.</Container>;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPlaces = places.filter((place) => place.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));

  const handleItemClick = (postId) => {
    navigate(`/adminpost/${postId}`);
  };

  const handleDelete = async (postId) => {
    const isConfirmed = window.confirm('정말 삭제하시겠습니까?');
    if (isConfirmed) {
      try {
        const { error } = await supabase.from('places').delete().eq('post_id', postId);

        if (error) {
          throw error;
        }

        alert('삭제되었습니다.');
        setPlaces(places.filter((place) => place.post_id !== postId));
      } catch (error) {
        console.error('삭제 실패:', error.message);
        alert(`삭제에 실패하였습니다: ${error.message}`);
      }
    }
  };

  const handlePostPage = () => {
    navigate(`/adminpost`);
  };

  return (
    <Container>
      <Header>
        <Logo>관리자 페이지</Logo>
        <SearchBar
          type="text"
          placeholder="찾을 행사 제목을 입력하세요."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button onClick={handlePostPage}>게시글 작성</Button>
      </Header>
      <EventList>
        {filteredPlaces.map((place) => (
          <EventItem key={place.post_id}>
            <EventDetails onClick={() => handleItemClick(place.post_id)}>{place.name}</EventDetails>
            <ButtonGroup>
              <Button onClick={() => handleItemClick(place.post_id)}>수정</Button>
              <Button onClick={() => handleDelete(place.post_id)}>삭제</Button>
            </ButtonGroup>
          </EventItem>
        ))}
      </EventList>
    </Container>
  );
};

export default Admin;
