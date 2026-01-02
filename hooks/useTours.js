import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

export default function useTours() {
  return useQuery({
    queryKey: ["tours"],
    queryFn: () => api.get("/tour").then((res) => res.data),
  });
}