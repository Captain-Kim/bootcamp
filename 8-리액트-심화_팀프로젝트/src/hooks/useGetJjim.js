import { useQuery } from "@tanstack/react-query";
import { getHeart } from "../components/api/api";

const useGetJjim = (festId, currentUserId) => {
  return useQuery({
    queryKey: ["jjim", festId, currentUserId],
    queryFn: getHeart,
  });
};

export default useGetJjim;
