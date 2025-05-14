'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react'; // أيقونة تحميل

type Job = {
  id: number;
  title: string;
  description: string;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('/api/jobs');
        if (!res.ok) throw new Error('فشل جلب الوظائف');
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ شريط علوي */}
      <nav className="bg-white shadow px-6 py-4 mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">منصة التوظيف</Link>
          <div className="space-x-4">
            <Link href="/jobs" className="text-gray-700 hover:text-blue-500">الوظائف</Link>
            <Link href="/add-job" className="text-gray-700 hover:text-blue-500">أضف وظيفة</Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">الوظائف المتاحة</h1>

        {/* تحميل */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
            <span className="ml-2 text-blue-500">جارٍ تحميل الوظائف...</span>
          </div>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-500">لا توجد وظائف حالياً.</p>
        ) : (
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
              <li key={job.id} className="bg-white p-5 rounded-lg shadow hover:shadow-md transition">
                <h2 className="text-xl font-semibold text-blue-700">{job.title}</h2>
                <p className="text-gray-600 mt-2">{job.description}</p>
                <Link href={`/jobs/${job.id}`} className="inline-block mt-3 text-sm text-blue-600 hover:underline">
                  عرض التفاصيل
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

