import React, { useState, useEffect } from 'react';

const AdminApplications = ({ job, onBack }) => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/${job._id}/applications`);
        const json = await res.json();
        if (json.success) setApps(json.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchApplications();
  }, [job]);

  return (
    <div className="container">
      <button className="btn btn-secondary" style={{ marginBottom: '20px' }} onClick={onBack}>Back to Recruiter Console</button>
      <div className="card">
        <h3>Candidate Responses for: {job.title}</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>{job.company} - Repository Total: {apps.length}</p>
        
        {apps.length === 0 ? (
          <p>No applications have been registered for this position file node.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>Applicant Name</th>
                <th style={{ padding: '12px' }}>Email Record</th>
                <th style={{ padding: '12px' }}>Phone Entry</th>
                <th style={{ padding: '12px' }}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {apps.map(app => (
                <tr key={app._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px' }}>{app.fullName}</td>
                  <td style={{ padding: '12px' }}>{app.email}</td>
                  <td style={{ padding: '12px' }}>{app.phone}</td>
                  <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{new Date(app.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminApplications;