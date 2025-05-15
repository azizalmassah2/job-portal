'use client';

import { motion } from 'framer-motion';
import { Briefcase, Bookmark, FileText, Bell } from 'lucide-react';
import Link from 'next/link';

const DashboardCard = ({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md transition-all border border-gray-200 dark:border-gray-800"
  >
    <Link href={href}>
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-300">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </Link>
  </motion.div>
);

export default function JobSeekerDashboard() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">لوحة التحكم</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          icon={<FileText size={24} />}
          title="ملفي الشخصي"
          description="تحكم في بياناتك والسيرة الذاتية"
          href="JobSeekerDashboard/profile"
        />
        <DashboardCard
          icon={<Briefcase size={24} />}
          title="اعدادات الحساب"
          description="عرض وتعديل بيانات الحساب"
          href="JobSeekerDashboard/account-settings"
        />
        <DashboardCard
          icon={<Briefcase size={24} />}
          title="الوظائف التي تقدمت لها"
          description="عرض وتتبع حالة طلباتك"
          href="JobSeekerDashboard/applied-jobs"
        />
        <DashboardCard
          icon={<Bookmark size={24} />}
          title="الوظائف المحفوظة"
          description="احتفظ بالوظائف المفضلة للرجوع إليها لاحقًا"
          href="JobSeekerDashboard/saved-jobs"
        />
        <DashboardCard
          icon={<Bell size={24} />}
          title="الإشعارات"
          description="تنبيهات عن الوظائف والتحديثات"
          href="JobSeekerDashboard/notifications"
        />
      </div>
    </main>
  );
}
