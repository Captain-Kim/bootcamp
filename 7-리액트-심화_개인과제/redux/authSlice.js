import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    nickname: '',
  },
  reducers: {
    login(state, action) {
      const { token, user } = action.payload;
      localStorage.setItem('accessToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      state.isAuthenticated = true;
      state.user = user;
      state.nickname = user.nickname;
    },
    logout(state) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      state.isAuthenticated = false;
      state.user = null;
      state.nickname = '';
    },
    setNickname(state, action) {
      state.nickname = action.payload;
    },
    loadUserFromStorage(state) {
      const token = localStorage.getItem('accessToken');
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userObject = JSON.parse(storedUser);
        state.nickname = userObject.nickname;
      }
      if (token) {
        state.isAuthenticated = true;
        try {
          const userObject = storedUser ? JSON.parse(storedUser) : null;
          state.user = userObject;
        } catch (error) {
          console.error('로컬 스토리지에서 user 객체를 불러오지 못했습니다요 왜냐면 값이 =>', error);
        }
      }
    },
    updateUser(state, action) {
      const { nickname, avatar } = action.payload;
      if (state.user) {
        state.user.nickname = nickname;
        state.user.avatar = avatar;
      }
      state.nickname = nickname;
    },
  },
});

export const { login, logout, setNickname, loadUserFromStorage, updateUser } = authSlice.actions;
export default authSlice.reducer;