import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../../supabaseClient';

const initialState = {
  posts: [],
  signIn: false,
  users: [],
  forceRender: 0, // 홈피드 리렌더링 유발용(김병준)
};

// posts 테이블 상태 변화 감지(김병준)
export const fetchPosts = createAsyncThunk('newsFeed/fetchPosts', async () => {
  const { data: posts, error } = await supabase.from('posts').select('*');
  if (error) throw error;
  return posts;
});

export const newsFeedSlice = createSlice({
  name: 'newsFeed',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setSignIn: (state, action) => {
      state.signIn = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    incrementForceRender: (state) => {
      state.forceRender += 1;
    },
  },
});

export const { setPosts, setSignIn, setUsers, incrementForceRender } = newsFeedSlice.actions;
export default newsFeedSlice.reducer;
