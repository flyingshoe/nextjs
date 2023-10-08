import { useEffect, useState } from "react";
import jobData from "../../constants/jobData";

const { param: baseParam, options: baseData } = jobData;

export const jobLsKey = "mcfQuery";

export default function useUserJobs() {
  const [jobQuery, setJobQuery] = useState(() => {
    // If existing key exists in local storage, return it
    if (typeof window !== "undefined" && jobLsKey in localStorage) {
      return JSON.parse(localStorage.getItem(jobLsKey));
    }
    // No existing key, return default data instead
    return jobData;
  });

  useEffect(() => {
    // Save to Local Storage
    localStorage.setItem(jobLsKey, JSON.stringify(jobQuery));
  }, [jobQuery]);

  const setLastSeen = (lastSeen) => {
    localStorage.setItem(jobLsKey, JSON.stringify({ ...jobQuery, lastSeen }));
  };

  return { jobQuery, setJobQuery, baseParam, baseData, setLastSeen };
}
