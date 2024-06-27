import supabase from '../api/supabaseClient';
import useAuthStore from '../../store/store';

async function checkSignIn() {
    const { data: { user } } = await supabase.auth.getUser();
    
    const setSignIn = useAuthStore.getState().setSignIn;
    setSignIn(!!user);

    return !!user;
}

export default checkSignIn;