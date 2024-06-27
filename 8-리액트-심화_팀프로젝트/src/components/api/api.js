import supabase from "./supabaseClient";

export const getPlaces = async () => {
  const { data, error } = await supabase.from("places").select();
  if (error) {
    throw error;
  }
  return data;
};

export const getAnEvent = async ({ queryKey }) => {
  try {
    const { data: place } = await supabase
      .from("places")
      .select()
      .eq("post_id", queryKey[1]);
    return place[0];
  } catch (error) {
    console.error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const { data: currentUser } = await supabase.auth.getUser();
    return currentUser.user;
  } catch (error) {
    alert(error);
    console.error("로그인한 유저 불러오기 실패 => ", error);
  }
};

export const getHearts = async () => {
  try {
    const { data, error } = await supabase.from("hearts").select();
    if (error) console.error("모든 찜 데이터 가져오기 실패 => ", error);
    else {
      return data;
    }
  } catch (error) {
    console.error("모든 찜 데이터 가져오기 실패 => ", error);
  }
};

export const getHeart = async ({ queryKey }) => {
  const [_, post_id, user_id] = queryKey;
  try {
    const { data, error } = await supabase
      .from("hearts")
      .select()
      .match({ post_id: post_id, user_id: user_id });
    if (error) console.error("나의 찜 데이터 가져오기 실패 => ", error);
    else {
      return data;
    }
  } catch (error) {
    console.error("나의 찜 데이터 가져오기 실패 => ", error);
  }
};

export const handleAddJjim = async (festId, currentUserId) => {
  try {
    const { data: jjim, error } = await supabase.from("hearts").insert({
      post_id: festId,
      user_id: currentUserId,
    });
    if (error) console.error("찜 추가 실패 => ", error);
    else {
      console.log(jjim);
    }
  } catch (error) {
    console.error("찜 추가 실패 => ", error);
  }
};

export const handleDeleteJjim = async (festId, currentUserId) => {
  await supabase
    .from("hearts")
    .delete()
    .match({ user_id: currentUserId, post_id: festId });
};
