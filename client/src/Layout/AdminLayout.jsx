import { Link, Outlet } from "react-router-dom";
import { useAppContext } from "../AppContext/Context";
import toast from "react-hot-toast";
import { FaCar, FaSignOutAlt, FaListAlt, FaPlus, FaClipboardList } from "react-icons/fa";

const AdminLayout = () => {
  const { setIsAdmin, axios, navigate } = useAppContext();

  const handleLogout = async () => {
    try {
      const { data } = await axios.get("/api/admin/logout");
      if (data.success) {
        setIsAdmin(false);
        navigate("/admin/login");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Logout failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <nav className="bg-gray-900 p-4 text-white flex flex-col md:flex-row md:justify-between md:items-center shadow-lg">
        <div
          className="text-2xl font-extrabold tracking-tight cursor-pointer flex items-center gap-2 mb-4 md:mb-0"
          onClick={() => navigate('/admin')}
        >
          <FaCar className="text-yellow-400" />
          <span>Admin Panel</span>
        </div>
        <ul className="flex flex-col md:flex-row md:space-x-8 gap-2 md:gap-0">
          <li>
            <Link
              to="/admin/add-cars"
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-800 hover:text-yellow-400 transition"
            >
              <FaPlus /> Add Cars
            </Link>
          </li>
          <li>
            <Link
              to="/admin/view-cars"
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-800 hover:text-yellow-400 transition"
            >
              <FaListAlt /> View Cars
            </Link>
          </li>
          <li>
            <Link
              to="/admin/view-bookings"
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-800 hover:text-yellow-400 transition"
            >
              <FaClipboardList /> View Bookings
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-800 hover:text-red-400 transition"
            >
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </nav>
      <div className="p-4 md:p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;