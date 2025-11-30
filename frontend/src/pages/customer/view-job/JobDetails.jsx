import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDateTime } from "@/lib/formatDate";
import empty_box from "@/assets/media/image/other/empty-box.png";
import { useJobDetails } from "./useJobDetails";

// Tailwind Styles Object
const styles = {
  wrapper: "min-h-screen flex flex-col items-center bg-gray-50 md:p-6",
  backBtn:
    "self-start mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition cursor-pointer",
  card: "w-full bg-white rounded-xl shadow-lg p-6 space-y-4",
  headerRow: "flex justify-between items-center border-b",
  title: "text-2xl font-bold text-gray-800 pb-2",
  badge: "text-base font-semibold",
  label: "font-semibold text-gray-700",
  text: "text-gray-900",
  descriptionBox: "bg-gray-100 rounded p-3 text-gray-900 my-1",
};

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchJobById(id);
  }, [id]);

  const { fetchJobById, job } = useJobDetails();

  // {/* <img src={empty_box} alt="No Job Found" className="w-48 mx-auto" /> */}
  return (
    <div className={styles.wrapper}>
      <button onClick={() => navigate(-1)} className={styles.backBtn}>
        ← Back
      </button>

      {!job ? (
        <div className={styles.card}>
          <img src={empty_box} alt="" className="mx-auto w-48"/>
          <p className="text-center text-gray-500">No Job Found</p>
        </div>
      ) : (
        <div className={styles.card}>
          <div className={styles.headerRow}>
            <h2 className={styles.title}>Job Details</h2>
            <p className={styles.badge}>Job ID: {job.job_id}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className={styles.label}>Job Name:</p>
              <p className={styles.text}>{job.job_name}</p>
            </div>

            <div>
              <p className={styles.label}>Priority:</p>
              <p className={styles.text}>{job.priority}</p>
            </div>

            <div>
              <p className={styles.label}>Status:</p>
              <p className={styles.text}>{job.status}</p>
            </div>

            <div>
              <p className={styles.label}>Created At:</p>
              <p className={styles.text}>{formatDateTime(job.created_at)}</p>
            </div>

            <div>
              <p className={styles.label}>Completed At:</p>
              <p className={styles.text}>
                {job.completed_at
                  ? formatDateTime(job.completed_at)
                  : "Not Completed"}
              </p>
            </div>
          </div>

          <div>
            <p className={styles.label}>Description:</p>
            <p className={styles.descriptionBox}>
              {job.description || "No description provided"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
