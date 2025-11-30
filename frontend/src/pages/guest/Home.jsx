import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { set } from "date-fns";
import { CheckCircle, Calendar, Clock } from "lucide-react"; 


const Home = () => {

  return (
    <div className="flex flex-col justify-center items-center h-full bg-gray-50 px-4 py-12 gap-8">
      <Card className="max-w-2xl w-full shadow-lg p-6">
        <CardHeader>
          <CardTitle className="text-4xl text-center font-bold">
            Welcome to Job Scheduler
          </CardTitle>
          <CardDescription className="text-center mt-2 text-gray-600">
            Organize your tasks and schedule your work efficiently.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Calendar size={32} className="text-green-500" />
            <span>Plan your tasks easily</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CheckCircle size={32} className="text-purple-500" />
            <span>Track your task completion</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clock size={32} className="text-blue-500" />
            <span>Manage your day effectively</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
