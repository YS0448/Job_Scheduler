import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useDashboard } from "./useDashboard";
import { formatDateTime } from "@/lib/formatDate";
import empty_box from "@/assets/media/image/other/empty-box.png";

const styles = {
  table: "w-full",
  th: "py-2 text-left border-b border-gray-300 px-2",
  td: "py-3 border-b border-gray-200 whitespace-nowrap px-2 ",
  tbody_tr: "hover:bg-gray-100 cursor-pointer",
  emptyRow: "py-6 text-center text-gray-500",
  statusBase: "px-3 py-1 text-xs rounded-full",
  statusCompleted: "bg-green-100 text-green-700",
  statusPending: "bg-yellow-100 text-yellow-700",
};

const RecentAddedJob = () => {
  const { recentJobs } = useDashboard();
  const navigate = useNavigate();

  return (
    <Card className="rounded-2xl shadow">
      <CardHeader>
        <CardTitle>Recently Added Jobs</CardTitle>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        {recentJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10">
            <img
              src={empty_box}
              alt="Empty"
              className="w-20 h-20 object-contain mb-2"
            />
            <span className="text-gray-500">No jobs found</span>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Job ID</th>
                <th className={styles.th}>Job Name</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Created At</th>
              </tr>
            </thead>
            <tbody>
              {recentJobs.map((job) => (
                <tr
                  key={job.job_id}
                  className={styles.tbody_tr}
                  onClick={() => navigate(`/view-job/${job.job_id}`)}
                >
                  <td className={styles.td}>{job.job_id}</td>
                  <td className={styles.td}>{job.job_name}</td>
                  <td className={styles.td}>
                    <span
                      className={`${styles.statusBase} ${
                        job.status === "Completed"
                          ? styles.statusCompleted
                          : styles.statusPending
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className={`${styles.td} text-sm text-muted-foreground`}>
                    {formatDateTime(job.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>

      <CardFooter className="flex justify-end">
        <Link to="/view-jobs" className="text-blue-600 hover:underline">
          View All Jobs
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RecentAddedJob;
