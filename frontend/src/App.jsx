import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// layout
import CustomerLayout from "@/layouts/CustomerLayout";
import PublicLayout from "@/layouts/PublicLayout";

// Guard
import CustomerGuard from "@/guard/CustomerGuard";
import GuestGuard from "@/guard/GuestGuard";

// context
import { SidebarProvider } from "@/context/SidebarContext";
import { LoaderProvider } from "@/context/LoaderContext";
import { AuthProvider } from "@/context/AuthContext";

// Auth
import Login from "@/pages/auth/login/index";
import ForgotPassword from "@/pages/auth/forgot-password/index";
import Signup from "@/pages/auth/signup";

// Toast
import { Toast } from "@/components/common/AlertService";

// guest
import Home from "@/pages/guest/Home";

// customer
import CustomerDashboard from "@/pages/customer/dashboard/index";
import CreateJob from "@/pages/customer/create-job";
import ViewJob from "@/pages/customer/view-job/index";
import JobDetails from "@/pages/customer/view-job/JobDetails";
import Profile from "@/pages/common/Profile";

// Not Found
import NotFound from "@/pages/common/NotFound";

function AppLayout() {
  return (
    <Routes>
      
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<PublicLayout />}>
        <Route element={<GuestGuard />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Route>

      <Route element={<CustomerLayout />}>
        <Route element={<CustomerGuard />}>
          <Route path="/dashboard/customer" element={<CustomerDashboard />} />
          <Route path="/create-job" element={<CreateJob />} />
          <Route path="/view-jobs" element={<ViewJob />} />
          <Route path="/view-job/:id" element={<JobDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

    {/* Not Found */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}
function App() {
  return (
    <Router>
      <LoaderProvider>
        <AuthProvider>
          <SidebarProvider>
            <Toast />
            <AppLayout />
          </SidebarProvider>
        </AuthProvider>
      </LoaderProvider>
    </Router>
  );
}

export default App;
