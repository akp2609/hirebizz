import React from 'react'

function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard title="Users" value="Loading..." />
        <StatCard title="Jobs" value="Loading..." />
        <StatCard title="Companies" value="Loading..." />
      </div>
    </div>
  )
}

export default Dashboard
