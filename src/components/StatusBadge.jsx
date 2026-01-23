const StatusBadge = ({ value }) => {
  const colors = {
    APPROVED: "bg-green-600",
    PENDING: "bg-yellow-500",
    PAID: "bg-blue-600",
    REJECTED: "bg-red-600",
  };

  return (
    <span
      className={`px-3 py-1 rounded text-sm text-white ${
        colors[value] || "bg-gray-500"
      }`}
    >
      {value}
    </span>
  );
};

export default StatusBadge;
