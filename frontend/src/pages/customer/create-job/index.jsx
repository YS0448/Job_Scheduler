import React from "react";
import { useCreateJob } from "./useCreateJob";
import CreateJobForm  from "./CreateJobForm";

const CreateJob = () => {
  const { formData, setFormData, handleChange, handleSubmit } = useCreateJob();

  return (
    <div className="flex justify-center items-start p-6 w-full">
      <CreateJobForm
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateJob;
