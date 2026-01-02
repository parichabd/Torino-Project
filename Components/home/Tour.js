export default function TourDetails({ tours = [] }) {
  return (
    <div style={{ padding: "20px" }}>
      {tours.map((tour) => (
        <div key={tour.id}>
          <h2>{tour.title}</h2>
        </div>
      ))}
    </div>
  );
}