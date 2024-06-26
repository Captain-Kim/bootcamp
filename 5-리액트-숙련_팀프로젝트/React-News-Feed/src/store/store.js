import { configureStore } from '@reduxjs/toolkit';
import newsFeedSlice from './slice/newsFeedSlice';

const store = configureStore({
  reducer: {
    newsFeed: newsFeedSlice
  }
});

export default store;
