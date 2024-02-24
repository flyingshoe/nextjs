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
    const ls = JSON.parse(window.localStorage.getItem(jobLsKey));
    // Save to Local Storage
    localStorage.setItem(jobLsKey, JSON.stringify({ ...ls, ...jobQuery }));
  }, [jobQuery]);

  // Directly setting the localstorage instead of indirectly setting it through jobQuery as that will trigger an infinite api loop
  const setLastSeen = (lastSeen) => {
    const ls = JSON.parse(window.localStorage.getItem(jobLsKey));
    localStorage.setItem(jobLsKey, JSON.stringify({ ...ls, lastSeen }));
  };

  const setSeenToday = (seenToday) => {
    const ls = JSON.parse(window.localStorage.getItem(jobLsKey));
    ls.seenToday = { ...ls.seenToday, [seenToday]: true };
    localStorage.setItem(jobLsKey, JSON.stringify(ls));
  };
  const clearSeenToday = () => {
    const ls = JSON.parse(window.localStorage.getItem(jobLsKey));
    ls.seenToday = {};
    localStorage.setItem(jobLsKey, JSON.stringify(ls));
  };

  const setSeenDate = (seenDate) => {
    const ls = JSON.parse(window.localStorage.getItem(jobLsKey));
    localStorage.setItem(jobLsKey, JSON.stringify({ ...ls, seenDate }));
  };
  
  return {
    jobQuery,
    setJobQuery,
    baseParam,
    baseData,
    setLastSeen,
    setSeenToday,
    setSeenDate,
    clearSeenToday
  };
}
