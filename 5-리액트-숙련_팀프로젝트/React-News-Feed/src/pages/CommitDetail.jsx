import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill 스타일 import (글쓰기 에디터)
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from './../store/slice/newsFeedSlice';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 60px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  color: #ffffff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004494;
  }
`;

const CancelButton = styled(Button)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  font-size: 28px;
  margin-bottom: 20px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  padding: 12px 16px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  width: 800px;
  max-width: 100%;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  margin-top: -10px;
  margin-bottom: 10px;
  font-size: 14px;
`;

// quill editor CSS
const EditorContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;

  .ql-container {
    height: 600px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .ql-editor {
    height: 100%;
  }

  .ql-toolbar {
    border: 1px solid #ddd;
    border-bottom: none;
    border-radius: 4px 4px 0 0;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

const CommitDetail = () => {
  const navigate = useNavigate(); // 홈으로 넘기기 위한 훅
  const location = useLocation(); // HomeFeed 컴포넌트에서 글 내용을 넘겨받기 위한 훅(edit 함수에서)
  const { id, title, content, user_id } = location.state || {};
  const [postTitle, setPostTitle] = useState(title || ''); // 글 제목(title)을 상태로 관리(test에서 넘겨받은 값)
  const [postContent, setPostContent] = useState(content || ''); // 글 내용(content)을 상태로 관리(test에서 넘겨받은 값)
  const [titleError, setTitleError] = useState(''); // 제목 에러 메시지 띄우기 위해 상태로 관리
  const [contentError, setContentError] = useState(''); // 내용 에러 메시지 띄우기 위해 상태로 관리
  const [user, setUser] = useState(null); // 사용자 정보 상태 변수와 상태 변경 함수 지정
  // 글쓰기 페이지가 처음 렌더링 될 때 사용자가 로그인했는지 확인
  const [matchedNickName, setMatchedNickName] = useState('');

  const [isLoading, setIsLoading] = useState(false); // 로딩 관리

  const dispatch = useDispatch();
  const users = useSelector((state) => state.newsFeed.users);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await supabase.from('users').select('*');
      dispatch(setUsers(data));
    };
    fetchUsers();
  }, []); // 컴포넌트가 마운트될 때 users 데이터를 가져옴

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser(); // supabase에서 사용자 정보 가져옵니다.
      // 유저 정보가 있어야만 글쓰기 페이지를 보여줍니다.
      if (user) {
        console.log('수파베이스에서 받아온 유저의 상태:', user);
        console.log('users 테이블에서 받아온 유저의 닉네임:', users);
        console.log('수파베이스 auth_nickname:', user.user_metadata.nickname);

        let matchedUser = users.find((u) => u.id === user.id);
        if (matchedUser) {
          console.log('users에서 찾은 이 유저의 닉네임은요 => ', matchedUser.nickname);
          setMatchedNickName(matchedUser.nickname);
        } else {
          console.log('users 테이블에서 이 유저의 닉네임을 못찾았습니다요');
        }
        setUser(user); // 받아온 사용자 정보로 user 상태를 업데이트

        // 사용자의 프로필 사진 URL 가져오기
        const { data } = supabase.storage.from('profile').getPublicUrl(user.user_metadata.avatar_url);
        setUser((prevUser) => ({
          ...prevUser,
          profilePicUrl: data.publicUrl // 프로필 사진 URL 저장
        }));

        // 유저 정보가 없으면 로그인 페이지로 넘깁니다.
      } else {
        navigate('/login');
      }
    };

    checkUser();
    // 의존성 배열이 비어있는 것과 같습니다. 그런데 우리 프로젝트에 있는 ESLint 설정 파일에서
    // plugin:react-hooks/recommended
    // 위 설정 때문에 의존성 배열을 비워두지 않도록 권고하고 있습니다.
    // 따라서 변할 일이 없는 navigate 함수를 넣어놓은 것으로 의미는 없습니다. 빈 배열이나 마찬가지입니다.
  }, [navigate, users]);

  // title 필드의 값이 변경될 때 호출할 함수.
  // 길이가 20자 이상이면 경고를 띄우고 20자 미만이면 에러 메시지를 비웁니다.
  // 에러메시지를 굳이 상태로 정의한 이유는 사용자가 20자 이상으로 제목을 썼을 때
  // 실시간으로 메시지를 띄워주기 위해서(상태가 변경 됨에 따라서 리렌더링 하기 위해서)입니다.
  // 일반 변수로 호출하면 실시간 리렌더링이 되지 않습니다.
  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (value.length > 50) {
      setTitleError('이런! 제목은 50자 미만이 좋겠군요!');
    } else {
      setTitleError('');
    }
    setPostTitle(value);
  };

  // 작성 버튼을 눌렀을 때(폼이 제출될 때) 호출할 함수입니다.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // 게시글 작성 버튼 클릭 시 로딩 시작
    // valid는 유효성 검사를 위한 플래그 변수임. true로 초기화한 이유는 일반적으로는 글을 제대로 쓸 것이기 때문.
    let valid = true;
    const nickname = matchedNickName;

    // 제목 길이가 40자 미만이면 유효성 검사 false로 바꾸고 에러 메시지 출력.
    if (postTitle.length > 50) {
      setTitleError('이런! 제목은 50자 미만이 좋겠군요!');
      valid = false;
    } else if (postTitle.length === 0) {
      setTitleError('음... 제목이 없는 것 같은데요?');
      valid = false;
    }

    if (postContent.length === 0) {
      setContentError('이런! 글을 쓰시는 걸 깜빡하신 건가요?');
      valid = false;
    } else {
      setContentError('');
    }

    // 여기까지 통과했는데 유효성 검사가 true이면서 user 객체가 있으면(로그인 되어 있으면)
    // supabase posts 테이블을 참조(from)해서 데이터를 하나의 객체로 채워 넣습니다.(insert)
    if (valid && user) {
      if (window.confirm('정말 글을 등록하실 건가요?')) {
        let result;
        if (id) {
          result = await supabase.from('posts').update({ title: postTitle, content: postContent }).eq('id', id);
        } else {
          result = await supabase
            .from('posts')
            .insert([{ title: postTitle, content: postContent, user_id: user.id, nickname: nickname }]);
        }

        const { error } = result;

        if (error) {
          const errorMessage = translateErrorMessage(error.message, error.code);
          alert(`데이터 삽입 오류: ${errorMessage}`);
        } else {
          alert('좋아요! 글이 등록되었습니다!');
          navigate('/', { state: { refresh: true } }); // 상태를 전달하여 홈으로 이동
        }
      }
    }
    setIsLoading(false); // 게시글 작성 로딩 종료
  };

  // Supabase 오류 메시지를 한국어로 번역하는 함수. 오류 케이스를 아직 확인은 안 했습니다.
  const translateErrorMessage = (message, code) => {
    const translations = {
      'Invalid login credentials': '잘못된 로그인 자격 증명',
      'User already exists': '이미 존재하는 사용자',
      'User not found': '사용자를 찾을 수 없음',
      'duplicate key value violates unique constraint': '중복 키 값이 고유 제약 조건을 위반함',
      'violates foreign key constraint': '외래 키 제약 조건을 위반함',
      'cannot insert null value': 'null 값을 삽입할 수 없음',
      'Network request failed': '네트워크 요청 실패',
      'permission denied for table': '테이블에 대한 권한이 거부됨'
    };

    // 오류 코드에 따른 추가 처리
    if (code) {
      switch (code) {
        case '23505': // 예: 고유 제약 조건 위반
          return '이미 존재하는 데이터입니다.';
        case '23503': // 예: 외래 키 제약 조건 위반
          return '관련된 데이터가 없어 삽입할 수 없습니다.';
        default:
          return translations[message] || '알 수 없는 오류가 발생했습니다.';
      }
    }

    return translations[message] || '알 수 없는 오류가 발생했습니다.';
  };

  // 취소 버튼이 클릭될 때 호출할 함수.
  const handleCancel = () => {
    const confirmed = window.confirm('취소를 누르면 작성한 내용을 복구해드릴 수 없어요. 괜찮으시겠어요?');
    if (confirmed) {
      navigate('/');
    }
  };

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }, { direction: 'rtl' }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  return (
    <Container>
      <Title>글쓰기</Title>
      <Form onSubmit={handleSubmit}>
        <Input type="text" placeholder="제목을 입력해주세요." value={postTitle} onChange={handleTitleChange} required />
        {titleError && <ErrorMessage>{titleError}</ErrorMessage>}
        <EditorContainer>
          <ReactQuill
            value={postContent}
            onChange={setPostContent}
            placeholder="내용을 입력해주세요."
            modules={modules}
            style={{ height: '700px' }}
          />
        </EditorContainer>
        {contentError && <ErrorMessage>{contentError}</ErrorMessage>}
        <ButtonGroup>
          <Button type="submit" disabled={isLoading}>
            등록
          </Button>
          <CancelButton onClick={handleCancel}>취소</CancelButton>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default CommitDetail;
