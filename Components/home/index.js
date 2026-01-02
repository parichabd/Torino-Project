import Layout from "../layout/Layout";
import TourDetails from "./Tour";
import useTours from "@/hooks/useTours";

export default function MainPage() {
  const { data, isLoading, isError } = useTours();

  if (isLoading) {
    return (
      <Layout>
        <p>در حال بارگذاری...</p>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <p>خطا در دریافت اطلاعات</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <TourDetails tours={data} />
    </Layout>
  );
}