// src/app/JobSeekerDashboard/profile/page.tsx
'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  resumeUrl?: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    // جلب بيانات المستخدم (مثال، عدل حسب طريقة جلب بياناتك)
    const fetchUser = async () => {
      try {
        const res = await axios.get('/api/user/me'); // عدل API حسب مشروعك
        setUser(res.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
    fetchUser();
  }, []);

  // رفع ملف السيرة الذاتية
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setResumeFile(e.target.files[0]);
    }
  };

  const uploadResume = async () => {
    if (!resumeFile) return;
    try {
      const formData = new FormData();
      formData.append('resume', resumeFile);
      const res = await axios.post('/api/user/upload-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUser((prev) => prev ? { ...prev, resumeUrl: res.data.resumeUrl } : null);
      alert('تم رفع السيرة الذاتية بنجاح');
    } catch (error) {
      alert('حدث خطأ أثناء رفع السيرة الذاتية');
      console.error(error);
    }
  };

  // توليد سيرة ذاتية باستخدام AI
  const generateResumeAI = async () => {
    setGenerating(true);
    try {
      const res = await axios.post('/api/generate-resume', {
        userId: user?.id,
      });
      setUser((prev) => prev ? { ...prev, resumeUrl: res.data.resumeUrl } : null);
      alert('تم إنشاء السيرة الذاتية بنجاح');
    } catch (error) {
      alert('حدث خطأ أثناء إنشاء السيرة الذاتية');
      console.error(error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">ملفي الشخصي</h1>
      {user ? (
        <>
          <p><strong>الاسم:</strong> {user.name}</p>
          <p><strong>البريد الإلكتروني:</strong> {user.email}</p>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">السيرة الذاتية</h2>

            {user.resumeUrl ? (
              <a
                href={user.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                عرض السيرة الذاتية
              </a>
            ) : (
              <p>لم يتم رفع سيرة ذاتية بعد.</p>
            )}

            <div className="mt-4 flex gap-2 items-center">
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
              <button
                onClick={uploadResume}
                disabled={!resumeFile}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                رفع السيرة الذاتية
              </button>
            </div>

            <div className="mt-6">
              <button
                onClick={generateResumeAI}
                disabled={generating}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                {generating ? 'جارٍ الإنشاء...' : 'إنشاء سيرة ذاتية باستخدام الذكاء الاصطناعي'}
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>جارٍ تحميل البيانات...</p>
      )}
    </div>
  );
};

export default ProfilePage;
