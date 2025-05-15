'use client';

import { useState } from 'react';
import { User, Mail, Phone, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

type ProfileData = {
  fullName: string;
  email: string;
  phone: string;
  bio: string;
};

const initialData: ProfileData = {
  fullName: 'عزيز المساح',
  email: 'aziz@example.com',
  phone: '777-123-456',
  bio: 'باحث عن عمل متخصص في تطوير الويب باستخدام Next.js وFlutter.',
};

const Profile = () => {
  const [profile, setProfile] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">الملف الشخصي</h1>

      <form className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow border border-gray-200 dark:border-gray-800">
        {/* الاسم */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">الاسم الكامل</label>
          <div className="flex items-center gap-2">
            <User size={20} className="text-gray-500" />
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              className="w-full p-2 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* البريد الإلكتروني */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">البريد الإلكتروني</label>
          <div className="flex items-center gap-2">
            <Mail size={20} className="text-gray-500" />
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full p-2 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* رقم الهاتف */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">رقم الهاتف</label>
          <div className="flex items-center gap-2">
            <Phone size={20} className="text-gray-500" />
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full p-2 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* النبذة التعريفية */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">نبذة عنك</label>
          <div className="flex items-start gap-2">
            <FileText size={20} className="text-gray-500 mt-2" />
            <textarea
              name="bio"
              rows={4}
              value={profile.bio}
              onChange={handleChange}
              className="w-full p-2 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* زر الحفظ */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
          type="submit"
        >
          حفظ التعديلات
        </motion.button>
      </form>
    </main>
  );
};

export default Profile;
