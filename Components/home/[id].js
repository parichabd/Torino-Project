// pages/tour/[id].js
export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:6500/tour/${params.id}`);

  if (!res.ok) {
    return { notFound: true };
  }

  const tour = await res.json();

  return {
    props: { tour },
  };
}

export default function TourPage({ tour }) {
  return (
    <div>
      <h1>{tour.title}</h1>
      <p>{tour.origin.name} → {tour.destination.name}</p>
    </div>
  );
}