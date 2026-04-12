import { useState } from "react";
import { bookEvent, payForBooking } from "../api/bookingApi";

const BookingModal = ({ event, onClose }) => {
  // ─── STATE ───────────────────────────────────────────────
  const [step, setStep] = useState("book"); // "book" | "pay" | "success"
  const [bookingId, setBookingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ─── FORMAT DATE ─────────────────────────────────────────
  const formatDate = (dateStr) => {
    if (!dateStr) return "Date TBD";
    try {
      return new Date(dateStr).toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  // ─── STEP 1 — CREATE BOOKING ─────────────────────────────
  const handleBooking = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await bookEvent(event.id);
      setBookingId(res.data.id);
      setStep("pay");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Booking failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ─── STEP 2 — PAY FOR BOOKING ────────────────────────────
  const handlePayment = async () => {
    setLoading(true);
    setError("");
    try {
      await payForBooking(bookingId);
      setStep("success");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Payment failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ─── MODAL WRAPPER ───────────────────────────────────────
  const ModalWrapper = ({ children }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 
                    flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl w-full max-w-md 
                      shadow-2xl relative animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 
                     hover:text-gray-700 text-xl font-bold 
                     transition"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );

  // ─── SUCCESS SCREEN ──────────────────────────────────────
  if (step === "success") {
    return (
      <ModalWrapper>
        <div className="p-8 text-center">

          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-100 rounded-full 
                          flex items-center justify-center 
                          mx-auto mb-4">
            <span className="text-3xl">✅</span>
          </div>

          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Your booking has been confirmed.
          </p>

          {/* Booking Details */}
          <div className="bg-green-50 border border-green-200 
                          rounded-lg p-4 text-left mb-6">
            <p className="text-gray-700 font-semibold text-sm mb-1">
              🎪 {event?.title}
            </p>
            <p className="text-gray-500 text-xs">
              📅 {formatDate(event?.eventDate)}
            </p>
            <p className="text-gray-500 text-xs">
              📍 {event?.location ?? "Venue TBD"}
            </p>
            <p className="text-gray-500 text-xs mt-2">
              🔖 Booking ID:{" "}
              <span className="font-mono font-bold text-green-700">
                #{bookingId}
              </span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-green-600 text-white py-2 
                       rounded-lg hover:bg-green-700 transition 
                       font-medium"
          >
            Done
          </button>
        </div>
      </ModalWrapper>
    );
  }

  // ─── PAYMENT SCREEN ──────────────────────────────────────
  if (step === "pay") {
    return (
      <ModalWrapper>
        <div className="p-6">

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              💳 Complete Payment
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Confirm your payment to finalize the booking
            </p>
          </div>

          {/* Event Summary */}
          <div className="bg-blue-50 border border-blue-200 
                          rounded-lg p-4 mb-5">
            <p className="font-semibold text-gray-800 text-sm mb-1">
              🎪 {event?.title}
            </p>
            <p className="text-gray-500 text-xs">
              📅 {formatDate(event?.eventDate)}
            </p>
            <p className="text-gray-500 text-xs">
              📍 {event?.location ?? "Venue TBD"}
            </p>
            <p className="text-gray-500 text-xs mt-1">
              🔖 Booking ID:{" "}
              <span className="font-mono font-bold">#{bookingId}</span>
            </p>
          </div>

          {/* Amount */}
          <div className="flex justify-between items-center 
                          bg-gray-50 rounded-lg p-4 mb-5">
            <span className="text-gray-600 font-medium">
              Amount to Pay
            </span>
            <span className="text-2xl font-bold text-blue-600">
              {event?.price > 0 ? `₹${event.price}` : "Free"}
            </span>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 
                            rounded-lg mb-4 text-sm">
              ⚠️ {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setStep("book")}
              disabled={loading}
              className="flex-1 border border-gray-300 text-gray-600 
                         py-2 rounded-lg hover:bg-gray-50 transition 
                         text-sm"
            >
              ← Back
            </button>
            <button
              onClick={handlePayment}
              disabled={loading}
              className={`flex-1 py-2 rounded-lg text-white 
                         font-medium transition text-sm
                         ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 
                                   border-b-2 border-white"></span>
                  Processing...
                </span>
              ) : (
                `Pay ₹${event?.price > 0 ? event.price : "0"}`
              )}
            </button>
          </div>

        </div>
      </ModalWrapper>
    );
  }

  // ─── DEFAULT — BOOKING SCREEN ────────────────────────────
  return (
    <ModalWrapper>
      <div className="p-6">

        {/* Header */}
        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-800">
            🎟️ Book Event
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Review event details before booking
          </p>
        </div>

        {/* Event Details Card */}
        <div className="bg-gray-50 border border-gray-200 
                        rounded-lg p-4 mb-5 space-y-2">
          <p className="text-gray-800 font-semibold text-base">
            🎪 {event?.title ?? "Event"}
          </p>
          <p className="text-gray-500 text-sm">
            📅 {formatDate(event?.eventDate)}
          </p>
          <p className="text-gray-500 text-sm">
            📍 {event?.location ?? "Venue TBD"}
          </p>
          {event?.description && (
            <p className="text-gray-400 text-xs mt-1 line-clamp-2">
              {event.description}
            </p>
          )}
        </div>

        {/* Price Banner */}
        <div className="flex justify-between items-center 
                        bg-blue-50 border border-blue-200 
                        rounded-lg p-4 mb-5">
          <div>
            <p className="text-xs text-gray-500">Event Price</p>
            <p className="text-2xl font-bold text-blue-600">
              {event?.price > 0 ? `₹${event.price}` : "Free"}
            </p>
          </div>
          {event?.price > 0 ? (
            <span className="bg-blue-100 text-blue-700 text-xs 
                             font-medium px-3 py-1 rounded-full">
              Paid Event
            </span>
          ) : (
            <span className="bg-green-100 text-green-700 text-xs 
                             font-medium px-3 py-1 rounded-full">
              Free Entry
            </span>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 
                          rounded-lg mb-4 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-600 
                       py-2 rounded-lg hover:bg-gray-50 transition 
                       text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleBooking}
            disabled={loading}
            className={`flex-1 py-2 rounded-lg text-white 
                       font-medium transition text-sm
                       ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
              }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 
                                 border-b-2 border-white"></span>
                Booking...
              </span>
            ) : (
              "Confirm Booking →"
            )}
          </button>
        </div>

        {/* Note */}
        <p className="text-center text-gray-400 text-xs mt-4">
          🔒 Your booking is secure. You can pay in the next step.
        </p>

      </div>
    </ModalWrapper>
  );
};

export default BookingModal;