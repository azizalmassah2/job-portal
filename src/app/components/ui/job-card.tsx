"use client";
type Job = {
  id: number;
  title: string;
  description: string;
  company: {
    name: string;
    logo: string;
    location: string;
  };
  type: string;
  salaryRange: [number, number];
};

export default function JobCard({ job }: { job: Job }) {
  const sanitizeHTML = (html: string) => {
    return html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };

  return (
    <article
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 h-full"
      aria-labelledby={`job-${job.id}-title`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 
            id={`job-${job.id}-title`}
            className="text-xl font-semibold text-gray-800"
          >
            {job.title}
          </h2>
          <p className="text-gray-600 mt-1">{job.company.name}</p>
        </div>
        <img 
          src={job.company.logo} 
          alt={`شعار ${job.company.name}`}
          className="h-12 w-12 object-contain rounded" 
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          {job.type}
        </span>
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
          {job.company.location}
        </span>
      </div>

      <div 
        className="prose prose-sm text-gray-600 mb-4"
        dangerouslySetInnerHTML={{ __html: sanitizeHTML(job.description) }}
      />

      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-medium text-gray-900">
          ${job.salaryRange[0].toLocaleString()} - $
          {job.salaryRange[1].toLocaleString()}
        </span>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => window.open(`/jobs/${job.id}`, "_blank")}
        >
          عرض التفاصيل
        </button>
      </div>
    </article>
  );
}
