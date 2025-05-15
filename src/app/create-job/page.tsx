// app/create-job/page.tsx
import prisma from '../../lib/db';
import CreateJobForm from '../components/CreateJobForm';

export default async function CreateJobPage() {
  const companies = await prisma.company.findMany();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">إنشاء وظيفة جديدة</h1>
        <CreateJobForm companies={companies} />
      </div>
    </div>
  );
}
