import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import { useViewJobs } from "./useViewJobs";
import  JobTable  from "./JobTable";

const ViewJob = () => {
  const {
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
  } = useViewJobs();


  return (
    <div className="min-h-screen sm:p-6 bg-gray-50 ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full ">
        <h2 className="text-xl font-[700] mb-5 text-center border-2 rounded-lg py-1 bg-brand-primary text-white">All Jobs</h2>

        {/* Status Filter Dropdown */}
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-3 gap-4 overflow-x-auto">
          <div className="font-[500]">Filters</div>

          {/* Status */}
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <Label className="font-medium text-gray-700">Status:</Label>

            <Select
              value={status || "all"}
              onValueChange={(value) => {
                setPage(1);
                setStatus(value === "all" ? "" : value);
              }}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="running">Running</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <Label className="font-medium text-gray-700">Priority:</Label>

            <Select
              value={priority || "all"}
              onValueChange={(value) => {
                setPage(1);
                setPriority(value === "all" ? "" : value);
              }}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <JobTable
          jobs={jobs}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          totalRecords={totalRecords}
          handleRunJob={handleRunJob}
        />
      </div>
    </div>
  );
};

export default ViewJob;
