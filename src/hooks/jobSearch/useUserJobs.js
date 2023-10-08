import { useEffect, useState } from "react";
import jobData from "../../constants/jobData";

const { param: baseParam, options: baseData } = jobData;

const lsKey = "mcfQuery";

export default function useUserJobs() {
  const [jobQuery, setJobQuery] = useState(() => {
    // If existing key exists in local storage, return it
    if (typeof window !== "undefined" && lsKey in localStorage) {
      return JSON.parse(localStorage.getItem(lsKey));
    }
    // No existing key, return default data instead
    return jobData;
  });

  useEffect(() => {
    // Save to Local Storage
    localStorage.setItem(lsKey, JSON.stringify(jobQuery));
  }, [jobQuery]);

  const setLastSeen = (lastSeen) => {
    localStorage.setItem(lsKey, JSON.stringify({ ...jobQuery, lastSeen }));
  };

  return { jobQuery, setJobQuery, baseParam, baseData, setLastSeen };
}
