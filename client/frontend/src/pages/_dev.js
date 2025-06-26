import React from 'react';
import JobsPage from './candidate/jobsPage.js'; // or actual relative path
import UserProfilePage from './common/UserProfilePage.js';
import EmployerDashboard from './employer/EmployerDashboard.js';

const DevPage = () => {
  return (
    <div className="p-6">
      <EmployerDashboard />
    </div>
  );
};

export default DevPage;
