'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Home, Briefcase, Building2, Phone, LogIn, Menu, Moon, Sun, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // التحميل الأولي من localStorage
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // حفظ التفضيل في localStorage
    localStorage.setItem('darkMode', darkMode.toString());
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const navLinks = [
    { href: '/', label: 'الرئيسية', icon: <Home size={18} /> },
    { href: '/jobs', label: 'الوظائف', icon: <Briefcase size={18} /> },
    { href: '/companies', label: 'الشركات', icon: <Building2 size={18} /> },
    { href: '/contact', label: 'اتصل بنا', icon: <Phone size={18} /> },
  ];

  return (
    <motion.nav
      ref={navRef}
      initial="hidden"
      animate="visible"
      variants={navVariants}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 w-full z-50 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? 'bg-white/90 dark:bg-gray-900/90 shadow-sm' : 'bg-transparent'
      }`}
      style={{
        borderBottom: `1px solid ${darkMode ? 'rgba(55, 65, 81, 0.2)' : 'rgba(209, 213, 219, 0.2)'}`,
        height: '64px'
      }}
      role="navigation"
      aria-label="القائمة الرئيسية"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full relative">

          {/* قائمة الجوال */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* القائمة الرئيسية لسطح المكتب */}
          <ul className="hidden lg:flex items-center h-full space-x-6 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <motion.li
                key={link.href}
                whileHover={{ scale: 1.05 }}
                className="relative h-full flex items-center"
              >
                <Link
                  href={link.href}
                  className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  role="menuitem"
                >
                  {link.icon}
                  <span className="mr-2 font-medium">{link.label}</span>
                </Link>
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 dark:bg-blue-400"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.li>
            ))}
          </ul>

          {/* الشعار المركزي */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
            >
              <AnimatedLogo className="w-48 md:w-64" />
            </motion.div>
          </div>

          {/* عناصر التحكم */}
          <div className="flex items-center gap-4 rtl:gap-reverse">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={`تبديل إلى الوضع ${darkMode ? 'النهاري' : 'الليلي'}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link
              href="/login"
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-all"
            >
              <LogIn size={18} />
              <span className="font-medium">تسجيل الدخول</span>
            </Link>
          </div>
        </div>
      </div>

      {/* قائمة الجوال المنسدلة */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-white dark:bg-gray-800 shadow-lg"
            id="mobile-menu"
            role="menu"
          >
            <ul className="p-4 space-y-3">
              {navLinks.map((link) => (
                <motion.li
                  key={link.href}
                  whileHover={{ scale: 1.02 }}
                  className="border-b dark:border-gray-700 last:border-0"
                >
                  <Link
                    href={link.href}
                    className="flex items-center p-2 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                    onClick={() => setMenuOpen(false)}
                    role="menuitem"
                  >
                    {link.icon}
                    <span className="mr-2">{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );

};

export default Navbar;
