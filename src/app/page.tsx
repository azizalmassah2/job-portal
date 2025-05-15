"use client";
import { useState, useMemo } from "react";
import useSWR from "swr";
import Fuse from "fuse.js";
import { useDebounce } from "use-debounce";
import { useInView } from "react-intersection-observer";
import JobCard from "./components/ui/job-card";
import { SearchBar } from "./components/ui/search-bar";

enum JobType {
  FULL_TIME = "دوام كامل",
  PART_TIME = "دوام جزئي",
  REMOTE = "عن بُعد",
  HYBRID = "هجين",
}

interface Company {
  name: string;
  logo: string;
  location: string;
}

interface Job {
  id: string;
  title: string;
  company: Company;
  salaryRange: [number, number];
  description: string;
  requirements: string[];
  type: JobType;
  postedAt: string;
  expiresAt?: string;
}

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      "X-API-Key": process.env.NEXT_PUBLIC_API_KEY!,
    },
  }).then((res) => res.json());

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery] = useDebounce(searchQuery, 300);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();

  const { data: jobs = [], isLoading, error } = useSWR<Job[]>(
    `/api/jobs?page=${page}`,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  const fuse = useMemo(
    () =>
      new Fuse(jobs, {
        keys: ["title", "description", "company.name", "requirements"],
        threshold: 0.3,
        includeMatches: true,
      }),
    [jobs]
  );

  const filteredJobs = useMemo(() => {
    if (!debouncedQuery.trim()) return jobs;
    return fuse.search(debouncedQuery).map((result) => result.item);
  }, [debouncedQuery, jobs, fuse]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };
  return (
    <main className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <SearchBar
          onSearch={handleSearch}
          aria-label="ابحث عن الوظائف"
          className="mb-8"
        />

        {isLoading && <LoadingSkeleton />}

        {error && (
          <div className="text-red-500 text-center mt-8">
            حدث خطأ في تحميل البيانات
          </div>
        )}

        {!isLoading && !error && filteredJobs.length === 0 && (
          <EmptyState message="لا توجد نتائج مطابقة" />
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job, index) => (
            <div
              key={job.id}
              ref={index === filteredJobs.length - 1 ? ref : null}
            >
              <JobCard job={{...job, id: parseInt(job.id)}} />
            </div>
          ))}
        </div>
        {!isLoading && filteredJobs.length > 0 && (
          <div className="mt-8 text-center text-gray-500">
            {inView && "جاري تحميل المزيد..."}
          </div>
        )}
      </div>
    </main>
  );
}
const LoadingSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="h-32 bg-gray-200 rounded-lg"
        role="status"
        aria-label="جاري التحميل"
      />
    ))}
  </div>
);

const EmptyState = ({ message }: { message: string }) => (
  <div className="text-center py-12">
    <div className="text-gray-500 text-lg mb-4">{message}</div>
    <svg
      className="mx-auto h-24 w-24 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </div>
);

