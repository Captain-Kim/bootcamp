import { useQuery } from "@tanstack/react-query";
import { getHearts } from "../components/api/api";

const useGetAllJjim = () => {
  return useQuery({
    queryKey: ["jjim"],
    queryFn: getHearts,
  });
};

export default useGetAllJjim;
