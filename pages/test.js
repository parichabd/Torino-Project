import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import ServerConnectionError from "../Components/error/ServerConnectionError";

export default function Test() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["test-tours"],
    queryFn: () => api.get("/tour").then(res => res.data),
    retry: false,
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) {
    const status = error?.response?.status;

    // 🔥 هم 500 هم قطع بودن سرور
    if (!status || status >= 500) {
      return <ServerConnectionError />;
    }

    return <p>خطای ناشناخته</p>;
  }

  return (
    <div>
      <h1>تور ها</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}