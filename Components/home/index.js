// components/home/index.js
import TourDetails from "./Tour";

export default function MainPage({ tours }) {
  return (
    <div>
      <TourDetails tours={tours} />
    </div>
  );
}