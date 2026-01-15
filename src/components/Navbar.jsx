import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">
          EMS
        </h1>

        <div className="space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
         </Link>
        <Link to="/events" className="text-gray-700 hover:text-blue-600">
  Events
</Link>

          <Link to="/login" className="text-gray-700 hover:text-blue-600">
            Login
          </Link>
          <Link to="/register" className="text-gray-700 hover:text-blue-600">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
