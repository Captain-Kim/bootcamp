import { useState, useLayoutEffect, useEffect } from 'react';
import styled from 'styled-components';
import supabase from '../supabaseClient';
import { FaEdit, FaTrash } from 'react-icons/fa'; // 아이콘 추가
import { useSelector } from 'react-redux';

const CommentsWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  padding-top: 20px;

  .comments__list {
    list-style: none;
    padding: 0;
    margin: 0;

    .comment__item {
      margin-top: 20px;
      margin-bottom: 20px;
      padding: 10px;
      border: 1px solid black;
      border-radius: 20px;
      position: relative; /* 수정 및 삭제 아이콘 배치용 */

      .comment__author {
        font-weight: bold;
        display: flex;
        align-items: center;
      }

      .comment__author img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }

      .comment__date {
        font-size: 12px;
        color: #888;
      }

      .comment__text {
        margin-top: 5px;
      }

      .comment__actions {
        position: absolute;
        right: 10px;
        top: 10px;
        display: flex;

        .action__icon {
          margin-left: 10px;
          cursor: pointer;
        }
      }

      .edit__textarea {
        width: 90%;
        padding: 10px;
        margin-top: 10px;
        border: 1px solid black;
        border-radius: 10px;
        font-size: 14px;
      }

      .edit__button {
        margin-top: 10px;
        margin-left: 5px;
        padding: 10px 20px;
        background-color: rgb(52, 52, 52);
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
          background-color: #0056b3;
        }
      }
    }
  }

  .comment__form {
    display: flex;
    flex-direction: column;

    textarea {
      padding: 10px;
      border: 1px solid black;
      border-radius: 20px;
      margin-bottom: 10px;
      font-size: 14px;
    }

    button {
      align-self: flex-end;
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: #0056b3;
      }
    }
  }

  .comments__header {
    display: flex;
    align-items: center;
    align-items: baseline; /* 댓글과 댓글 개수 라인 맞추기 위함 */

    h1 {
      margin-right: 10px;
    }

    span {
      font-size: 15px;
      color: black;
      vertical-align: text-bottom;
    }
  }
`;

const EmptySpace = styled.div`
  height: 100px;
`;

const CommentsSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState('');
  const [userProfiles, setUserProfiles] = useState({});

  const users = useSelector((state) => state.newsFeed.users);

  useLayoutEffect(() => {
    const fetchComments = async () => {
      try {
        const { data, error } = await supabase.from('comments').select('*').eq('post_id', postId);

        if (error) {
          throw error;
        }

        console.log('Fetched comments:', data);
        setComments(data || []);
      } catch (error) {
        console.error('Error fetching comments:', error.message);
      }
    };

    fetchComments();
  }, [postId]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
          error
        } = await supabase.auth.getUser();

        if (error) {
          throw error;
        }

        console.log('Fetched user:', user);
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching user:', error.message);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const fetchUserProfiles = async () => {
      const profiles = {};
      for (const comment of comments) {
        if (!profiles[comment.user_id]) {
          const { data: user, error } = await supabase
            .from('users')
            .select('profilepic')
            .eq('id', comment.user_id)
            .single();

          if (error) {
            console.error('Error fetching user profile:', error);
            continue;
          }

          profiles[comment.user_id] =
            user.profilepic ||
            'https://nozekgjgeindgyulfapu.supabase.co/storage/v1/object/public/profile/default-profile.jpg';
        }
      }
      setUserProfiles(profiles);
    };

    fetchUserProfiles();
  }, [comments]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert('어허~ 돌아가~ 로그인 안 하면 댓글을 못 달아요!');
      return;
    }

    const nickname = users ? users.find((u) => u.id === currentUser.id)?.nickname || '' : '';

    try {
      const { error } = await supabase.from('comments').insert([
        {
          comment: newComment,
          user_id: currentUser.id,
          post_id: postId,
          nickname: nickname
        }
      ]);

      if (error) {
        throw error;
      }

      console.log('이 댓글이 등록되었습니다.');
      setNewComment('');

      const { data, error: fetchError } = await supabase.from('comments').select('*').eq('post_id', postId);

      if (fetchError) {
        throw fetchError;
      }

      setComments(data || []);
    } catch (error) {
      console.error('댓글 등록 에러났어요:', error.message);
    }
  };

  const handleEditComment = (commentId, currentText) => {
    setEditingCommentId(commentId);
    setEditedCommentText(currentText);
  };

  const handleUpdateComment = async (commentId) => {
    try {
      const { error } = await supabase.from('comments').update({ comment: editedCommentText }).eq('id', commentId);

      if (error) {
        throw error;
      }

      console.log('댓글이 수정되었습니다.');
      setEditingCommentId(null);
      setEditedCommentText('');

      const { data, error: fetchError } = await supabase.from('comments').select('*').eq('post_id', postId);

      if (fetchError) {
        throw fetchError;
      }

      setComments(data || []);
    } catch (error) {
      console.error('댓글 수정 에러났어요:', error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmed = window.confirm('정말 삭제할까요?');
    if (!confirmed) {
      return; // 취소를 누르면 함수 종료
    }

    try {
      const { error } = await supabase.from('comments').delete().eq('id', commentId);

      if (error) {
        throw error;
      }

      alert('요청하신 대로 삭제되었어요.'); // 삭제 후 알림

      console.log('댓글이 삭제되었습니다.');

      const { data, error: fetchError } = await supabase.from('comments').select('*').eq('post_id', postId);

      if (fetchError) {
        throw fetchError;
      }

      setComments(data || []);
    } catch (error) {
      console.error('댓글 삭제 에러났어요:', error.message);
    }
  };

  return (
    <>
      <CommentsWrapper>
        <div className="comments__header">
          <h1>댓글</h1>
          <span>{comments.length} 개</span>
        </div>
        <ul className="comments__list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment__item">
              <p className="comment__author">
                <img src={userProfiles[comment.user_id]} alt="User Avatar" />
                {comment.nickname || comment.user_id}
              </p>
              <p className="comment__date">{new Date(comment.created_at).toLocaleString()}</p>
              {editingCommentId === comment.id ? (
                <>
                  <textarea
                    className="edit__textarea"
                    value={editedCommentText}
                    onChange={(e) => setEditedCommentText(e.target.value)}
                  />
                  <button className="edit__button" onClick={() => handleUpdateComment(comment.id)}>
                    수정 완료
                  </button>
                </>
              ) : (
                <p className="comment__text">{comment.comment}</p>
              )}
              {currentUser && currentUser.id === comment.user_id && editingCommentId !== comment.id && (
                <div className="comment__actions">
                  <FaEdit className="action__icon" onClick={() => handleEditComment(comment.id, comment.comment)} />
                  <FaTrash className="action__icon" onClick={() => handleDeleteComment(comment.id)} />
                </div>
              )}
            </li>
          ))}
        </ul>

        <form className="comment__form" onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows="4"
            placeholder="그런 말이 있지요, 가는 말이 고와야 오는 말이 곱다는 말..."
          />
          <button type="submit" style={{ backgroundColor: '#343434' }}>
            댓글 작성
          </button>
        </form>
      </CommentsWrapper>
      <EmptySpace />
    </>
  );
};

export default CommentsSection;
