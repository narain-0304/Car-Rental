import { useState } from "react";
import { useAppContext } from "../../AppContext/Context";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

const carFields = [
  { name: "name", label: "Car Name", type: "text" },
  { name: "brand", label: "Brand", type: "text" },
  { name: "model", label: "Model", type: "text" },
  { name: "year", label: "Year", type: "number" },
  { name: "type", label: "Type", type: "text" },
  { name: "fuelType", label: "Fuel Type", type: "text" },
  { name: "transmission", label: "Transmission", type: "text" },
  { name: "seats", label: "Seats", type: "number" },
  { name: "rentPerHour", label: "Rent Per Hour (₹)", type: "number" },
  { name: "location", label: "Location", type: "text" },
];

const AddCar = () => {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    type: "",
    fuelType: "",
    transmission: "",
    seats: "",
    rentPerHour: "",
    location: "",
  });

  const { axios } = useAppContext();
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const selected = Array.from(e.target.files);
    const total = images.length + selected.length;

    if (total > 4) {
      toast.error("Maximum 4 images allowed.");
      return;
    }

    const newImages = [...images, ...selected];
    const newPreviews = selected.map((file) => URL.createObjectURL(file));

    setImages(newImages);
    setPreviewUrls((prev) => [...prev, ...newPreviews]);
  };

  const handleImageRemove = (index) => {
    const newImages = [...images];
    const newPreviews = [...previewUrls];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setPreviewUrls(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0)
      return toast.error("Please upload at least 1 image.");

    setSubmitting(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    images.forEach((img) => formData.append("carImages", img));

    try {
      const res = await axios.post("/api/cars/addcar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (!res.data.success) {
        toast.error(res.data.message || "Failed to add car.");
      } else {
        toast.success(res.data.message);
        setForm({
          name: "",
          brand: "",
          model: "",
          year: "",
          type: "",
          fuelType: "",
          transmission: "",
          seats: "",
          rentPerHour: "",
          location: "",
        });
        setImages([]);
        setPreviewUrls([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Unable to add car. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-8 mb-8">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700 text-center">
        Add New Car
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {carFields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                name={field.name}
                type={field.type}
                placeholder={field.label}
                value={form[field.name] || ""}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                required
                min={field.type === "number" ? 0 : undefined}
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Car Images <span className="text-gray-400">(max 4)</span>
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full border rounded-lg px-3 py-2 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition"
          />
          <div className="flex gap-4 flex-wrap mt-3">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`preview-${index}`}
                  className="w-28 h-28 object-cover rounded-lg border shadow"
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-80 hover:opacity-100 transition"
                  title="Remove"
                >
                  <FaTimes size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold text-lg shadow hover:bg-indigo-700 transition-all duration-200 mt-4"
        >
          {submitting ? "Adding..." : "Add Car"}
        </button>
      </form>
    </div>
  );
};

export default AddCar;