import React, { useState } from 'react';

const ApplicationModal = ({ job, onClose, onSubmit }) => {
  const [applicantData, setApplicantData] = useState({ fullName: '', email: '', phone: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(job._id, applicantData);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Application Pipeline for {job.title}</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>{job.company} - {job.location}</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" className="form-control" value={applicantData.fullName} onChange={(e) => setApplicantData({...applicantData, fullName: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" className="form-control" value={applicantData.email} onChange={(e) => setApplicantData({...applicantData, email: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Contact Phone Number</label>
            <input type="tel" className="form-control" value={applicantData.phone} onChange={(e) => setApplicantData({...applicantData, phone: e.target.value})} required />
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Dismiss</button>
            <button type="submit" className="btn">Send Candidate Portfolio</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationModal;