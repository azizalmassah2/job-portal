'use client';

import { BookmarkCheck, Briefcase, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const savedJobs = [
  {
    id: '1',
    title: 'مصمم واجهات UI/UX',
    company: 'شركة التقنية الحديثة',
    location: 'صنعاء، اليمن',
    savedAt: 'منذ 3 أيام',
  },
  {
    id: '2',
    title: 'مطور Flutter',
    company: 'برمجيات ألفا',
    location: 'عدن، اليمن',
    savedAt: 'منذ أسبوع',
  },
];

const SavedJobsPage = () => {
  const handleRemove = (id: string) => {
    // تنفيذ API لحذف الوظيفة من المفضلة
    console.log('Removing job with ID:', id);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2 text-gray-900 dark:text-white">
        <BookmarkCheck className="text-blue-600" /> الوظائف المحفوظة
      </h1>

      {savedJobs.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">لم تقم بحفظ أي وظيفة بعد.</p>
      ) : (
        <div className="space-y-6">
          {savedJobs.map((job) => (
            <motion.div
              key={job.id}
              whileHover={{ scale: 1.01 }}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-sm flex justify-between items-start"
            >
              <div>
                <Link href={`/job/${job.id}`}>
                  <h2 className="text-xl font-semibold text-blue-700 hover:underline dark:text-blue-400">
                    {job.title}
                  </h2>
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <Briefcase className="inline mr-1 text-gray-500" size={16} />
                  {job.company} - {job.location}
                </p>
                <p className="text-xs text-gray-400 mt-1">تم الحفظ: {job.savedAt}</p>
              </div>
              <button
                onClick={() => handleRemove(job.id)}
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              >
                <Trash2 size={20} />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
};

export default SavedJobsPage;
