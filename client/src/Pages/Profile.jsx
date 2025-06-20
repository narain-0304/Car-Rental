import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAppContext } from "../AppContext/Context";

const Profile = () => {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    phone: "",
    address: "",
    dob: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [aadharFile, setAadharFile] = useState(null);
  const [licenseFile, setLicenseFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/profile/me", {
          withCredentials: true,
        });

        if (res.data.success && res.data.profile) {
          setProfile(res.data.profile);
          setForm({
            phone: res.data.profile.phone || "",
            address: res.data.profile.address || "",
            dob: res.data.profile.dob?.slice(0, 10) || "",
          });
        } else {
          toast.error("Unauthorized. Please log in again.");
          logout();
          navigate("/");
        }
      } catch (err) {
        toast.error("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "aadhar") setAadharFile(files[0]);
    if (name === "license") setLicenseFile(files[0]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const { phone, address, dob } = form;

    if (!phone || !address || !dob) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      setUploading(true);
      const data = new FormData();
      data.append("phone", phone);
      data.append("address", address);
      data.append("dob", dob);
      if (aadharFile) data.append("aadharFile", aadharFile);
      if (licenseFile) data.append("licenseFile", licenseFile);

      const res = await axios.post("/api/profile/create-update", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success("Profile updated!");
        const updated = res.data.profile;
        setProfile(updated);
        setForm({
          phone: updated.phone || "",
          address: updated.address || "",
          dob: updated.dob?.slice(0, 10) || "",
        });
        setEditMode(false);
        setAadharFile(null);
        setLicenseFile(null);
      } else {
        toast.error(res.data.message || "Failed to update");
      }
    } catch (err) {
      toast.error("Server error while updating profile");
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 flex items-center justify-center px-4">
      <div className="w-full max-w-6xl bg-white/90 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-indigo-100">
        {/* Sidebar */}
        <div className="bg-gradient-to-b from-indigo-600 to-indigo-400 md:w-1/3 flex flex-col items-center justify-between py-12 px-8 gap-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-28 h-28 rounded-full bg-white shadow-lg flex items-center justify-center text-5xl font-bold text-indigo-600 mb-3 border-4 border-indigo-200">
              {user?.name?.[0] || "U"}
            </div>
            <div className="text-xl font-semibold text-white">{user?.name}</div>
            <div className="text-sm text-indigo-100">{user?.email}</div>
          </div>
          <div className="flex flex-col gap-4 w-full mt-10">
            <button
              onClick={() => navigate("/my-bookings")}
              className="w-full bg-white text-indigo-700 py-2 rounded-full font-semibold shadow hover:bg-indigo-50 transition-all duration-200 hover:scale-105"
            >
              My Bookings
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded-full font-semibold shadow hover:bg-red-600 transition-all duration-200 hover:scale-105"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Profile Form */}
        <div className="flex-1 p-8 md:p-14">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-500 text-sm">
              <Link to="/" className="hover:text-indigo-500 transition">Home</Link> /{" "}
              <span className="text-indigo-600 font-medium">Profile</span>
            </p>
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transform hover:scale-105 transition-all shadow"
              >
                Edit Profile
              </button>
            )}
          </div>

          <h2 className="text-4xl font-bold text-indigo-700 mb-10 text-center">
            My Profile
          </h2>

          {isLoading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <form onSubmit={handleSave} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={!editMode}
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    disabled={!editMode}
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                    disabled={!editMode}
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Aadhar File</label>
                  <input
                    type="file"
                    name="aadhar"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    disabled={!editMode}
                    className="w-full border border-gray-300 rounded-md px-3 py-1 bg-white file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition"
                  />
                  {profile?.aadharUrl && (
                    <a
                      href={profile.aadharUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-indigo-600 underline mt-2 inline-block hover:text-indigo-800 transition"
                    >
                      📄 View Uploaded
                    </a>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">License File</label>
                  <input
                    type="file"
                    name="license"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    disabled={!editMode}
                    className="w-full border border-gray-300 rounded-md px-3 py-1 bg-white file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition"
                  />
                  {profile?.licenseUrl && (
                    <a
                      href={profile.licenseUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-indigo-600 underline mt-2 inline-block hover:text-indigo-800 transition"
                    >
                      📄 View Uploaded
                    </a>
                  )}
                </div>
              </div>

              {editMode && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={uploading}
                    className={`bg-green-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-green-700 transform hover:scale-105 transition-all duration-200 ${
                      uploading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {uploading ? "Saving..." : "Save Profile"}
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;