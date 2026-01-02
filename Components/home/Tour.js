// components/home/Tour.js
export default function TourDetails({ tours = [] }) {
  if (!tours.length) {
    return <p>توری وجود ندارد</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      {tours.map((tour) => (
        <div
          key={tour.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <h2>{tour.title}</h2>

          <p>
            {tour.origin.name} → {tour.destination.name}
          </p>

          <p>
            {new Date(tour.startDate).toLocaleDateString("fa-IR")} تا{" "}
            {new Date(tour.endDate).toLocaleDateString("fa-IR")}
          </p>

          <p>وسیله نقلیه: {tour.fleetVehicle}</p>

          <p>
            قیمت: <strong>{tour.price.toLocaleString()} تومان</strong>
          </p>

          <button
            style={{
              padding: "10px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            رزرو
          </button>
        </div>
      ))}
    </div>
  );
}