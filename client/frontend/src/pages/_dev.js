import React from 'react';
import JobsPage from './candidate/jobsPage.js'; // or actual relative path
import UserProfilePage from './common/UserProfilePage.js';

const DevPage = () => {
  return (
    <div className="p-6">
      <JobsPage />
    </div>
  );
};

export default DevPage;
