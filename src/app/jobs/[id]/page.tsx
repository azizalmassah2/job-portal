import { notFound } from 'next/navigation';

type Job = {
  id: number;
  title: string;
  description: string;
};

async function getJobById(id: string): Promise<Job | null> {
  const res = await fetch(`http://localhost:3000/api/jobs/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = await getJobById(params.id);

  if (!job) return notFound();

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="mt-2">{job.description}</p>
    </main>
  );
}
