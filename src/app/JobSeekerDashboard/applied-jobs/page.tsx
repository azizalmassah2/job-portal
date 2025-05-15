'use client';

import { Briefcase, Calendar, CheckCircle, Clock, X } from 'lucide-react';
import { motion } from 'framer-motion';

type JobApplication = {
  id: string;
  title: string;
  company: string;
  status: 'قيد المراجعة' | 'مقبول' | 'مرفوض';
  appliedAt: string;
};

const applications: JobApplication[] = [
  {
    id: '1',
    title: 'مهندس برمجيات',
    company: 'شركة التقنية الحديثة',
    status: 'قيد المراجعة',
    appliedAt: '2025-05-10',
  },
  {
    id: '2',
    title: 'مصمم UI/UX',
    company: 'شركة الإبداع الرقمي',
    status: 'مقبول',
    appliedAt: '2025-04-25',
  },
  {
    id: '3',
    title: 'مدير مشاريع',
    company: 'المستقبل الذكي',
    status: 'مرفوض',
    appliedAt: '2025-04-20',
  },
];

const statusColors = {
  'قيد المراجعة': 'text-yellow-600 dark:text-yellow-400',
  'مقبول': 'text-green-600 dark:text-green-400',
  'مرفوض': 'text-red-600 dark:text-red-400',
};

const AppliedJobs = () => {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        الوظائف التي تقدمت لها
      </h1>

      <div className="space-y-6">
        {applications.map((job) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow border border-gray-200 dark:border-gray-800"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <Briefcase size={20} />
                {job.title}
              </h2>
              <span
                className={`text-sm font-medium ${statusColors[job.status]} flex items-center gap-1`}
              >
                {job.status === 'قيد المراجعة' && <Clock size={16} />}
                {job.status === 'مقبول' && <CheckCircle size={16} />}
                {job.status === 'مرفوض' && <X size={16} />}
                {job.status}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              الشركة: <span className="font-medium">{job.company}</span>
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">
              <Calendar size={16} />
              تم التقديم بتاريخ: {job.appliedAt}
            </p>
          </motion.div>
        ))}
      </div>
    </main>
  );
};

export default AppliedJobs;
