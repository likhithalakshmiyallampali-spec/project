import React from 'react';

const JobCard = ({ job, isAdmin, onEdit, onDelete, onApply, onViewApplications }) => {
  return (
    <div className="card">
      <div className="flex-between" style={{ marginBottom: '16px' }}>
        <span className="badge">{job.type}</span>
        <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>{job.location}</span>
      </div>
      
      <h3 style={{ fontSize: '20px', fontWeight: '700', lineHeight: '1.3', marginBottom: '6px', letterSpacing: '-0.3px' }}>{job.title}</h3>
      <h4 style={{ color: 'var(--text-secondary)', fontSize: '15px', fontWeight: '500', marginBottom: '16px' }}>{job.company}</h4>
      
      <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '24px', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {job.description}
      </p>
      
      <div className="flex-between" style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: 'var(--text-secondary)', letterSpacing: '0.5px' }}>Annual Salary</div>
          {/* Formatted for Indian Rupees formatting style */}
          <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>₹{job.salary.toLocaleString('en-IN')}</span>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          {isAdmin ? (
            <>
              <button className="btn btn-secondary" style={{ padding: '8px 12px', fontSize: '13px' }} onClick={() => onEdit(job)}>Edit</button>
              <button className="btn btn-danger" style={{ padding: '8px 12px', fontSize: '13px' }} onClick={() => onDelete(job._id)}>Delete</button>
              <button className="btn btn-secondary" style={{ padding: '8px 12px', fontSize: '13px' }} onClick={() => onViewApplications(job)}>Applicants</button>
            </>
          ) : (
            <button className="btn" style={{ padding: '8px 16px', fontSize: '13px' }} onClick={() => onApply(job)}>Apply Now</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;