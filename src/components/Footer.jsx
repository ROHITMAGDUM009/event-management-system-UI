import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-bold text-blue-400 mb-4 block">
              EMS
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Your one-stop platform for discovering and managing amazing events.
            </p>
            <div className="flex gap-4">
              <SocialIcon platform="facebook" />
              <SocialIcon platform="twitter" />
              <SocialIcon platform="instagram" />
              <SocialIcon platform="linkedin" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link to="/events" className="text-gray-400 hover:text-white transition">Events</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-white transition">Login</Link></li>
              <li><Link to="/register" className="text-gray-400 hover:text-white transition">Register</Link></li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h4 className="font-bold text-lg mb-6">For Users</h4>
            <ul className="space-y-3">
              <li><Link to="/user" className="text-gray-400 hover:text-white transition">Dashboard</Link></li>
              <li><Link to="/user/my-bookings" className="text-gray-400 hover:text-white transition">My Bookings</Link></li>
              <li><Link to="/events" className="text-gray-400 hover:text-white transition">Browse Events</Link></li>
            </ul>
          </div>

          {/* For Organizers */}
          <div>
            <h4 className="font-bold text-lg mb-6">For Organizers</h4>
            <ul className="space-y-3">
              <li><Link to="/organizer" className="text-gray-400 hover:text-white transition">Dashboard</Link></li>
              <li><Link to="/organizer/create-event" className="text-gray-400 hover:text-white transition">Create Event</Link></li>
              <li><Link to="/organizer/my-events" className="text-gray-400 hover:text-white transition">My Events</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 Event Management System. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
              <Link to="/contact" className="hover:text-white transition">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ platform }) => {
  const icons = {
    facebook: "📘",
    twitter: "🐦",
    instagram: "📷",
    linkedin: "💼",
  };

  return (
    <a
      href="#"
      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center 
                 hover:bg-blue-600 transition text-lg"
    >
      {icons[platform]}
    </a>
  );
};

export default Footer;