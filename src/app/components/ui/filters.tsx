// app/components/ui/filters.tsx
'use client';
export function Filters() {
    return (
      <div className="mb-8">
        <select className="p-4 border border-gray-300 rounded w-full">
          <option value="">اختر الفئة</option>
          <option value="it">تكنولوجيا المعلومات</option>
          <option value="marketing">التسويق</option>
          <option value="finance">المالية</option>
        </select>
      </div>
    );
  }
  