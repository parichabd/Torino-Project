import Layout from "../layout/Layout";
import TourDetails from "./Tour";
import useTours from "@/hooks/useTours";
import { HashLoader } from "react-spinners";
export default function MainPage() {
  const { data, isLoading, isError } = useTours();

  if (isLoading) {
    return (
      <Layout>
        <div className="spinner-overlay">
          <HashLoader color="#20c975" size={90} />
        </div>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <div className="spinner-overlay">
          <HashLoader color="#20c975" size={90} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <TourDetails tours={data} />
    </Layout>
  );
}
