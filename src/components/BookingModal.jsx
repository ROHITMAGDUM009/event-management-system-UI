const BookingModal = ({ event, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">
          Book Event
        </h2>

        <p className="text-gray-600 mb-4">
          <strong>{event.title}</strong><br />
          {event.date} • {event.location}
        </p>

        {/* FORM */}
        <form className="space-y-4">

          <div>
            <label className="block text-sm font-medium">
              Number of Seats
            </label>
            <input
              type="number"
              min="1"
              defaultValue="1"
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Your Email
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <span className="font-bold text-blue-600">
              Total: ₹{event.price}
            </span>

            <button
              type="button"
              onClick={() => alert("Booking successful (UI only)")}
              className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
            >
              Confirm Booking
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default BookingModal;
