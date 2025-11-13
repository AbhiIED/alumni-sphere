import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "@/component/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminDashboard() {
  const location = useLocation();
  const isDashboardHome = location.pathname === "/admin-dashboard";

  // Dashboard Stats
  const [stats, setStats] = useState({
    totalAlumni: 0,
    activeStudents: 0,
    upcomingEvents: 0,
    jobPostings: 0,
    totalDonationAmount: 0,
    totalDonationCount: 0,
  });

  // Monthly Chart Data
  const [chartData, setChartData] = useState([]);

  // Fetch Dashboard Stats
  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin-dashboard/stats");
      const data = await res.json();
      setStats(data);

      // Generate sample chart data (You can replace with real monthly donation data)
      const generatedChart = [
        { month: "Jan", value: data.totalDonationAmount * 0.00 },
       
        { month: "May", value: data.totalDonationAmount },
      ];

      setChartData(generatedChart);
    } catch (error) {
      console.error("Error loading dashboard stats", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {isDashboardHome ? (
          <>
            {/* Header */}
            <header className="flex justify-between items-center mb-10">
              <h1 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h1>
            </header>

            {/* Stats Section */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">

              {/* Total Alumni */}
              <Card>
                <CardHeader>
                  <CardTitle>Total Alumni</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-blue-600">
                    {stats.totalAlumni}
                  </p>
                </CardContent>
              </Card>

              {/* Active Students */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-600">
                    {stats.activeStudents}
                  </p>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-orange-500">
                    {stats.upcomingEvents}
                  </p>
                </CardContent>
              </Card>

              {/* Job Postings */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Postings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-purple-600">
                    {stats.jobPostings}
                  </p>
                </CardContent>
              </Card>

              {/* ⭐ Total Donations */}
              <Card>
                <CardHeader>
                  <CardTitle>Total Donations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-red-600">
                    ₹{Number(stats.totalDonationAmount).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {stats.totalDonationCount} contributions
                  </p>
                </CardContent>
              </Card>

            </section>

            {/* Chart Section */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Donation Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </section>
          </>
        ) : (
          <Outlet /> // Renders child admin screens
        )}
      </main>
    </div>
  );
}
