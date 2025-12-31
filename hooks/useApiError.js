import { useRouter } from "next/router";

export function useApiError() {
  const router = useRouter();

  return (error) => {
    if (!error?.response) {
      router.replace("/500");
      return;
    }

    if (error.response.status >= 500) {
      router.replace("/500");
    }
  };
}