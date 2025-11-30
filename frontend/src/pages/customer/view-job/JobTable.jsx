import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatDateTime } from "@/lib/formatDate";
import empty_box from "@/assets/media/image/other/empty-box.png";
import { ArrowUp, ArrowDown, ArrowUpDown, Minus, CircleCheckBig  } from "lucide-react";

// status color
const statusColor = {
  pending: "bg-yellow-100 text-yellow-800",
  running: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
};

const JobTable = ({
  jobs,
  totalPages,
  page,
  setPage,
  totalRecords,
  handleRunJob,
}) => {
  const navigate = useNavigate();
  const data = useMemo(() => jobs || [], [jobs]);

  const columns = useMemo(
    () => [
      { header: "Job ID", accessorKey: "job_id" },
      { header: "Job Name", accessorKey: "job_name" },
      { header: "Priority", accessorKey: "priority" },
      {
        header: "Created At",
        accessorKey: "created_at",
        cell: ({ getValue }) => formatDateTime(getValue()),
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ getValue }) => {
          const value = getValue();
          const capitalizeFirstLetter =  value.charAt(0).toUpperCase() + value.slice(1);
         return(
          <Badge
            className={`px-2 py-1 rounded text-sm ${statusColor[value.toLowerCase()]}`}
          >
            {capitalizeFirstLetter}
          </Badge>
          )
        },
      },
      {
        header: "Actions",
        cell: ({ row }) =>
          row.original.status === "Pending" ? (
            <div className="text-center">
              <button              
                onClick={(e) =>{
                  e.stopPropagation(); 
                  handleRunJob(row.original.job_id)}
                }
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm cursor-pointer"
              >
                Run Job
              </button>
            </div>
          ) : (
            <div className="flex justify-center text-green-700"><CircleCheckBig /></div>
          ),
      },
    ],
    [handleRunJob]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (!jobs || jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <img
          src={empty_box}
          alt="No jobs found"
          className="w-48 h-48 object-contain mb-4"
        />
        <p className="text-gray-600 text-lg">No jobs found</p>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border px-4 py-2 cursor-pointer select-none text-center"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2 justify-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      {header.column.columnDef.header !== "Actions" && (
                        <>
                          {header.column.getIsSorted() === "asc" && (
                            <ArrowUp size={16} />
                          )}
                          {header.column.getIsSorted() === "desc" && (
                            <ArrowDown size={16} />
                          )}
                          {!header.column.getIsSorted() && (
                            <ArrowUpDown size={16} />
                          )}
                        </>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {/* fetchJobById */}
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t text-center">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`border px-4 py-2 ${
                      ["job_id", "job_name"].includes(cell.column.id)
                        ? "cursor-pointer hover:bg-gray-100"
                        : ""
                    }`}
                    onClick={() => {
                      if (["job_id", "job_name"].includes(cell.column.id)) {
                        navigate(`/view-job/${cell.row.original.job_id}`);
                      }
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="text-center gap-2 mt-4">
        <div className="text-gray-600 text-sm text-start">
          Total Records: <strong>{totalRecords}</strong>
        </div>
        <div className="flex justify-center py-3 gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-40 cursor-pointer"
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-40 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobTable;