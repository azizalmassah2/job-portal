'use client';

import { useState } from 'react';
import { User, FileText, Search, Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';

// نموذج بيانات المستخدم الأولية
const initialUser = {
  name: 'محمد أحمد',
  email: 'mohamed@example.com',
  phone: '+967 712345678',
  bio: 'مهندس برمجيات بخبرة 5 سنوات في تطوير الويب وتطبيقات الموبايل.',
  resume: '', // رابط ملف السيرة الذاتية أو نصها
};

const ProfilePage = () => {
  const [user, setUser] = useState(initialUser);
  const [resumeText, setResumeText] = useState(user.resume);
  const [isEditingResume, setIsEditingResume] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [jobResults, setJobResults] = useState<string[] | null>(null);

  // دالة وهمية تحاكي توليد السيرة الذاتية باستخدام الذكاء الاصطناعي
  const generateResumeWithAI = async () => {
    setAiLoading(true);
    // هنا يمكن ربط API خارجي مثل OpenAI لتوليد النص
    await new Promise((r) => setTimeout(r, 2000));
    const generatedResume = `
مهندس برمجيات متخصص في تطوير تطبيقات الويب والهاتف المحمول باستخدام React، Node.js، و Flutter. 
خبرة 5 سنوات في بناء حلول مبتكرة وتحسين أداء الأنظمة.
    `.trim();
    setResumeText(generatedResume);
    setUser((prev) => ({ ...prev, resume: generatedResume }));
    setIsEditingResume(false);
    setAiLoading(false);
  };

  // دالة وهمية تحاكي البحث عن وظائف مناسبة بناءً على السيرة الذاتية
  const searchJobsByResume = async () => {
    if (!resumeText.trim()) {
      alert('يرجى إنشاء أو إدخال السيرة الذاتية أولاً');
      return;
    }
    setAiLoading(true);
    // محاكاة استعلام API بحث عن وظائف
    await new Promise((r) => setTimeout(r, 1500));
    setJobResults([
      'مهندس برمجيات في شركة التقنية الحديثة',
      'مطور تطبيقات موبايل في شركة البرمجة العربية',
      'محلل نظم في شركة المستقبل الرقمية',
    ]);
    setAiLoading(false);
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8 dark:text-white">
      <h1 className="text-3xl font-bold flex items-center gap-3">
        <User size={30} className="text-blue-600" />
        ملفي الشخصي
      </h1>

      {/* بيانات المستخدم الأساسية */}
      <section className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4">معلوماتي</h2>
        <p><strong>الاسم:</strong> {user.name}</p>
        <p><strong>البريد الإلكتروني:</strong> {user.email}</p>
        <p><strong>رقم الهاتف:</strong> {user.phone}</p>
        <p className="mt-3">{user.bio}</p>
      </section>

      {/* السيرة الذاتية */}
      <section className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FileText size={24} /> السيرة الذاتية
        </h2>

        {isEditingResume ? (
          <textarea
            className="w-full h-40 p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="اكتب سيرتك الذاتية هنا..."
          />
        ) : (
          <pre className="whitespace-pre-wrap bg-white dark:bg-gray-900 p-4 rounded-md min-h-[160px] text-gray-800 dark:text-gray-200">
            {resumeText || 'لم يتم إضافة سيرة ذاتية بعد.'}
          </pre>
        )}

        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={() => setIsEditingResume(!isEditingResume)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            <Edit3 size={18} />
            {isEditingResume ? 'حفظ' : 'تعديل السيرة الذاتية'}
          </button>

          <button
            onClick={generateResumeWithAI}
            disabled={aiLoading}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50"
          >
            {aiLoading ? 'جارٍ الإنشاء...' : 'إنشاء سيرة ذاتية بالذكاء الاصطناعي'}
          </button>
        </div>
      </section>

      {/* البحث عن الوظائف بناء على السيرة الذاتية */}
      <section className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Search size={24} /> البحث عن وظائف مناسبة
        </h2>

        <button
          onClick={searchJobsByResume}
          disabled={aiLoading}
          className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition disabled:opacity-50"
        >
          {aiLoading ? 'جارٍ البحث...' : 'ابحث عن وظائف'}
        </button>

        {/* عرض نتائج البحث */}
        {jobResults && (
          <motion.ul
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 space-y-3"
          >
            {jobResults.map((job, idx) => (
              <li
                key={idx}
                className="bg-white dark:bg-gray-900 p-4 rounded-md shadow-sm border border-gray-300 dark:border-gray-700"
              >
                {job}
              </li>
            ))}
          </motion.ul>
        )}
      </section>
    </main>
  );
};

export default ProfilePage;
