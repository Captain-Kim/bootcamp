// import { useMutation, useQueryClient } from "@tanstack/react-query"
// import { postPlace } from "../components/api/places.api";

// export const useCreatePost = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: async (postData) => {
//             const data = await postPlace(postData);
//             return data;
//         },
//         // onSuccess: () => queryClient.invalidateQueries(["쿼리키"])
//         onError: (error) => {
//             console.error("포스트 생성 도중 에러 발생:", error);
//         },
//     })
// };