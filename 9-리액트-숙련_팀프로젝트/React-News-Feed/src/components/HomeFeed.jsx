import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HomeInput from './HomeInput';
import Footer from './Footer';
import { useSelector, useDispatch } from 'react-redux';
import supabase from '../supabaseClient';
import { fetchPosts, incrementForceRender } from '../store/slice/newsFeedSlice';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomeContent = styled.div`
  margin-top: 40px;
  width: 1200px;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const HomePost = styled.div`
  position: relative;
  margin-top: 10px;
  width: 500px;
  height: 500px;
  margin: 10px;
  box-shadow:
    rgba(0, 0, 0, 0.16) 0px 3px 6px,
    rgba(0, 0, 0, 0.23) 0px 3px 6px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  &:hover {
    transform: scale(1.02);
  }
`;

const HomePostImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;

  padding: 0 20px;
`;

const HomePostOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: #343434;
  color: white;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HomePostUserImage = styled.img`
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
  margin-left: 10px;
`;

const HomePostTitle = styled.h5`
  margin: 0;
  font-size: 20px;
  color: white;
  display: flex;
  justify-content: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;
  // ... 으로 하는 부분 문제있음 (김병준)
`;

const HomePostNicknameContainer = styled.div`
  position: absolute;
  bottom: 70px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 12px;
`;

// 닉네임과 사진을 묶음 (김병준)
const HomePostUserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const HomePostNickname = styled.h5`
  margin-top: 5px;
  font-size: 14px;
  display: flex;
`;

const HomePostCommentCount = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 12px;
`;


const HomePostDate = styled.div`
  display: flex;
  justify-content: center;
  `

const HomePostSolveStatus = styled.div`
  position: absolute;
  top: 10px;
  right: 100px; /* 댓글 개수 옆에 위치하도록 조정 */
  background-color: ${(props) =>
    props.solved ? 'rgba(144, 238, 144, 1)' : 'rgba(255, 182, 193, 1)'};
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 12px;

`;

const MoreButton = styled.button`
  margin-top: 5px;
  padding: 10px 20px;
  background-color: #343434;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CloseButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #343434;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const HomeFeed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);
  const [searchFeed, setSearchFeed] = useState('');
  const [commentCounts, setCommentCounts] = useState({});
  const [userProfiles, setUserProfiles] = useState({});

  const posts = useSelector((state) => state.newsFeed.posts);
  const forceRender = useSelector((state) => state.newsFeed.forceRender);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(incrementForceRender());
  }, [dispatch]);

  // HomeFeed 컴포넌트에서 DetailPage 컴포넌트로 item을 id로 넘기는 함수
  const handleItemSelect = (id) => {
    const item = posts.find((item) => item.id === id);
    navigate('/detailpage', { state: { item } });
  };

  // 각 게시물의 댓글 수를 불러오는 함수
  const fetchCommentCounts = async () => {
    const counts = {};
    for (const post of posts) {
      const { data: comments, error } = await supabase.from('comments').select('id').eq('post_id', post.id);

      if (error) {
        console.error('Error fetching comments:', error);
        continue;
      }
      counts[post.id] = comments.length;
    }
    setCommentCounts(counts);
  };

  // 각 게시물의 작성자 프로필 사진 URL을 불러오는 함수
  const fetchUserProfiles = async () => {
    const profiles = {};
    for (const post of posts) {
      const { data: user, error } = await supabase
        .from('users')
        .select('profilepic')
        .eq('id', post.user_id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user profile:', error);
        continue;
      }

      profiles[post.user_id] =
        (user && user.profilepic) ||
        'https://nozekgjgeindgyulfapu.supabase.co/storage/v1/object/public/profile/default-profile.jpg';
    }
    setUserProfiles(profiles);
  };

  useEffect(() => {
    fetchCommentCounts();
    fetchUserProfiles();
  }, [posts, forceRender]);

  const handleSearch = (feed) => {
    setSearchFeed(feed);
  };

  const filterdPosts = posts.filter(
    (post) =>
      post.title.toString().includes(searchFeed) || post.content.toLowerCase().includes(searchFeed.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 ${hours}시`;
  };

  return (
    <Container>
      <HomeInput onSearch={handleSearch} />
      <HomeContent>
        {filterdPosts.slice(0, showAll ? filterdPosts.length : 2).map((post) => (
          <HomePost key={post.id} onClick={() => handleItemSelect(post.id)}>
            <HomePostImage dangerouslySetInnerHTML={{ __html: post.content }} />
            <HomePostCommentCount>댓글 {commentCounts[post.id] || 0} 개</HomePostCommentCount>
            <HomePostSolveStatus solved={post.isSolved}>
              {post.isSolved ? '해결완료' : '해결중'}
            </HomePostSolveStatus>
            <HomePostOverlay>
              <HomePostNicknameContainer>{post.nickname}</HomePostNicknameContainer>
              <HomePostUserImage src={userProfiles[post.user_id]} alt="User Avatar" />
              <HomePostTitle>{post.title}</HomePostTitle>

              <HomePostDate>{formatDate(post.created_at)}</HomePostDate>
            </HomePostOverlay>
          </HomePost>
        ))}
      </HomeContent>
      {showAll ? (
        <CloseButton onClick={() => setShowAll(false)}>닫기</CloseButton>
      ) : (
        <MoreButton onClick={() => setShowAll(true)}>더보기</MoreButton>
      )}
      <Footer />~
    </Container>
  );
};

export default HomeFeed;
