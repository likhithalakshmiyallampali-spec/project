import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import JobForm from './components/JobForm';
import JobCard from './components/JobCard';
import ApplicationModal from './components/ApplicationModal';
import AdminApplications from './pages/AdminApplications';

function App() {
  const [theme, setTheme] = useState('light');
  const [view, setView] = useState('dashboard');
  const [adminJobs, setAdminJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [activeApplyJob, setActiveApplyJob] = useState(null);
  const [activeViewJobApps, setActiveViewJobApps] = useState(null);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const fetchAdminJobs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/jobs?limit=100');
      const json = await res.json();
      if (json.success) setAdminJobs(json.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (view === 'admin') fetchAdminJobs();
  }, [view]);

  const handleCreateOrUpdateJob = async (jobData) => {
    const url = editingJob ? `http://localhost:5000/api/jobs/${editingJob._id}` : 'http://localhost:5000/api/jobs';
    const method = editingJob ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      });
      const json = await res.json();
      if (json.success) {
        setEditingJob(null);
        fetchAdminJobs();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm('Confirm execution of delete parameter command?')) {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/${id}`, { method: 'DELETE' });
        const json = await res.json();
        if (json.success) fetchAdminJobs();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleApplicationSubmit = async (jobId, applicantData) => {
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${jobId}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicantData)
      });
      const json = await res.json();
      if (json.success) {
        alert('Application pipeline transmission succeeded.');
        setActiveApplyJob(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar theme={theme} toggleTheme={toggleTheme} currentView={view} setView={setView} />
      
      {view === 'dashboard' && (
        <Dashboard onApply={(job) => setActiveApplyJob(job)} />
      )}

      {view === 'admin' && !activeViewJobApps && (
        <div className="container">
          <JobForm onSubmit={handleCreateOrUpdateJob} editJob={editingJob} onCancel={() => setEditingJob(null)} />
          <h3 style={{ margin: '20px 0' }}>Operational Deployment Database Listings</h3>
          <div className="grid">
            {adminJobs.map(job => (
              <JobCard 
                key={job._id} 
                job={job} 
                isAdmin={true} 
                onEdit={(j) => setEditingJob(j)} 
                onDelete={handleDeleteJob}
                onViewApplications={(j) => setActiveViewJobApps(j)}
              />
            ))}
          </div>
        </div>
      )}

      {activeViewJobApps && (
        <AdminApplications job={activeViewJobApps} onBack={() => setActiveViewJobApps(null)} />
      )}

      {activeApplyJob && (
        <ApplicationModal 
          job={activeApplyJob} 
          onClose={() => setActiveApplyJob(null)} 
          onSubmit={handleApplicationSubmit} 
        />
      )}
    </div>
  );
}

export default App;