import { useEffect, useState } from "react";
import { useAppContext } from "../../AppContext/Context";
import toast from "react-hot-toast";
import {
  FaCarSide,
  FaUser,
  FaRupeeSign,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

const statusColors = {
  confirmed: "bg-green-500",
    pending: "bg-yellow-500",
  Cancelled: "bg-red-500",
  cancelled: "bg-red-500",
};

// Helper to format date without seconds
const formatDateTime = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const AdminBookingsPage = () => {
  const { axios } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("/api/booking/allbookings");
        const sortedBookings = res.data.bookings.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBookings(sortedBookings);
      } catch (err) {
        toast.error("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [axios]);

  if (loading)
    return (
      <div className="pt-28 flex flex-col items-center justify-center min-h-[40vh]">
        <FaClock className="animate-spin text-indigo-500 text-4xl mb-2" />
        <span className="text-indigo-500 text-lg">Loading bookings...</span>
      </div>
    );

  return (
    <div className="pt-28 px-2 md:px-6 max-w-7xl mx-auto space-y-8">
      <h2 className="text-3xl font-extrabold text-indigo-700 flex items-center gap-2 mb-6">
        <FaCarSide className="text-indigo-500" /> All Bookings
      </h2>
      {bookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500 text-lg">
          No bookings found.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Header Row */}
          <div className="hidden md:flex items-center gap-6 bg-indigo-50 px-4 py-2 rounded-lg font-semibold text-indigo-700 text-sm tracking-wide shadow">
            <div className="w-56">Car</div>
            <div className="w-48">User</div>
            <div className="w-56">Check-in / Check-out</div>
            <div className="w-28">Hours</div>
            <div className="w-32">Status</div>
            <div className="w-32">Amount</div>
            <div className="w-20">Paid</div>
            <div className="w-44">Created</div>
          </div>
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 bg-white border rounded-2xl px-4 py-4 shadow hover:shadow-lg transition"
            >
              {/* Car Info */}
              <div className="flex items-center gap-2 w-full md:w-56">
                <FaCarSide className="text-indigo-600" />
                <div>
                  <div className="font-semibold text-indigo-700">
                    {booking.car?.name || "N/A"}
                  </div>
                  <div className="text-xs text-gray-400 font-mono">
                    Car ID: {booking.car?._id}
                  </div>
                  <div className="text-xs text-gray-400 font-mono">
                    Booking ID: {booking._id}
                  </div>
                </div>
              </div>
              {/* User Info */}
              <div className="flex items-center gap-2 w-full md:w-48">
                <FaUser className="text-indigo-700" />
                <div>
                  <div className="font-semibold text-indigo-800">
                    {booking.user?.name || "N/A"}
                  </div>
                  <div className="text-xs text-gray-400 font-mono">
                    User ID: {booking.user?._id}
                  </div>
                </div>
              </div>
              {/* Time & Status */}
              <div className="flex flex-col w-full md:w-56 text-sm">
                <div>
                  <b>In:</b>{" "}
                  <span className="text-gray-700">
                    {formatDateTime(booking.checkIn)}
                  </span>
                </div>
                <div>
                  <b>Out:</b>{" "}
                  <span className="text-gray-700">
                    {formatDateTime(booking.checkOut)}
                  </span>
                </div>
              </div>
              <div className="w-full md:w-28 text-center text-gray-700 font-semibold">
                {booking.totalHours}
              </div>
              <div className="w-full md:w-32 flex items-center justify-center">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded text-white text-xs font-semibold ${
                    statusColors[booking.status] || "bg-gray-400"
                  }`}
                >
                  {booking.status === "confirmed" && <FaCheckCircle />}
                  {booking.status === "pending" && <FaClock />}
                  {(booking.status === "Cancelled" ||
                    booking.status === "cancelled") && <FaTimesCircle />}
                  {booking.status}
                </span>
              </div>
              {/* Payment Info */}
              <div className="w-full md:w-32 flex items-center gap-1 text-gray-700 font-semibold">
                <FaRupeeSign className="text-green-600" />
                ₹{booking.totalAmount}
              </div>
              <div className="w-full md:w-20 text-center">
                <span
                  className={`font-bold ${
                    booking.isPaid ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {booking.isPaid ? "Yes" : "No"}
                </span>
              </div>
              <div className="w-full md:w-44 text-xs text-gray-600 text-center">
                {formatDateTime(booking.createdAt)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBookingsPage;