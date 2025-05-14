'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Home,
  Briefcase,
  Building2,
  Newspaper,
  Phone,
  LogIn,
  UserPlus,
  Moon
} from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.dir = 'rtl';
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-gray-900 fixed top-0 right-0 left-0 w-full z-50 shadow border-b border-gray-200 dark:border-gray-700 font-[Tajawal]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between">
        
        {/* يمين: روابط التنقل */}
        <div className="hidden lg:flex space-x-reverse space-x-6 rtl:space-x-reverse text-gray-800 dark:text-gray-100">
          <Link href="/" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400"><Home size={18}/> الرئيسية</Link>
          <Link href="/jobs" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400"><Briefcase size={18}/> الوظائف</Link>
          <Link href="/companies" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400"><Building2 size={18}/> الشركات</Link>
          <Link href="/blog" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400"><Newspaper size={18}/> المدونة</Link>
          <Link href="/contact" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400"><Phone size={18}/> اتصل بنا</Link>
        </div>

        {/* الوسط: الشعار */}
        <Link href="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2 mx-auto">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M3 3h18v18H3V3z" stroke="currentColor" strokeWidth="2" />
            <path d="M9 3v18" stroke="currentColor" strokeWidth="2" />
            <path d="M15 3v18" stroke="currentColor" strokeWidth="2" />
          </svg>
          منصة التوظيف
        </Link>

        {/* يسار: الإجراءات */}
        <div className="flex items-center space-x-reverse space-x-4">
          <Link href="/login" className="flex items-center gap-1 text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">
            <LogIn size={18}/> تسجيل الدخول
          </Link>
          <Link href="/register" className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            <UserPlus size={18}/> أنشئ حساب
          </Link>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="border border-gray-400 dark:border-gray-300 px-2 py-1 rounded text-sm text-gray-700 dark:text-gray-200"
          >
            <Moon size={16} />
          </button>
          {/* زر الجوال */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-2xl">
            ☰
          </button>
        </div>
      </div>

      {/* القائمة على الجوال */}
      {menuOpen && (
        <div className="lg:hidden flex flex-col text-right px-4 pb-4 space-y-4 text-gray-800 dark:text-gray-100">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400"><Home size={18}/> الرئيسية</Link>
          <Link href="/jobs" className="hover:text-blue-600 dark:hover:text-blue-400"><Briefcase size={18}/> الوظائف</Link>
          <Link href="/companies" className="hover:text-blue-600 dark:hover:text-blue-400"><Building2 size={18}/> الشركات</Link>
          <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400"><Newspaper size={18}/> المدونة</Link>
          <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400"><Phone size={18}/> اتصل بنا</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
