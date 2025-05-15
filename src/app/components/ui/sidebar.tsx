"use client";
import { motion } from "framer-motion";
import { Briefcase, Users, Bell, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useMediaQuery } from "../../../lib/hooks";

const navItems = [
  { icon: <LayoutDashboard size={18} />, label: "Dashboard", href: "/dashboard" },
  { icon: <Briefcase size={18} />, label: "Jobs", href: "/jobs" },
  { icon: <Users size={18} />, label: "Applicants", href: "/applicants" },
  { icon: <Bell size={18} />, label: "Notifications", href: "/notifications" },
];

export default function Sidebar() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-md shadow-md p-4 rounded-2xl fixed lg:static top-4 left-4 z-50 w-64 h-[90vh]"
    >
      <nav className="flex flex-col gap-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 p-2 hover:bg-white/20 dark:hover:bg-black/20 rounded-xl transition-colors"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </motion.aside>
  );
}
