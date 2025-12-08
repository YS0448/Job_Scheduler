import React, { useState } from "react";
import { apiCall } from "@/services/apiCall";
import { useLoader } from "@/context/LoaderContext";
import { showToast } from "@/components/common/AlertService";
// validation
import { validateCreateJob } from "@/lib/validation/create-job";
import { trimArrayValues } from "@/lib/trimArrayValues";

export const useCreateJob = () => {

  const initialFormData = {
    jobName: "",
    priority: "medium",
    description: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const { showLoader, hideLoader } = useLoader();


  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    

    const [jobName, priority, description]=trimArrayValues(
      [ formData.jobName, 
        formData.priority, 
        formData.description
      ]
    );
    const payload = { jobName, priority, description };


    // validation
    const errors = validateCreateJob(payload);
    if (Object.keys(errors).length > 0) {
        showToast("error", Object.values(errors)[0]);
      return;
    }

    try{

        showLoader();
        apiCall("POST", "/api/jobs", payload);
        showToast("success", "Job created successfully!");
        // Reset form
        setFormData(initialFormData);
    }catch (err) {
      console.log(err);
      showToast("error", err.message || "Failed to create job");
    } finally {
      hideLoader();
    }   
    
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
  };
};
