import React from "react";
import HeroSection from "./HeroSection";
import RecentAddedJob from "./RecentAddedJob";


const customerDashboard = () => {

  return (
    <div className="md:p-6 space-y-6">      
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <HeroSection />
      <RecentAddedJob />

    </div>
  );
};

export default customerDashboard;
