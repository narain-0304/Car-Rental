import { FaUsers, FaChartBar, FaCog, FaClipboardList } from "react-icons/fa";

const features = [
  {
    icon: <FaUsers className="text-indigo-600 text-2xl" />,
    title: "Manage Users",
    desc: "View, edit, or remove users and manage their permissions.",
  },
  {
    icon: <FaChartBar className="text-indigo-600 text-2xl" />,
    title: "View Reports",
    desc: "Access booking, revenue, and usage analytics.",
  },
  {
    icon: <FaCog className="text-indigo-600 text-2xl" />,
    title: "Settings",
    desc: "Configure admin and system settings.",
  },
  {
    icon: <FaClipboardList className="text-indigo-600 text-2xl" />,
    title: "Logs",
    desc: "Review system activity and audit logs.",
  },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-indigo-100 via-white to-indigo-200 py-10 px-2">
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8 drop-shadow">
        Admin Dashboard
      </h1>
      <div className="max-w-5xl mx-auto p-8 bg-white/95 shadow-xl rounded-3xl">
        <p className="text-gray-700 text-lg mb-8 text-center">
          Welcome to the Admin Dashboard. Here you can manage users, view reports, and perform administrative tasks.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((f, idx) => (
            <div
              key={f.title}
              className="flex items-start gap-4 bg-indigo-50 rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <div className="flex-shrink-0">{f.icon}</div>
              <div>
                <div className="font-semibold text-lg text-indigo-800">{f.title}</div>
                <div className="text-gray-600 text-sm">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;