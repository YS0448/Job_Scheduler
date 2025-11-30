import React, { useState, useEffect, use } from "react";
import { apiCall } from "@/services/apiCall";
import { showToast } from "@/components/common/AlertService";
import { useLoader } from "@/context/LoaderContext";
export const useDashboard = () => {
  const { showLoader, hideLoader } = useLoader();

  const initialData = {
    totalJobs: 0,
    pendingJobs: 0,
    completedJobs: 0,
    recentJobs: [],
  };
  const [dashboardData, setDashboardData] = useState(initialData);

  const fetchDashboardData = async () => {
    try {
      showLoader();
      const response = await apiCall("GET", "/api/dashboard/customer");

      if (response.data) {
        const { summary, recentJobs } = response.data.data;
        setDashboardData({
          totalJobs: summary.total_jobs ?? 0,
          pendingJobs: summary.pending_jobs ?? 0,
          completedJobs: summary.completed_jobs ?? 0,
          recentJobs,
        });
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      showToast("error",  err.message || "Failed to fetch dashboard data.");
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    totalJobs: dashboardData.totalJobs,
    pendingJobs: dashboardData.pendingJobs,
    completedJobs: dashboardData.completedJobs,
    recentJobs: dashboardData.recentJobs,
    fetchDashboardData,
  };
};
