import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ClipboardList, CheckCircle2, Clock } from "lucide-react";
import { useDashboard } from "./useDashboard";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
    const { totalJobs, completedJobs, pendingJobs, fetchDashboardData } = useDashboard();
    const navigate = useNavigate();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="rounded-2xl shadow">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Total Jobs</CardTitle>
          <ClipboardList className="w-6 h-6 text-blue-600" />
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{totalJobs}</p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow cursor-pointer" onClick={() => navigate("/view-jobs?status=completed") }>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Completed Jobs</CardTitle>
          <CheckCircle2 className="w-6 h-6 text-green-600" />
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{completedJobs}</p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow cursor-pointer" onClick={() => navigate("/view-jobs?status=pending") }>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Pending Jobs</CardTitle>
          <Clock className="w-6 h-6 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{pendingJobs}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeroSection;
