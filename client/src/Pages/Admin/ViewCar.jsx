import { useEffect, useState } from "react";
import { useAppContext } from "../../AppContext/Context";
import CarCard from "../../components/CarCard";
import toast from "react-hot-toast";
import { FaCarSide } from "react-icons/fa";

const ViewCar = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const { axios } = useAppContext();

  const fetchCars = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/cars/");
      setCars(res.data.cars);
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast.error(error.response?.data?.message || "Failed to fetch cars.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-indigo-100 via-white to-indigo-200 py-10 px-2">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <FaCarSide className="text-indigo-600 text-3xl" />
          <h2 className="text-3xl font-bold text-indigo-700">All Cars</h2>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <svg
              className="animate-spin h-8 w-8 text-indigo-500 mr-2"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            <span className="text-indigo-500 text-lg">Loading cars...</span>
          </div>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {cars.length > 0 ? (
              cars.map((car) => <CarCard key={car._id} car={car} />)
            ) : (
              <p className="text-gray-500 text-center col-span-full text-lg">
                No cars found.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCar;