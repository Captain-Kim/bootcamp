import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import supabase from '../supabaseClient';
import { v4 as uuidv4 } from 'uuid';

const Avatar = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  text-align: center;
  cursor: pointer;
  padding: 5px;
`;

const ImgChange = styled.div`
  display: flex;
  position: relative;

  &:hover::after {
    content: '변경';
    position: absolute;
    background-color: #000000ca;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    object-fit: cover;
    padding: 5px;

    color: white;

    display: flex;
    justify-content: center;
    align-items: center;

    opacity: 1;
    transition: opacity 0.2s;
    cursor: pointer;
  }
`;

const ImgUpload = ({ user, setUser }) => {
  const [imgFile, setImgFile] = useState(null);
  const fileRef = useRef(null);

  const newProfile = (e) => {
    //파일이 있으면 handleFileUpload 함수 호출
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  useEffect(() => {
    const defaultProfile = async () => {
      const img = user?.user_metadata?.avatar_url;
      if (!img) {
        const { data } = supabase.storage.from('profile').getPublicUrl('default-profile.jpg');
        if (data) {
          setImgFile(data.publicUrl);
        }
      } else {
        setImgFile(img);
      }
    };
    defaultProfile();
  }, [user]);

  const fileSelect = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    const uniqueFileName = `${uuidv4()}_${file.name}`;

    try {
      // 파일 업로드
      const { data, error } = await supabase.storage.from('profile').upload(uniqueFileName, file);
      if (error) throw error;

      // 파일 URL 가져오기
      const { publicUrl } = supabase.storage.from('profile').getPublicUrl(uniqueFileName).data;
      setImgFile(publicUrl);

      // 프로필 업데이트
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      });
      if (updateError) throw updateError;

      // users 테이블의 profilepic 컬럼 업데이트(김병준)
      const { error: userTableUpdateError } = await supabase
        .from('users')
        .update({ profilepic: publicUrl })
        .eq('id', user.id);
      if (userTableUpdateError) throw userTableUpdateError;

      setUser((prev) => ({
        ...prev,
        user_metadata: {
          ...prev.user_metadata,
          avatar_url: publicUrl
        }
      }));
      alert('프로필 사진이 업데이트 되었습니다');
    } catch (err) {
      console.error('Unexpected error:', err);
      alert(`오류가 발생했습니다: ${err.message}`);
    }
  };

  return (
    <ImgChange onClick={fileSelect}>
      <input type="file" style={{ display: 'none' }} ref={fileRef} onChange={newProfile} />
      {imgFile && <Avatar src={imgFile} alt="User Avatar" />}
    </ImgChange>
  );
};

export default ImgUpload;
