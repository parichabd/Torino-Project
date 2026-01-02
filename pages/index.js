// pages/index.js
import Layout from "@/Components/layout/Layout";
import MainPage from "@/Components/home";

export async function getServerSideProps() {
  const res = await fetch("http://localhost:6500/tour");

  if (!res.ok) {
    return {
      props: {
        tours: [],
      },
    };
  }

  const tours = await res.json();

  return {
    props: {
      tours,
    },
  };
}

export default function Home({ tours }) {
  return (
    <Layout>
      <MainPage tours={tours} />
    </Layout>
  );
}