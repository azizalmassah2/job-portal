// components/CreateJobForm.tsx
"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Company } from '@prisma/client';

const jobSchema = z.object({
  title: z.string().min(5, 'العنوان يجب أن يكون على الأقل 5 أحرف'),
  description: z.string().min(100, 'الوصف يجب أن يكون على الأقل 100 حرف'),
  companyId: z.string().uuid(),
  salaryMin: z.number().min(3000, 'الحد الأدنى للراتب 3000'),
  salaryMax: z.number().min(3000, 'الحد الأقصى للراتب 3000'),
  location: z.string().min(3, 'المكان مطلوب'),
  type: z.enum(['FULL_TIME', 'PART_TIME', 'REMOTE']),
  skills: z.array(z.string()).min(1, 'اختر مهارة واحدة على الأقل')
});

export default function CreateJobForm({ companies }: { companies: Company[] }) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(jobSchema)
  });

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSkillChange = (skill: string) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(newSkills);
    setValue('skills', newSkills);
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('فشل في إنشاء الوظيفة');
      
      // إعادة التوجيه أو إظهار رسالة نجاح
      window.location.href = '/jobs';
    } catch (error) {
      console.error(error);
      alert('حدث خطأ أثناء إنشاء الوظيفة');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-6">
        {/* عنوان الوظيفة */}
        <div>
          <label className="block text-sm font-medium text-gray-700">العنوان</label>
          <input
            {...register('title')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* وصف الوظيفة */}
        <div>
          <label className="block text-sm font-medium text-gray-700">الوصف</label>
          <textarea
            {...register('description')}
            rows={5}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        {/* الشركة */}
        <div>
          <label className="block text-sm font-medium text-gray-700">الشركة</label>
          <select
            {...register('companyId')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {companies.map(company => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        {/* نطاق الراتب */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">الحد الأدنى للراتب</label>
            <input
              type="number"
              {...register('salaryMin', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.salaryMin && <p className="text-red-500 text-sm mt-1">{errors.salaryMin.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">الحد الأقصى للراتب</label>
            <input
              type="number"
              {...register('salaryMax', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.salaryMax && <p className="text-red-500 text-sm mt-1">{errors.salaryMax.message}</p>}
          </div>
        </div>

        {/* الموقع */}
        <div>
          <label className="block text-sm font-medium text-gray-700">الموقع</label>
          <input
            {...register('location')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
        </div>

        {/* نوع الوظيفة */}
        <div>
          <label className="block text-sm font-medium text-gray-700">نوع الوظيفة</label>
          <select
            {...register('type')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="FULL_TIME">دوام كامل</option>
            <option value="PART_TIME">دوام جزئي</option>
            <option value="REMOTE">عمل عن بعد</option>
          </select>
        </div>

        {/* المهارات */}
        <div>
          <label className="block text-sm font-medium text-gray-700">المهارات المطلوبة</label>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
            {['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker'].map(skill => (
              <label
                key={skill}
                className={`flex items-center p-2 rounded border cursor-pointer ${
                  selectedSkills.includes(skill) ? 'bg-blue-50 border-blue-500' : 'border-gray-200'
                }`}
              >
                <input
                  type="checkbox"
                  value={skill}
                  checked={selectedSkills.includes(skill)}
                  onChange={() => handleSkillChange(skill)}
                  className="hidden"
                />
                <span className="ml-2 text-sm">{skill}</span>
              </label>
            ))}
          </div>
          {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills.message}</p>}
        </div>

        {/* زر الإرسال */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isSubmitting ? 'جاري الإنشاء...' : 'إنشاء الوظيفة'}
          </button>
        </div>
      </div>
    </form>
  );
}