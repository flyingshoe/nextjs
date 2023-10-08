"use client";
import { Box, Container } from "@mui/material";
import JobCard from "../../components/jobSearch/jobCard";
import { JobData } from "@/types/jobSearch";
import { endpoints } from "@/constants/endpoints";
import JobModalWrapper from "@/components/jobSearch/jobModalWrapper";
import useUserJobs, { jobLsKey } from "@/hooks/jobSearch/useUserJobs";
import { useEffect, useState } from "react";
import JobCardSkeleton from "@/components/jobSearch/jobCardSkeleton";
import { isToday, parse } from "date-fns";

const { MCF_BASE_URL } = endpoints;

export default function JobSearch() {
  const { jobQuery, setJobQuery, baseParam, baseData, setLastSeen } =
    useUserJobs();
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
      const uniqueIds: string[] = [];
      allData = allData.filter((data) => {
        if (uniqueIds.includes(data.uuid)) {
          return false;
        }
        uniqueIds.push(data.uuid);
        return true;
      });

      // Add a unix timestamp to make it easier to sort
      allData = allData.map((data) => ({
        ...data,
        unix: Date.parse(data.metadata.newPostingDate),
      }));

      // Sort according to Unix timestamp
      allData.sort((a, b) => b.unix - a.unix);

      // Set box shadow
      // First check if there is a lastSeen post stored in localstorage
      // AND there is the same lastSeen post in the job listing (allData)
      // If so set the box shadow for every post UNTIL the last seen post

      const lastSeen = JSON.parse(window.localStorage[jobLsKey])?.lastSeen; // Check local storage instead of jobQuery as setting lastSeen does not trigger setJobQuery in order to prevent refetching
      const lastSeenIdx = allData.findIndex((post) => post.uuid === lastSeen);
      if (lastSeen && lastSeenIdx !== -1) {
        allData = allData.map((post, idx) => ({
          ...post,
          showShadow: idx < lastSeenIdx,
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

      // Save to localstorage: UUID of first post as the lastSeen post
      setLastSeen(allData[0].uuid);

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
