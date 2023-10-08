"use client";

import { Edit, Refresh } from "@mui/icons-material";
import FabWrapper from "../FabWrapper";
import JobModal from "./jobModal";
import { useRef } from "react";

export default function JobModalWrapper({ fetchJobs, jobQuery, setJobQuery }) {
  const modalRef = useRef(null);

  return (
    <>
      <FabWrapper>
        <Edit onClick={() => modalRef.current.handleOpen()} />
        <Refresh onClick={fetchJobs} />
      </FabWrapper>
      <JobModal ref={modalRef} jobQuery={jobQuery} setJobQuery={setJobQuery} />
    </>
  );
}
