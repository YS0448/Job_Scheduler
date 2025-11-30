export const Pagination = ({ page, totalPages, setPage }) => {
  return (
    <div className="flex justify-center gap-4 mt-4">
      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>

      <span className="px-2 py-1 text-gray-700">
        Page {page} of {totalPages}
      </span>

      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};
