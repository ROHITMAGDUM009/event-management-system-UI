import { useEffect, useState } from "react";
import API from "../api/axios";

const AdminDashboard = () => {

    const [stats, setStats] = useState({
        users: 0,
        organizers: 0,
        events: 0,
        bookings: 0,
        revenue: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await API.get("/admin/dashboard-stats");
                setStats(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchStats();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-8">
                Admin Dashboard Overview
            </h1>

            <div className="grid md:grid-cols-3 gap-6">

                <StatCard title="Total Users" value={stats.users} />
                <StatCard title="Organizers" value={stats.organizers} />
                <StatCard title="Total Events" value={stats.events} />
                <StatCard title="Total Bookings" value={stats.bookings} />
                <StatCard title="Total Revenue (₹)" value={stats.revenue} />

            </div>
        </div>
    );
};

const StatCard = ({ title, value }) => (
    <div className="bg-white shadow-md rounded-lg p-6 border">
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
);

export default AdminDashboard;