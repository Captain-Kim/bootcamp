import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import supabase from '../supabaseClient';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from './../store/slice/newsFeedSlice';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const PostCard = styled.div`
  border: 1px solid black;
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;
`;

const Button = styled.button`
  padding: 5px 10px;
  margin-right: 5px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;

const ContentContainer = styled.div`
  white-space: pre-wrap;

  img {
    max-width: 100%;
    height: auto;
  }
`;

const CommentContainer = styled.div`
  margin-top: 10px;
  padding: 10px;
  border-top: 1px solid #ddd;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const CommentInput = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  resize: vertical;
`;

const Test = ({ comments = [] }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.newsFeed.posts);

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
    if (currentUser && currentUser.id === post.user_id) {
      navigate('/commitdetail', { state: { post } });
    } else {
      alert('권한이 없습니다.');
    }
  };

  const handleDelete = async (postId) => {
    const post = posts.find((p) => p.id === postId);
    if (currentUser && currentUser.id === post.user_id) {
      const confirmed = window.confirm('정말 삭제하시겠습니까?');
      if (confirmed) {
        alert('게시글이 삭제되었습니다.');
        await supabase.from('posts').delete().eq('id', postId);
        const { data: posts } = await supabase.from('posts').select('*');
        dispatch(setPosts(posts));
      }
    } else {
      alert('권한이 없습니다.');
    }
  };

  const handleCommentSubmit = async (postId, commentContent) => {
    if (!currentUser) {
      alert('로그인 후 댓글을 작성할 수 있습니다.');
      return;
    }

    const { error } = await supabase
      .from('comments')
      .insert([{ post_id: postId, user_id: currentUser.id, comment: commentContent }]);

    if (error) {
      console.error('Error adding comment:', error.message);
      return;
    }

    alert('댓글이 등록되었습니다.');
    window.location.reload(); // 새로 댓글 데이터를 불러오기 위해 페이지 리로드
  };

  return (
    <Container>
      <h3>데이터 fetch 테스트 페이지입니다.</h3>
      {posts.map((post) => (
        <PostCard key={post.id}>
          <h5>글 제목: {post.title}</h5>
          <h5>닉네임: {currentUser?.user_metadata?.nickname || post.display_name}</h5>
          <h5>글 내용</h5>
          <ContentContainer dangerouslySetInnerHTML={{ __html: post.content }} />
          {currentUser && currentUser.id === post.user_id && (
            <div>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(post);
                }}
              >
                수정
              </Button>
              <DeleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(post.id);
                }}
              >
                삭제
              </DeleteButton>
            </div>
          )}
          <CommentContainer>
            <h6>댓글</h6>
            {comments
              .filter((comment) => comment.post_id === post.id)
              .map((comment) => (
                <div key={comment.id}>
                  <strong>{comment.user_id}</strong>: {comment.comment}
                </div>
              ))}
            <CommentForm
              onSubmit={(e) => {
                e.preventDefault();
                const comment = e.target.elements.comment.value;
                handleCommentSubmit(post.id, comment);
                e.target.reset();
              }}
            >
              <CommentInput name="comment" placeholder="댓글을 작성하세요." />
              <Button type="submit">댓글 작성</Button>
            </CommentForm>
          </CommentContainer>
        </PostCard>
      ))}
    </Container>
  );
};

export default Test;
