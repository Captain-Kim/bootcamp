import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState, useEffect, useCallback } from 'react';
import supabase from '../supabaseClient';
import Modal from '../components/Modal';
import ImgUpload from '../components/ImgUpload';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 60px;

  display: flex;
  flex-direction: column;
`;

const Profiles = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px auto 0 auto;
  border-bottom: 1px solid black;
  width: 450px;
`;

const Profile = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 20px;
`;
const Nickname = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 90px;
  height: 90px;
  font-size: 30px;
`;

const Notes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
  margin: 100px auto;
`;
const Note = styled.div`
  display: flex;
  flex-direction: column;
  width: 15.625rem;
  height: 15.625rem;
  background-color: #d9d9d9;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 25px;
  &:hover {
    cursor: pointer;
    background-color: #b9b9b9a6;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
`;

const MyPage = () => {
  const [postList, setPostList] = useState([]);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [nameModal, setNameModal] = useState(false);
  const navigate = useNavigate();

  const getUserNickname = useCallback(async (userId) => {
    if (!userId) return; // userId가 없으면 함수 종료
    const { data: userNickName, error: userNickNameError } = await supabase
      .from('users')
      .select('nickname')
      .eq('id', userId)
      .single();
    if (userNickNameError) {
      console.error('Error fetching nickname:', userNickNameError);
    } else {
      setUserName(userNickName.nickname);
    }
  }, []);
  console.log(user);
  useEffect(() => {
    const fetchUser = async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (authData?.user) {
        setUser(authData.user);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchPostsAndNickname = async () => {
        const userId = user.id;

        // 사용자 닉네임 가져오기
        getUserNickname(userId);

        // 게시물 가져오기
        const { data: posts, error } = await supabase
          .from('posts')
          .select('id, title, created_at, content, user_id')
          .eq('user_id', userId)
          .order('created_at', {
            ascending: false
          });

        if (error) {
          console.error('Error fetching posts', error);
        } else {
          setPostList(posts);
        }
      };
      fetchPostsAndNickname();
    }
  }, [user, getUserNickname]);

  const changeName = () => {
    setNameModal(true);
  };

  // 마이페이지 아이템 넘기기용 함수 (김병준)
  const handleItemSelect = (id) => {
    const item = postList.find((item) => item.id === id);
    navigate('/detailpage', { state: { item } });
  };

  return (
    <Container>
      <Profiles>
        <Profile>
          <ImgUpload user={user} setUser={setUser} />
        </Profile>
        <Profile>{userName || user?.user_metadata.user_name}</Profile>
        <Profile>
          <Nickname onClick={changeName}>✒️</Nickname>
          {nameModal && (
            <Modal
              open={nameModal}
              close={() => {
                setNameModal(false);
              }}
              userName={userName}
              setUserName={setUserName}
            />
          )}
        </Profile>
      </Profiles>
      <Notes>
        {postList && postList.length > 0 ? (
          postList.map((post) => {
            return (
              <Note key={post.id} onClick={() => handleItemSelect(post.id)}>
                <Content>{post.title}</Content>
              </Note>
            );
          })
        ) : (
          <Link to={'/CommitDetail'} style={{ textDecoration: 'none', color: 'black' }}>
            <Note>
              <Content>첫 글을 작성해보세요</Content>
            </Note>
          </Link>
        )}
      </Notes>
    </Container>
  );
};

export default MyPage;
