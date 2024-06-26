import { useEffect } from 'react';
import GlobalStyles from './Globalstyles';
import { FetchData, FetchUsers } from './components/FetchData';
import Router from './shared/Router';
import supabase from './supabaseClient';
import { setPosts, setUsers, setSignIn } from './store/slice/newsFeedSlice';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  const handleDataFetch = (data) => {
    dispatch(setPosts(data));
  };

  const handleUsersFetch = (data) => {
    dispatch(setUsers(data));
  };

  const signOut = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      dispatch(setSignIn(false));
    } catch (error) {
      console.error('로그아웃 오류 발생', error.message);
    }
  };

  async function checkSignIn() {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    setSignIn(!!session);
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('posts').select();
      dispatch(setPosts(data));
    };
    const fetchUsers = async () => {
      const { data } = await supabase.from('users').select();
      dispatch(setUsers(data));
    };

    fetchData();
    fetchUsers();
    checkSignIn();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        dispatch(setUsers(session.user));
      } else {
        dispatch(setUsers(null));
      }
      checkSignIn();
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <>
      <GlobalStyles />
      <FetchData onDataFetch={handleDataFetch} />
      <FetchUsers handleUsersFetch={handleUsersFetch} />
      <Router signOut={signOut} />
    </>
  );
};

export default App;
