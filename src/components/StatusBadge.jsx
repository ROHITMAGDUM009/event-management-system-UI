const colors = {
  APPROVED: "bg-green-600",
  PENDING: "bg-yellow-500",
  REJECTED: "bg-red-600",
  PAID: "bg-blue-600",
  NOT_REQUIRED: "bg-gray-400",
};

const StatusBadge = ({ value }) => (
  <span className={`px-3 py-1 text-white text-xs rounded ${colors[value]}`}>
    {value}
  </span>
);

export default StatusBadge;
