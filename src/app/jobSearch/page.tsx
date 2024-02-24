"use client";
import { Box, Container } from "@mui/material";
import JobCard from "../../components/jobSearch/jobCard";
import { JobData } from "@/types/jobSearch";
import { endpoints } from "@/constants/endpoints";
import JobModalWrapper from "@/components/jobSearch/jobModalWrapper";
import useUserJobs, { jobLsKey } from "@/hooks/jobSearch/useUserJobs";
import { useEffect, useState } from "react";
import JobCardSkeleton from "@/components/jobSearch/jobCardSkeleton";
import { differenceInDays, isBefore, isToday, parse, parseISO } from "date-fns";

const { MCF_BASE_URL } = endpoints;

export default function JobSearch() {
  const {
    jobQuery,
    setJobQuery,
    baseParam,
    baseData,
    setLastSeen,
    setSeenToday,
    setSeenDate,
    clearSeenToday,
  } = useUserJobs();
  const [data, setData] = useState<JobData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getJobs();
  }, [jobQuery]);

  const getJobs = async () => {
    try {
      setLoading(true);
      const allRes = await Promise.allSettled(
        jobQuery.data.map(({ search }: any) =>
          fetch(
            `${MCF_BASE_URL}?limit=${baseParam.limit}&page=${baseParam.page}`,
            {
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                ...baseData,
                search,
                salary: jobQuery.salary,
              }),
              method: "POST",
              next: { tags: ["jobList"] },
            }
          )
        )
      );

      let allData: JobData[] = [];
      for (const res of allRes) {
        if (res.status === "fulfilled") {
          const jsonData = await res.value.json();
          allData = [...allData, ...jsonData.results];
        }
      }

      // Filter out duplicates
      let uniqueIds: string[] = [];
      allData = allData.filter((data) => {
        if (uniqueIds.includes(data.uuid)) {
          return false;
        }
        uniqueIds.push(data.uuid);
        return true;
      });

      // Add a unix timestamp for easier sorting
      allData = allData.map((data) => ({
        ...data,
        unix: Date.parse(data.metadata.newPostingDate),
      }));

      // Sort according to Unix timestamp
      allData.sort((a, b) => b.unix - a.unix);

      // Additional level of sorting to sort jobs posted today
      // Background info - MCF api only sorts by date and not by time,
      // thus within the same day, some new job posts may be hidden in some "seen" posts
      // To fix this, we find all those NOT seen today and place them above the lastSeen marker
      const lastSeenId = JSON.parse(window.localStorage[jobLsKey])?.lastSeen; // Check local storage instead of jobQuery as setting lastSeen does not trigger setJobQuery in order to prevent refetching
      let lastSeenIdx = allData.findIndex((post) => post.uuid === lastSeenId);
      const lastSeenPost = allData.find((post) => post.uuid === lastSeenId);

      // Loop through today's posts and check if it exists in "seenToday" key in localstorage
      const postsToday = allData.filter((post) =>
        isToday(parse(post.metadata.newPostingDate, "yyyy-MM-dd", new Date()))
      );

      // check if seenDate is before today, if so clear seenToday and set newDate
      const seenDate = parseISO(
        JSON.parse(window.localStorage.getItem(jobLsKey) || "{}")?.seenDate
      );

      if (!isToday(seenDate) && isBefore(seenDate, new Date())) {
        clearSeenToday();
        setSeenDate(new Date());
      } else if (
        !JSON.parse(
          window.localStorage.getItem(jobLsKey) || "{}"
        ).hasOwnProperty("seenDate")
      ) {
        setSeenDate(new Date());
      }

      const tempAllData = [...allData];
      postsToday.forEach((post, idx) => {
        // Those seen posts before lastSeen, move it to AFTER the last seen post
        if (
          idx < lastSeenIdx &&
          isToday(
            parse(
              lastSeenPost?.metadata.newPostingDate,
              "yyyy-MM-dd",
              new Date()
            )
          ) &&
          JSON.parse(
            window.localStorage.getItem(jobLsKey) || "{}"
          )?.seenToday?.hasOwnProperty(post.uuid)
        ) {
          // Move to AFTER last seen
          // Step 1 - make a copy of the element
          const tempJob = { ...post };

          // Step 2 - Remove the element
          const rmIdx = allData.findIndex((x) => x.uuid === tempJob.uuid);
          tempAllData.splice(rmIdx, 1);

          // Step 3 - Insert copy after lastSeen
          tempAllData.splice(lastSeenIdx + 1, 0, tempJob);
        }

        // Those UNSEEN posts AFTER lastSeen, move it in front
        else if (
          idx > lastSeenIdx &&
          isToday(
            parse(
              lastSeenPost?.metadata.newPostingDate,
              "yyyy-MM-dd",
              new Date()
            )
          ) &&
          !JSON.parse(
            window.localStorage.getItem(jobLsKey) || "{}"
          )?.seenToday?.hasOwnProperty(post.uuid)
        ) {
          // Move to front of array
          // Step 1 - make a copy of the element
          const tempJob = { ...post };

          // Step 2 - Remove the element
          const rmIdx = allData.findIndex((x) => x.uuid === tempJob.uuid);
          tempAllData.splice(rmIdx, 1);

          // Step 3 - Insert copy in front of lastSeen
          tempAllData.splice(lastSeenIdx, 0, tempJob);

          // Step 4 - Increment the lastSeenIdx accordingly
          lastSeenIdx++;
        }

        setSeenToday(post.uuid);
      });

      allData = tempAllData;

      // Save to localstorage: UUID of first post as the lastSeen post
      setLastSeen(allData[0].uuid);

      // Set box shadow
      // First check if there is a lastSeen post stored in localstorage
      // AND there is the same lastSeen post in the job listing (allData)
      // If so set the box shadow for every post UNTIL the last seen post
      if (
        lastSeenId &&
        allData.findIndex((post) => post.uuid === lastSeenId) !== -1
      ) {
        allData = allData.map((post, idx) => ({
          ...post,
          showShadow:
            idx < allData.findIndex((post) => post.uuid === lastSeenId),
        }));
      }

      // If not, just set the box shadow for today's posts
      else {
        allData = allData.map((post) => ({
          ...post,
          showShadow: isToday(
            parse(post.metadata.newPostingDate, "yyyy-MM-dd", new Date())
          ),
        }));
      }

      // Save data
      setData(allData);
    } finally {
      setLoading(false);
    }
  };

  const RenderCards = () => {
    if (loading) {
      return <JobCardSkeleton />;
    }
    return (
      <>
        {data.map((item) => (
          <JobCard key={item.uuid} cardData={item} />
        ))}
      </>
    );
  };

  return (
    <Box className="grow bg-gray-100">
      <Container maxWidth="sm" className="flex flex-col gap-8 p-8">
        <RenderCards />
      </Container>

      <JobModalWrapper
        fetchJobs={getJobs}
        jobQuery={jobQuery}
        setJobQuery={setJobQuery}
      />
    </Box>
  );
}
