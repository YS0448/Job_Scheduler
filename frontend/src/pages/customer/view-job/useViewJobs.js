import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { apiCall } from "@/services/apiCall";
import { useLoader } from "@/context/LoaderContext";
import { showToast } from "@/components/common/AlertService";
import { useSocketEvent } from "@/hooks/useSocketEvent";
export const useViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const { showLoader, hideLoader } = useLoader();

  const [page, setPage] = useState(1);

  const [searchParams] = useSearchParams();
  const initialStatus = searchParams.get("status") || "";
  const [status, setStatus] = useState(initialStatus);
  
  const initialPriority = searchParams.get("priority") || "";
  const [priority, setPriority] = useState(initialPriority);
  const limit = 5;

  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchJobs = async () => {
    try {
      showLoader();

      let url = `/api/jobs?page=${page}&limit=${limit}`;
      if (status !== "") url += `&status=${status}`;
      if (priority !== "") url += `&priority=${priority}`;

      const response = await apiCall("GET", url);

      setJobs(response.data.data);
      setTotalPages(response.data.totalPages);
      setTotalRecords(response.data.totalRecords);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      hideLoader();
    }
  };

  const handleRunJob = async (jobId) => {
    try {
      showLoader();

      await apiCall("POST", `/api/run-job/${jobId}`);
      showToast("success", "Job run successfully!");
    } catch (err) {
      console.error("Failed to run job", err);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page, status, priority]);

  // socket events
  useSocketEvent("runJob:updated", (updatedJob) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.job_id === updatedJob.job_id
          ? { ...job, status: updatedJob.status }
          : job
      )
    );
  });

  return {
    jobs,
    page,
    setPage,
    totalPages,
    totalRecords,
    status,
    setStatus,
    priority,
    setPriority,
    handleRunJob,
  };
};
