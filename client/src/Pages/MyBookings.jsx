import { useEffect, useState } from "react";
import { useAppContext } from "../AppContext/Context";
import toast from "react-hot-toast";

const MyBookings = () => {
  const { axios } = useAppContext();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("/api/booking/mybookings");
        setBookings(res.data.bookings);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch bookings.");
      }
    };
    
    fetchBookings();
  }, []);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString("en-US")} ${date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;
  };

  return (
    <div className="pt-24 px-4 md:px-10 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-lg text-gray-500">You have no bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => {
            const car = booking.car;
            return (
              <div
                key={booking._id}
                className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition"
              >
                <img
                  src={car?.images?.[0] || "/default-car.jpg"}
                  alt={car?.name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-indigo-600">
                       {car?.name} 
                    </h3>
                    <span
                      className={`text-sm px-2 py-1 rounded-full font-medium ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Check-In:</span>{" "}
                      {formatDateTime(booking.checkIn)}
                    </p>
                    <p>
                      <span className="font-medium">Check-Out:</span>{" "}
                      {formatDateTime(booking.checkOut)}
                    </p>
                    <p>
                      <span className="font-medium">Duration:</span>{" "}
                      {booking.totalHours} hour
                      {booking.totalHours !== 1 ? "s" : ""}
                    </p>
                    <p>
                      <span className="font-medium">Amount Paid:</span> ₹
                      {booking.totalAmount}
                    </p>
                    <p>
                      <span className="font-medium">Booked On:</span>{" "}
                      {formatDateTime(booking.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;