import { useState } from "react";
import { createPortal } from "react-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CustomDateTimePicker.css';

const CustomDateTimePicker = ({ isOpen, onClose, onSubmit, label }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(new Date().getHours());

  const handleConfirm = () => {
    const newDate = new Date(selectedDate);
    newDate.setHours(selectedHour);
    newDate.setMinutes(0);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);

    onSubmit(newDate);
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md text-center space-y-6">
        <h2 className="text-2xl font-semibold text-indigo-700">{label || "Pick Date & Time"}</h2>

        {/* Elegant Date Picker */}
        <div className="flex justify-center">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd MMMM yyyy"
            minDate={new Date()}
            inline
            calendarClassName="rounded-xl border border-gray-300 shadow-md"
            dayClassName={(date) =>
              "hover:bg-indigo-200 focus:bg-indigo-300 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-150"
            }
          />
        </div>

        {/* Time Slider */}
        <div className="mt-4">
          <label className="block mb-1 font-medium text-gray-700">Select Hour</label>
          <input
            type="range"
            min={0}
            max={23}
            value={selectedHour}
            onChange={(e) => setSelectedHour(Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
          <div className="mt-1 text-lg font-semibold text-indigo-700">
            {selectedHour === 0
              ? "12:00 AM"
              : selectedHour < 12
              ? `${selectedHour}:00 AM`
              : selectedHour === 12
              ? "12:00 PM"
              : `${selectedHour - 12}:00 PM`}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4 pt-2">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="w-full py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CustomDateTimePicker;