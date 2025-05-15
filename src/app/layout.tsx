// src/app/layout.tsx
import './globals.css';
import Navbar from './components/ui/Navbar'; 
import '@fontsource/tajawal/400.css';
import '@fontsource/tajawal/700.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'منصة وظائفك',
  description: 'منصة لعرض الوظائف والشركات.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="rtl-enabled">
      <body className="bg-gray-50 text-gray-900">
        {/* علق Navbar مؤقتًا للتجربة */}
        { <Navbar />}
        <main className="pt-4">{children}</main>
      </body>
    </html>
  );
}
