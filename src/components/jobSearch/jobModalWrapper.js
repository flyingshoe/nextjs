"use client";

import { Edit, Refresh } from "@mui/icons-material";
import FabWrapper from "../FabWrapper";
import JobModal from "./jobModal";
import { useRef } from "react";

export default function JobModalWrapper({ callback, jobQuery, setJobQuery }) {
  const modalRef = useRef(null);

  return (
    <>
      <FabWrapper>
        <Edit onClick={() => modalRef.current.handleOpen()} />
        <Refresh onClick={callback} />
      </FabWrapper>
      <JobModal ref={modalRef} jobQuery={jobQuery} setJobQuery={setJobQuery} />
    </>
  );
}
