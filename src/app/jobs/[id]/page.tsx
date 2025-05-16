import { notFound } from "next/navigation";

interface JobDetailsProps {
  params: {
    id: string;
  };
}

export default async function JobDetails({ params }: JobDetailsProps) {
  const job = await import("../../../lib/db").then(module => module.default.job.findUnique({
    where: { id: params.id },
    include: {
      company: true,
      skills: true,
    },
  }));

  if (!job) return notFound();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
      <p className="text-gray-600 mb-4">{job.company.name} – {job.location}</p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">الوصف:</h2>
        <p className="text-gray-800">{job.description}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">الراتب:</h2>
        <p>{job.salaryMin} - {job.salaryMax} USD</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">نوع الوظيفة:</h2>
        <p>{job.type}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">المهارات المطلوبة:</h2>
        <ul className="list-disc list-inside">
          {job.skills.map((skill) => (
            <li key={skill.id}>{skill.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
