import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
export default function PublicLayout() {
  return (
      <div className="flex h-screen w-full flex-col">
        <Header />

          <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <Outlet />
          </main>

        <Footer />
      </div>
  );
}
