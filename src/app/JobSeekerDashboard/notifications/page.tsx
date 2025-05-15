'use client';

import { useState } from 'react';
import { Bell, CheckCircle2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'تم تحديث حالة طلبك',
    description: 'تم قبول طلب التوظيف في شركة التقنية الحديثة.',
    date: 'قبل 2 ساعات',
    read: false,
  },
  {
    id: '2',
    title: 'فرصة عمل جديدة',
    description: 'تم نشر وظيفة جديدة مناسبة لمهاراتك في شركة برمجيات ألفا.',
    date: 'قبل يوم',
    read: true,
  },
  {
    id: '3',
    title: 'تذكير مقابلة عمل',
    description: 'لديك مقابلة عمل غداً مع شركة المستقبل.',
    date: 'قبل 3 أيام',
    read: false,
  },
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-900 dark:text-white">
        <Bell className="text-blue-600" size={28} />
        الإشعارات
      </h1>

      {notifications.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">لا توجد إشعارات جديدة.</p>
      ) : (
        <ul className="space-y-4">
          <AnimatePresence>
            {notifications.map(({ id, title, description, date, read }) => (
              <motion.li
                key={id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                layout
                className={`p-4 rounded-xl border ${
                  read
                    ? 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700'
                    : 'bg-blue-50 dark:bg-blue-900 border-blue-400 dark:border-blue-700 shadow-md'
                } flex justify-between items-start`}
              >
                <div className="flex flex-col max-w-[80%]">
                  <h2 className="font-semibold text-lg text-gray-900 dark:text-white">{title}</h2>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">{description}</p>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{date}</span>
                </div>

                <div className="flex flex-col items-center justify-start space-y-2">
                  {!read && (
                    <button
                      onClick={() => markAsRead(id)}
                      className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                      aria-label="تمييز كمقروء"
                      title="تمييز كمقروء"
                    >
                      <CheckCircle2 size={22} />
                    </button>
                  )}

                  <button
                    onClick={() => removeNotification(id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    aria-label="حذف الإشعار"
                    title="حذف الإشعار"
                  >
                    <Trash2 size={22} />
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </main>
  );
};

export default NotificationsPage;
