import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import Layout from "@/Components/layout/Layout";

export default function TourDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: tour,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tour", id],
    queryFn: () => api.get(`/tour/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Layout>
        <p>در حال بارگذاری...</p>
      </Layout>
    );
  }

  if (isError) {
    const status = error?.response?.status;

    if (status === 404) {
      return (
        <Layout>
          <p>تور مورد نظر پیدا نشد</p>
        </Layout>
      );
    }

    return (
      <Layout>
        <p>خطا در دریافت اطلاعات</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
        <img
          src={tour.image}
          alt={tour.title}
          style={{
            width: "100%",
            borderRadius: 12,
            marginBottom: 24,
          }}
        />

        <h1>{tour.title}</h1>

        <p style={{ margin: "12px 0", color: "#475569" }}>
          {tour.origin.name} → {tour.destination.name}
        </p>

        <p>
          تاریخ:{" "}
          {new Date(tour.startDate).toLocaleDateString("fa-IR")} تا{" "}
          {new Date(tour.endDate).toLocaleDateString("fa-IR")}
        </p>

        <p>وسیله نقلیه: {tour.fleetVehicle}</p>

        <p>ظرفیت باقی‌مانده: {tour.availableSeats}</p>

        <p>
          بیمه: {tour.insurance ? "دارد ✅" : "ندارد ❌"}
        </p>

        <h3 style={{ marginTop: 24 }}>امکانات</h3>
        <ul>
          {tour.options.map((opt, index) => (
            <li key={index}>{opt}</li>
          ))}
        </ul>

        <h2 style={{ marginTop: 24 }}>
          {tour.price.toLocaleString()} تومان
        </h2>

        <button
          style={{
            marginTop: 16,
            padding: "12px 24px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          رزرو تور
        </button>
      </div>
    </Layout>
  );
}