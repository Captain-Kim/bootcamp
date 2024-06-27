import { useNavigate } from "react-router-dom";
import supabase from "../components/api/supabaseClient";

const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      alert('로그아웃 중 오류가 발생했습니다. :' + error.message);
      return;
    }

    alert('로그아웃 되었습니다. 또 만나요!');
    navigate('/');
  };

  return handleLogout;
};

export default useLogout;