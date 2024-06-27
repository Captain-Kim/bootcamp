import { useQuery } from "@tanstack/react-query";
import { getAnEvent } from "../components/api/api";

const useGetPlace = (festId) => {
  return useQuery({
    queryKey: ["posts", festId],
    queryFn: getAnEvent,
  });
};

export default useGetPlace;
