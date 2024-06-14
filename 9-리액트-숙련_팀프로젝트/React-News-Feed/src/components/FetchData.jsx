import { useEffect } from 'react';
import supabase from '../supabaseClient';

const FetchData = ({ onDataFetch }) => {
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('posts').select('*');
      if (error) {
        console.log('데이터 못 불러옴 => ', error);
      } else {
        console.log('데이터 잘 불러옴 => ', data);
        onDataFetch(data);
      }
    };

    fetchData();
  }, []);

  return null;
};

const FetchUsers = ({ handleUsersFetch }) => {
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (error) {
        console.log('유저 테이블 못 불러옴 => ', error);
      } else {
        console.log('유저 테이블 잘 불러옴 => ', data);
        handleUsersFetch(data);
      }
    };

    fetchData();
  }, []); // 일단 마운트 시

  return null;
};

export { FetchData, FetchUsers } ;