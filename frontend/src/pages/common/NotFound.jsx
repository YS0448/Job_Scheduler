import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  const { role } = useAuth();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 text-center w-full max-w-md relative">
        
        {/* Top Icon */}
        <div className="mb-6 flex justify-center">
          <AlertCircle size={48} className="text-red-500" />
        </div>

        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-gray-600 mb-6">
          Sorry, the page you are looking for does not exist.
        </p>

        <Button
          onClick={() => navigate(role === "customer" ? "/dashboard/customer" : "/")}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
