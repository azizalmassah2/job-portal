import Link from 'next/link';
import { Search, Briefcase, Building2 } from 'lucide-react';

// Navbar Component
const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          منصة التوظيف
        </Link>
        <div className="space-x-6">
          <Link href="/" className="text-gray-800 hover:text-blue-600">الرئيسية</Link>
          <Link href="/jobs" className="text-gray-800 hover:text-blue-600">الوظائف</Link>
          <Link href="/companies" className="text-gray-800 hover:text-blue-600">الشركات</Link>
          <Link href="/login" className="text-gray-800 hover:text-blue-600">تسجيل الدخول</Link>
        </div>
      </div>
    </nav>
  );
};

export default function HomePage() {
  return (
    <main className="bg-white text-gray-800 pt-24">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gray-100 py-16 px-6 md:px-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">ابحث عن وظيفتك المثالية</h1>
        <p className="text-lg text-gray-600 mb-8">منصة موثوقة للباحثين عن العمل وأصحاب العمل</p>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row justify-center gap-4 max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="المسمى الوظيفي / الكلمات المفتاحية"
            className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none"
          />
          <input
            type="text"
            placeholder="المدينة / الموقع"
            className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none"
          />
        </div>
        <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
          ابحث عن وظيفة
        </button>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 px-6 md:px-12">
        <h2 className="text-2xl font-semibold mb-8 text-center">الوظائف المميزة</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((id) => (
            <div key={id} className="bg-white shadow-md p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2">وظيفة مميزة #{id}</h3>
              <p className="text-gray-600 mb-4">تفاصيل مختصرة عن الوظيفة وموقعها.</p>
              <Link href="#" className="text-blue-600 hover:underline">عرض التفاصيل</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 py-16 px-6 md:px-12">
        <h2 className="text-2xl font-semibold mb-8 text-center">تصفح حسب القطاع</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[ 
            { title: 'تقنية المعلومات', icon: <Search /> },
            { title: 'الصحة', icon: <Briefcase /> },
            { title: 'التسويق', icon: <Building2 /> },
            { title: 'التعليم', icon: <Briefcase /> }
          ].map((cat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <div className="text-blue-600 mb-3 mx-auto w-10 h-10">{cat.icon}</div>
              <h3 className="text-lg font-semibold">{cat.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Top Hiring Companies */}
      <section className="py-16 px-6 md:px-12">
        <h2 className="text-2xl font-semibold mb-8 text-center">أفضل الشركات التي توظف الآن</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((company) => (
            <div key={company} className="bg-white shadow-md p-6 rounded-xl text-center">
              <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full mb-4"></div>
              <h3 className="font-semibold">شركة #{company}</h3>
              <p className="text-sm text-gray-500">وظائف متاحة الآن</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 py-12 px-6 md:px-12 text-center text-white">
        <h2 className="text-2xl font-semibold mb-4">هل تبحث عن موظفين؟</h2>
        <p className="mb-6">انشر وظيفتك الآن واجذب أفضل الكفاءات</p>
        <Link href="#" className="bg-white text-blue-600 px-6 py-3 rounded-full hover:bg-gray-100 transition">
          أضف وظيفة
        </Link>
      </section>
    </main>
  );
}
