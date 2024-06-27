import supabase from "../api/supabaseClient";

async function signInWithKakao() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
  });
  if (error) {
    console.error('카카오 로그인 중 에러가 발생했습니다 =>', error.message);
    alert('카카오 로그인 중 에러가 발생했습니다 =>', error.message)
  } else {
    alert('카카오로 소셜 로그인되었습니다. 환영합니다!');
  }
}

export default signInWithKakao;