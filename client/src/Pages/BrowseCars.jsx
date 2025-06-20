import { useEffect, useState } from "react";
import CarCard from "../components/CarCard";
import toast from "react-hot-toast";
import { useAppContext } from "../AppContext/Context";
import CustomDateTimePicker from "../Components/CustomDateTimePicker";

const BrowseCars = () => {
  const { axios } = useAppContext();

  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [seats, setSeats] = useState("");
  const [type, setType] = useState("");
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");

  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    now.setHours(now.getHours() + 2);

    const defaultCheckIn = new Date(now);
    const defaultCheckOut = new Date(now);
    defaultCheckOut.setHours(defaultCheckIn.getHours() + 24);

    setStartDateTime(defaultCheckIn);
    setEndDateTime(defaultCheckOut);
  }, []);

  useEffect(() => {
    if (startDateTime && endDateTime && cars.length === 0) {
      fetchAvailableCars();
    }
  }, [startDateTime, endDateTime]);

  const fetchAvailableCars = async () => {
    if (!startDateTime || !endDateTime) {
      return toast.error("Please select date & time range.");
    }

    if (startDateTime >= endDateTime) {
      return toast.error("End time must be after start time.");
    }

    try {
      const res = await axios.get("/api/cars/available", {
        params: {
          checkIn: startDateTime.toISOString(),
          checkOut: endDateTime.toISOString(),
        },
      });
      setCars(res.data.cars);
    } catch (err) {
      console.error(err);
      toast.error("Failed fetching available cars.");
    }
  };

  useEffect(() => {
    let data = [...cars];

    if (search) {
      data = data.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.type.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (location) data = data.filter((c) => c.location === location);
    if (priceRange) {
      const map = {
        below1500: (c) => c.rentPerHour < 1500,
        "1500to2000": (c) => c.rentPerHour >= 1500 && c.rentPerHour <= 2000,
        "2000to3000": (c) => c.rentPerHour > 2000 && c.rentPerHour <= 3000,
        above3000: (c) => c.rentPerHour > 3000,
      };
      data = data.filter(map[priceRange]);
    }
    if (seats) data = data.filter((c) => c.seats === +seats);
    if (type) data = data.filter((c) => c.type === type);
    if (fuel) data = data.filter((c) => c.fuelType === fuel);
    if (transmission)
      data = data.filter((c) => c.transmission === transmission);

    setFilteredCars(data);
  }, [cars, search, location, priceRange, seats, type, fuel, transmission]);

  return (
    <div className="pt-24 mb-20 flex flex-col lg:flex-row px-4 md:px-10 space-y-6 lg:space-y-0 lg:space-x-8 min-h-screen bg-gray-50">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-80 bg-white rounded-xl shadow p-6 space-y-6 sticky top-24 h-fit">
        {/* Custom Start Time Picker */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Start Time
          </label>
          <button
            onClick={() => setShowStartPicker(true)}
            className="w-full px-3 py-2 border rounded-lg text-left bg-white"
          >
            {startDateTime?.toLocaleString() || "Select Start Time"}
          </button>
        </div>

        {/* Custom End Time Picker */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            End Time
          </label>
          <button
            onClick={() => setShowEndPicker(true)}
            className="w-full px-3 py-2 border rounded-lg text-left bg-white"
          >
            {endDateTime?.toLocaleString() || "Select End Time"}
          </button>
        </div>

        <button
          onClick={fetchAvailableCars}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Show Available Cars
        </button>

        {/* Filter Inputs */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or type"
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
        />

        {[
          {
            label: "Location",
            state: location,
            setState: setLocation,
            options: [
              ["", "Select Location"],
              ["Chennai", "Chennai"],
              ["Coimbatore", "Coimbatore"],
              ["Salem", "Salem"],
              ["Madurai", "Madurai"],
            ],
          },
          {
            label: "Price Range",
            state: priceRange,
            setState: setPriceRange,
            options: [
              ["", "All"],
              ["below1500", "Below ₹1500"],
              ["1500to2000", "₹1500 - ₹2000"],
              ["2000to3000", "₹2000 - ₹3000"],
              ["above3000", "Above ₹3000"],
            ],
          },
          {
            label: "Seats",
            state: seats,
            setState: setSeats,
            options: [
              ["", "Any"],
              ["2", "2"],
              ["4", "4"],
              ["5", "5"],
              ["7", "7"],
            ],
          },
          {
            label: "Car Type",
            state: type,
            setState: setType,
            options: [
              ["", "Any"],
              ["Sedan", "Sedan"],
              ["SUV", "SUV"],
              ["Hatchback", "Hatchback"],
            ],
          },
          {
            label: "Fuel Type",
            state: fuel,
            setState: setFuel,
            options: [
              ["", "Any"],
              ["Petrol", "Petrol"],
              ["Diesel", "Diesel"],
              ["Electric", "Electric"],
            ],
          },
          {
            label: "Transmission",
            state: transmission,
            setState: setTransmission,
            options: [
              ["", "Any"],
              ["Manual", "Manual"],
              ["Automatic", "Automatic"],
            ],
          },
        ].map((filter) => (
          <div key={filter.label}>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              {filter.label}
            </label>
            <select
              value={filter.state}
              onChange={(e) => filter.setState(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            >
              {filter.options.map(([val, label], index) => (
                <option key={`${filter.label}-${index}`} value={val}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </aside>

      {/* Cars Grid */}
      <section className="flex-1">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {filteredCars.length} car{filteredCars.length !== 1 ? "s" : ""}{" "}
          available
        </h2>

        {filteredCars.length === 0 ? (
          <p className="text-gray-500 text-lg">No cars match your criteria.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {filteredCars.map((car) => (
              <CarCard
                key={car._id}
                car={car}
                checkIn={startDateTime.toISOString()}
                checkOut={endDateTime.toISOString()}
              />
            ))}
          </div>
        )}
      </section>

      {/* Custom Modal Pickers */}
      <CustomDateTimePicker
        isOpen={showStartPicker}
        onClose={() => setShowStartPicker(false)}
        onSubmit={(date) => setStartDateTime(date)}
        label="Start Time"
      />
      <CustomDateTimePicker
        isOpen={showEndPicker}
        onClose={() => setShowEndPicker(false)}
        onSubmit={(date) => setEndDateTime(date)}
        label="End Time"
      />
    </div>
  );
};

export default BrowseCars;