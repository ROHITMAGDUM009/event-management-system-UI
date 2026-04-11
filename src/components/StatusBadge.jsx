const colors = {
  APPROVED: "bg-green-600",
  PENDING: "bg-yellow-500",
  REJECTED: "bg-red-600",
  CANCELLED: "bg-gray-600",
  PAID: "bg-blue-600",
  SUCCESS: "bg-green-500",
  FAIL: "bg-red-400",
  FAILED: "bg-red-400",
  NOT_REQUIRED: "bg-gray-400",
};

const StatusBadge = ({ value }) => (
  <span className={`px-3 py-1 text-white text-xs rounded ${colors[value] || "bg-gray-400"}`}>
    {value}
  </span>
);

export default StatusBadge;
