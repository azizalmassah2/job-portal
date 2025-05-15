"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { Sun, Moon } from "lucide-react";
import { Switch } from "../../app/components/ui/switch";
import { Skeleton } from "../../app/components/ui/skeleton";
import { useTheme } from "next-themes";
import { Card, CardContent } from "../components/ui/card";
import { useMediaQuery } from "../../lib/hooks";
import Sidebar from "../components/ui/sidebar";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const { theme, setTheme } = useTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const [darkMode, setDarkMode] = useState(theme === "dark");

  useEffect(() => {
    setShowSidebar(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
    // Fetch your data here and set with setStats, setJobs, etc
  }, []);

  useEffect(() => {
    setTheme(darkMode ? "dark" : "light");
  }, [darkMode]);

  const pieData = [
    { name: "هندسة", value: 400 },
    { name: "تسويق", value: 300 },
    { name: "برمجة", value: 300 },
    { name: "إدارة", value: 200 }
  ];

  const COLORS = ["#6EE7B7", "#A78BFA", "#FCD34D", "#F472B6"];

  const lineData = [
    { name: "1 مايو", تقديمات: 40 },
    { name: "5 مايو", تقديمات: 24 },
    { name: "10 مايو", تقديمات: 45 },
    { name: "15 مايو", تقديمات: 60 }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === "dark"
      ? "bg-gradient-to-br from-gray-900 to-indigo-900 text-white"
      : "bg-gradient-to-br from-blue-100 to-purple-200 text-gray-900"}`}>
      <div className="flex">
        {showSidebar && <Sidebar />}

        <main className="flex-1 p-4 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">لوحة التحكم</h1>
            <div className="flex items-center gap-2">
              <Sun />
              <Switch enabled={darkMode} setEnabled={setDarkMode} />
              <Moon />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {["عدد الوظائف", "عدد الشركات", "المتقدمين الجدد", "نسبة النجاح"].map((label, i) => (
              <Card key={i} className="bg-white/20 backdrop-blur-md border border-white/30 shadow-neumorphism rounded-2xl">
                <CardContent className="p-4">
                  {loading ? <Skeleton className="h-6 w-full" /> : <p>{label}: 100</p>}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-neumorphism rounded-2xl">
              <CardContent className="p-4 h-80">
                {loading ? <Skeleton className="h-full w-full" /> : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-neumorphism rounded-2xl">
              <CardContent className="p-4 h-80">
                {loading ? <Skeleton className="h-full w-full" /> : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="تقديمات" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
