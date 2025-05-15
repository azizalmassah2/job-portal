'use client';

import { useState } from 'react';
import { Lock, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AccountSettings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // تحقق من تطابق كلمة المرور الجديدة والتأكيد
    if (newPassword !== confirmPassword) {
      alert('كلمة المرور الجديدة غير متطابقة');
      return;
    }
    // تنفيذ عملية تغيير كلمة المرور (API)
    console.log('Changing password...');
  };

  const handleDeleteAccount = () => {
    // تنفيذ عملية حذف الحساب (API)
    console.log('Account deleted');
  };

  return (
    <main className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">إدارة الحساب</h1>

      {/* تغيير كلمة المرور */}
      <form
        onSubmit={handleChangePassword}
        className="space-y-5 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow border border-gray-200 dark:border-gray-800"
      >
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          <Lock size={20} /> تغيير كلمة المرور
        </h2>

        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300">كلمة المرور الحالية</label>
          <input
            type="password"
            className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300">كلمة المرور الجديدة</label>
          <input
            type="password"
            className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300">تأكيد كلمة المرور الجديدة</label>
          <input
            type="password"
            className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          حفظ كلمة المرور الجديدة
        </motion.button>
      </form>

      {/* حذف الحساب */}
      <div className="mt-10 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 p-6 rounded-2xl">
        <h2 className="text-xl font-semibold text-red-700 dark:text-red-400 flex items-center gap-2">
          <Trash2 size={20} /> حذف الحساب
        </h2>
        <p className="text-sm text-red-600 dark:text-red-300 mt-2">
          عند حذف الحساب، سيتم فقد جميع بياناتك بشكل نهائي. لا يمكن التراجع عن هذه العملية.
        </p>

        {deleteConfirm ? (
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md"
            onClick={handleDeleteAccount}
          >
            تأكيد حذف الحساب
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="mt-4 bg-red-500 text-white px-6 py-2 rounded-md"
            onClick={() => setDeleteConfirm(true)}
          >
            حذف الحساب
          </motion.button>
        )}
      </div>
    </main>
  );
};

export default AccountSettings;
