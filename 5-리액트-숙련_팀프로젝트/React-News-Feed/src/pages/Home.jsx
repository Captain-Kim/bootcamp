import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import HomeFeed from '../components/HomeFeed';
import supabase from '../supabaseClient';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from './../store/slice/newsFeedSlice';

const Home = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.newsFeed.posts);

  useEffect(() => {
    if (location.state && location.state.refresh) {
      fetchPosts(); // 최신 데이터를 가져오는 함수 호출
    }
  }, [location.state]);

  const fetchPosts = async () => {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) {
      console.log('데이터 못 불러옴 => ', error);
    } else {
      dispatch(setPosts(data)); // 최신 데이터로 상태 업데이트
    }
  };

  return (
    <>
      <HomeFeed posts={posts} />
    </>
  );
};

export default Home;
