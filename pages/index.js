import { dehydrate, QueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import MainPage from "@/Components/home";

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tours"],
    queryFn: () => api.get("/tour").then((res) => res.data),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Home() {
  return <MainPage />;
}