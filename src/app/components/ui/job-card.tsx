// app/components/ui/job-card.tsx
export function JobCard({ job }: { job: { id: number; title: string; company: string; location: string } }) {
    return (
      <div className="border p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
        <h2 className="text-xl font-semibold">{job.title}</h2>
        <p className="text-gray-600">الشركة: {job.company}</p>
        <p className="text-gray-500">الموقع: {job.location}</p>
        <a href={`/jobs/${job.id}`} className="text-blue-500 mt-4 block">تفاصيل الوظيفة</a>
      </div>
    );
  }
  