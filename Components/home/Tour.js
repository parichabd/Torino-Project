import Link from "next/link";
export default function TourDetails({ tours = [] }) {
  return (
    <div style={{ padding: "20px" }}>
      {tours.map((tour) => (
        <div key={tour.id}>
          <h2>{tour.title}</h2>
          <Link href={`/tour/${tour.id}`}>
            <button>مشاهده جزئیات</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
