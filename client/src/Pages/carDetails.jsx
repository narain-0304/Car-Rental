import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../AppContext/Context";
import toast from "react-hot-toast";
import CarCard from "../components/CarCard";

const CarDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { axios } = useAppContext();

  const [car, setCar] = useState(null);
  const [relatedCars, setRelatedCars] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [totalHours, setTotalHours] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Prefill dates from BrowseCars
  useEffect(() => {
    if (location.state?.checkIn && location.state?.checkOut) {
      const checkInVal = new Date(location.state.checkIn).toISOString();
      const checkOutVal = new Date(location.state.checkOut).toISOString();
      setCheckIn(checkInVal);
      setCheckOut(checkOutVal);
    }
  }, [location.state]);

  // Fetch car and related cars
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`/api/cars/${id}`);
        setCar(res.data.car);
        const all = await axios.get("/api/cars");
        const related = all.data.cars
          .filter(c => c.type === res.data.car.type && c._id !== id)
          .slice(0, 4);
        setRelatedCars(related);
      } catch (err) {
        toast.error("Error loading car details.");
      }
    };
    fetchCar();
  }, [id]);

  // Calculate total rent
  useEffect(() => {
    if (checkIn && checkOut && car) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      if (end > start) {
        const hours = Math.ceil((end - start) / (1000 * 60 * 60));
        setTotalHours(hours);
        setTotalAmount(hours * car.rentPerHour);
      } else {
        setTotalHours(0);
        setTotalAmount(0);
      }
    }
  }, [checkIn, checkOut, car]);

  // Booking
const handleBooking = async () => {
    if (!checkIn || !checkOut || totalHours <= 0) {
      toast.error("Please select a valid check-in and check-out time.");
      return;
    }
    try {
      const profileCheck = await axios.get("/api/profile/check-verified");

      if (!profileCheck.data.verified) {
        toast.error("Please complete your profile before booking.");
        navigate("/profile");
        return;
      }
      const res = await axios.post("/api/booking/create", {
        checkIn,
        checkOut,
        carId: id,
      });
      if (res.data.success) {
        window.location.replace(res.data.url);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Booking request failed.");
    }
  };

  if (!car) return <div className="pt-28 text-center">Loading car details...</div>;

  return (
    <div className="pt-28 px-4 md:px-10 max-w-7xl mx-auto space-y-10">
      <div className="grid md:grid-cols-2 gap-8 bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Left: Car Images */}
        <div className="relative w-full">
          <img
            src={car.images[currentImage]}
            alt="Car"
            className="w-full h-80 object-cover"
          />
          <div className="flex gap-4 overflow-x-auto p-4 bg-gray-100">
            {car.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Thumb"
                className={`w-20 h-16 object-cover rounded-md cursor-pointer border-2 ${
                  i === currentImage ? "border-indigo-600" : "border-transparent"
                }`}
                onClick={() => setCurrentImage(i)}
              />
            ))}
          </div>
        </div>

        {/* Right: Info & Booking */}
        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{car.name}</h1>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <div><b>Brand:</b> {car.brand}</div>
            <div><b>Model:</b> {car.model}</div>
            <div><b>Year:</b> {car.year}</div>
            <div><b>Fuel:</b> {car.fuelType}</div>
            <div><b>Transmission:</b> {car.transmission}</div>
            <div><b>Seats:</b> {car.seats}</div>
            <div><b>Location:</b> {car.location}</div>
            <div><b>Type:</b> {car.type}</div>
          </div>

          <div className="border-t pt-4 mt-4">
            <p className="text-xl font-semibold">₹{car.rentPerHour} / hour</p>
          </div>

          {/* Time display with Edit option */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <div className="flex items-center justify-between mb-1">
              <p className="text-gray-700 text-sm">Selected Rental Time</p>
              <button
                onClick={() => navigate("/cars")}
                className="text-indigo-600 text-sm underline hover:text-indigo-800"
              >
                Edit
              </button>
            </div>
            <p className="text-gray-900 text-sm">
              <b>Check-in:</b> {new Date(checkIn).toLocaleString()}
            </p>
            <p className="text-gray-900 text-sm">
              <b>Check-out:</b> {new Date(checkOut).toLocaleString()}
            </p>
          </div>

          {totalHours > 0 && (
            <div className="pt-2 text-lg text-gray-800">
              <p>Total Time: {totalHours} hour(s)</p>
              <p>Total Amount: ₹{totalAmount}</p>
            </div>
          )}

          <button
            onClick={handleBooking}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Book This Car
          </button>
        </div>
      </div>

      {/* Related Cars */}
      {relatedCars.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Related Cars</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedCars.map(car => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;