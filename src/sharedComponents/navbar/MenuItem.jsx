const MenuItem = ({ icon, label, onClick, isAuthenticated = false }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl transition-all
      ${isAuthenticated ? "text-red-600 hover:bg-red-50 hover:text-red-700" : "hover:bg-blue-50"}`}
  >
    <span
      className={`text-lg ${isAuthenticated ? "text-red-500" : "text-blue-600"}`}
    >
      {icon}
    </span>
    <span className="text-xs sm:text-sm font-medium">{label}</span>
  </button>
);
export default MenuItem