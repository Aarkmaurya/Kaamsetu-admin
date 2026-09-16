import { useSyncExternalStore } from "react";
import { jobRepository } from "../data/repositories/jobRepository";

export function useJobs() {
  const jobs = useSyncExternalStore(jobRepository.subscribe, jobRepository.getSnapshot);

  return {
    jobs,
    counts: jobRepository.getCounts(),
  };
}
