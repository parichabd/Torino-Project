// import { useQuery } from "@tanstack/react-query";
// import api from "@/services/api";

// export default function useTours() {
//   return useQuery({
//     queryKey: ["tours"],
//     queryFn: () => api.get("/tour").then((res) => res.data),
//   });
// }


import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function useTours() {
  return useQuery({
    queryKey: ["tours"],
    queryFn: async () => {
      await sleep(2000); // 👈 اینجاست (لودینگ)
      return api.get("/tour").then((res) => res.data);
    },
  });
}