import { useMemo, useState } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { JobSummaryCards } from "../../components/jobs/JobSummaryCards";
import { JobFilters, type JobFilterState } from "../../components/jobs/JobFilters";
import { JobTable } from "../../components/jobs/JobTable";
import { JobDetailsDrawer } from "../../components/jobs/JobDetailsDrawer";
import { useJobs } from "../../hooks/useJobs";
import type { AdminJob } from "../../types/job";

const INITIAL_FILTERS: JobFilterState = {
  search: "",
  status: "ALL",
  service: "ALL",
  area: "ALL",
};

export function JobsPage() {
  const { jobs, counts } = useJobs();
  const [filters, setFilters] = useState<JobFilterState>(INITIAL_FILTERS);
  const [selectedJob, setSelectedJob] = useState<AdminJob | null>(null);

  const filteredJobs = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesSearch =
        query.length === 0 ||
        job.id.toLowerCase().includes(query) ||
        job.serviceName.toLowerCase().includes(query) ||
        job.approximateArea.toLowerCase().includes(query) ||
        (job.assignedTechnicianName?.toLowerCase().includes(query) ?? false);

      const matchesStatus = filters.status === "ALL" || job.status === filters.status;
      const matchesService = filters.service === "ALL" || job.serviceName === filters.service;
      const matchesArea = filters.area === "ALL" || job.approximateArea === filters.area;

      return matchesSearch && matchesStatus && matchesService && matchesArea;
    });
  }, [jobs, filters]);

  return (
    <div>
      <PageHeader
        title="Jobs"
        subtitle="Monitor service requests across the KaamSetu marketplace."
      />

      <JobSummaryCards counts={counts} />

      <JobFilters jobs={jobs} filters={filters} onChange={setFilters} />

      <JobTable jobs={filteredJobs} onView={setSelectedJob} />

      <JobDetailsDrawer job={selectedJob} onClose={() => setSelectedJob(null)} />
    </div>
  );
}
