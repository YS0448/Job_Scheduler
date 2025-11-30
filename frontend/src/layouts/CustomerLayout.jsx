import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
export default function CustomerLayout() {
  return (
      <div className="flex h-screen w-full flex-col">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

          <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <Outlet />
          </main>
        </div>

        <Footer />
      </div>
  );
}
