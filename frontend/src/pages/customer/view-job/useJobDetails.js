import { apiCall } from "@/services/apiCall";
import { useLoader } from "@/context/LoaderContext";
import { showToast } from "@/components/common/AlertService";
import React,{ useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export const useJobDetails = () => {
  const { showLoader, hideLoader } = useLoader();
  const [job, setJob] = useState(null);
  const fetchJobById = async (id) => {
    if(!id) return;

    try {
      showLoader();
      const res = await apiCall("GET", `/api/job/${id}`);
      setJob(res.data.data[0]);
    }catch (err) {
      console.log("Error",err);
      showToast("error", err.message || "Failed to fetch job details");
    } 
    finally {
      hideLoader();
    }
  };


  return { fetchJobById, job, setJob };
};



