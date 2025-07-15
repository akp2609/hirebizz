import React from 'react';
import JobsPage from './candidate/jobsPage.js'; 
import UserProfilePage from './common/UserProfilePage.js';
import EmployerDashboard from './employer/EmployerDashboard.js';
import MyApplications from './candidate/MyApplications.js';
import CandidateDashboard from './candidate/CandidateDashboard.js';

const DevPage = () => {
  return (
    <div className="p-6">
      <CandidateDashboard />
    </div>
  );
};

export default DevPage;
