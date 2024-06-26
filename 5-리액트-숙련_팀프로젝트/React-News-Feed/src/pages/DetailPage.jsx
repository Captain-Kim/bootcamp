import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import supabase from '../supabaseClient';
import CommentsSection from '../components/CommentsSection';
import { fetchPosts } from '../store/slice/newsFeedSlice';

const Wrap = styled.div`
  * {
    padding: 0;
    margin: 0;
  }

  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  & h1 {
    font-size: 28px;
    font-weight: bold;
  }

  .detail__wrap {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;

    .detail__post__ul {
      width: 100%;
      display: flex;
      align-items: center;
    }

    .detail__post__list {
      width: 100%;
      height: 200px;
      display: flex;
      align-items: center;

      .post__list__content > *:not(:first-child) {
        margin-top: 12px;
      }

      > img {
        width: 140px;
        height: 140px;
        margin-right: 50px;
        border-radius: 50%; /* 동그랗게 설정 */
        object-fit: cover; /* 이미지 크기 조절 */
      }

      .post__title {
        font-size: 20px;
        font-weight: 500;
      }

      .user__name {
        font-size: 14px;
        font-weight: 400;
        color: #8e8e8e;
      }

      .post__date {
        font-size: 13px;
        font-weight: 400;
      }
    }
  }

  .post__content__box {
    border: 1px solid #000000;
    min-height: 800px;
    padding: 40px;
    overflow: auto; /* 스크롤 가능하도록 설정 */
    max-width: 100%;
    word-break: break-word; /* 긴 단어가 박스를 넘지 않도록 설정 */
    border-radius: 20px;
    margin-bottom: 20px;
  }

  .detail__post__btns {
    display: flex;

    > button {
      padding: 0 20px;
      width: 100px;
      height: 35px;
      border: none;
      border-radius: 5px;
      font-size: 12px;
      cursor: pointer;
    }

    > button:last-child {
      margin-left: 10px;
    }
  }

  .post__solve_status {
    padding: 0 20px;
    width: 100px;
    height: 35px;
    border: none;
    border-radius: 5px;
    font-size: 12px;
    cursor: pointer;
    margin-right: 10px;
    background-color: ${(props) =>
      props.solved ? 'rgba(144, 238, 144, 0.5)' : 'rgba(255, 182, 193, 0.5)'};
    color: white;
  }
`;

const DetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { item } = location.state || {};
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState();
  const [profilePic, setProfilePic] = useState('');
  const [lastClicked, setLastClicked] = useState(null);
  const [isSolved, setIsSolved] = useState(item ? item.isSolved : false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase.from('users').select('*');
        if (error) {
          throw error;
        }
        setUsers(data);
        console.log('디테일 컴포넌트에서 새로 받은 users 테이블 =>', data);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (item) {
      const fetchUserProfile = async () => {
        try {
          const { data, error } = await supabase.from('users').select('profilepic').eq('id', item.user_id).single();

          if (error) {
            throw error;
          }

          setProfilePic(
            data.profilepic ||
              'https://nozekgjgeindgyulfapu.supabase.co/storage/v1/object/public/profile/default-profile.jpg'
          );
        } catch (error) {
          console.error('Error fetching user profile:', error.message);
        }
      };

      fetchUserProfile();
    }
  }, [item]);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      setCurrentUser(user);
    };

    getUser();
  }, []);

  const handleEdit = (post) => {
    let nowUser = currentUser.id;
    let authorUser = item.user_id;
    console.log('지금 이 글 보고있는 사람 ID:', nowUser, '데이터 타입은: ', typeof nowUser);
    console.log('글쓴 사람 ID:', authorUser, '데이터 타입은: ', typeof authorUser);
    console.log('두 사람이 같은 사람인지 확인:', nowUser === authorUser);
    console.log('길이 비교 - 현재 사용자:', nowUser.length, '작성자:', authorUser.length);

    if (currentUser && nowUser === authorUser) {
      navigate('/commitdetail', { state: post });
    } else {
      alert('멈추세요! 게시글 작성자만 글을 수정할 수 있습니다.');
    }
  };

  const handleDelete = async () => {
    let nowUser = currentUser.id;
    let authorUser = item.user_id;
    if (currentUser && nowUser === authorUser) {
      const confirmed = window.confirm('삭제하면 복구할 수 없습니다. 정말 삭제하시겠습니까?');
      if (confirmed) {
        alert('좋습니다. 삭제해드렸습니다.');
        await supabase.from('posts').delete().eq('id', item.id);
        dispatch(fetchPosts()); // 삭제 후 최신 데이터 가져오기
        navigate('/', { state: { refresh: true } }); // 상태를 전달하여 홈으로 이동
      }
    } else {
      alert('이런! 당신은 이 게시글 작성자가 아니잖아요!');
    }
  };

  const handleSolveStatus = async () => {
    const now = new Date().getTime();

    if (lastClicked && now - lastClicked < 5000) {
      alert('진정하세요! 버튼을 너무 자주 누르고 있어요.');
      return;
    }

    setLastClicked(now);

    const newStatus = !isSolved;
    const { error } = await supabase
      .from('posts')
      .update({ isSolved: newStatus })
      .eq('id', item.id);

    if (error) {
      console.error('Error updating solve status:', error.message);
      return;
    }

    setIsSolved(newStatus);
    item.isSolved = newStatus; // 아이템 상태 업데이트
    dispatch(fetchPosts()); // 업데이트 후 최신 데이터 가져오기
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분 ${seconds}초`;
  };

  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <Wrap solved={isSolved}>
      <div className="detail__wrap">
        <div className="detail__post__ul">
          <div className="detail__post__list">
            <img src={profilePic} alt="Profile" />

            <div className="post__list__content">
              <p className="post__title">{item.title}</p>
              <p className="post__user__name">{item.nickname}</p>
              <p className="post__date">{formatDate(item.created_at)}</p>
            </div>
          </div>

          <div className="detail__post__btns">
            {currentUser && currentUser.id === item.user_id && (
              <button className="post__solve_status" onClick={handleSolveStatus}>
                {isSolved ? '해결완료' : '해결중'}
              </button>
            )}
            <button className="post__btn--modify" onClick={() => handleEdit(item)}>
              수정
            </button>
            <button className="post__btn--delete" onClick={handleDelete}>
              삭제
            </button>
          </div>
        </div>

        <div className="post__content__box">
          <p dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>
        <CommentsSection postId={item.id} users={users} />
      </div>
    </Wrap>
  );
};

export default DetailPage;
