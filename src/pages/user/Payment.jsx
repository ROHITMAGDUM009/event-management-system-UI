import { useLocation, useNavigate } from "react-router-dom";
import { bookEvent } from "../../api/bookingApi";
import { useState, useEffect } from "react";

const Payment = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const { event, ticketQty, totalAmount } = state || {};

    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);

        try {
            // 👉 simulate payment success
            await new Promise((res) => setTimeout(res, 1500));

            // 👉 after payment → book event
            await bookEvent({
                eventId: event.id,
                ticketQuantity: ticketQty
            });

            navigate("/success");
        } catch (err) {
            alert("Payment failed");
        } finally {
            setLoading(false);
        }
    };

    if (!event) return <div className="p-10 text-center">Invalid payment request</div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow w-full max-w-md">

                <h2 className="text-xl font-bold mb-4">Payment</h2>

                <p className="mb-2"><strong>Event:</strong> {event.title}</p>
                <p className="mb-2"><strong>Tickets:</strong> {ticketQty}</p>
                <p className="mb-4 text-lg font-bold">Total: ₹{totalAmount}</p>

                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-2 rounded"
                >
                    {loading ? "Processing..." : "Pay Now"}
                </button>

            </div>
        </div>
    );
};

export default Payment;