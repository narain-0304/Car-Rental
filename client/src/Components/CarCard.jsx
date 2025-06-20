import { Link, useNavigate } from "react-router-dom";
import defaultcar from "../assets/default-car.jpeg";
import { useAppContext } from "../AppContext/Context";

function CarCard({ car, checkIn, checkOut }) {
  const { isAdmin } = useAppContext();
  const navigate = useNavigate();

  const mainImage =
    Array.isArray(car.images) && car.images.length > 0
      ? car.images[0]
      : defaultcar;
  
  // Link path for admin or user
  const linkPath = isAdmin ? `/admin/editcar/${car._id}` : `/car/${car._id}`;

  // If user and checkIn/checkOut exists, use navigate with state
  const handleClick = (e) => {
    if (!isAdmin && checkIn && checkOut) {
      e.preventDefault(); // prevent default Link behavior
      navigate(`/car/${car._id}`, {
        state: {
          checkIn,
          checkOut,
        },
      });
    }
  };

  return (
    <Link
      to={linkPath}
      onClick={handleClick}
      className="block no-underline"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 border border-gray-200 w-full max-w-[380px] sm:max-w-[420px] mx-auto cursor-pointer">
        {/* Car Image */}
        <div className="h-56 sm:h-64 w-full overflow-hidden">
          <img
            src={mainImage}
            alt={car.name}
            onError={(e) => (e.target.src = defaultcar)}
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>

        {/* Car Details */}
        <div className="p-5">
          <h3 className="text-2xl font-bold text-gray-800 mb-1 truncate">
            {car.name}
          </h3>
          <p className="text-sm text-gray-500 mb-1">
            {car.model} • {car.year} • {car.transmission}
          </p>
          <p className="text-sm text-gray-500 mb-1">
            {car.fuelType} • {car.seats} Seats
          </p>
          <p className="text-sm text-gray-500 mb-2">📍 {car.location}</p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-bold text-indigo-600">
              ₹{car.rentPerHour}/hr
            </span>
            <span className="bg-indigo-100 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full">
              {car.type}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CarCard;