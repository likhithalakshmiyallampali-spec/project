import React, { useState, useEffect } from 'react';

const JobForm = ({ onSubmit, editJob, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '', company: '', location: '', type: 'Full-time', salary: '', description: ''
  });

  useEffect(() => {
    if (editJob) {
      setFormData(editJob);
    } else {
      setFormData({ title: '', company: '', location: '', type: 'Full-time', salary: '', description: '' });
    }
  }, [editJob]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!editJob) {
      setFormData({ title: '', company: '', location: '', type: 'Full-time', salary: '', description: '' });
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="card" style={{ boxShadow: '0 4px 12px rgb(0 0 0 / 0.05)' }}>
      <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', letterSpacing: '-0.4px' }}>
        {editJob ? 'Modify Placement Record' : 'Deploy Corporate Assignment Posting'}
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="form-group">
          <label>Official Position Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="form-control" placeholder="e.g. Staff System Architect" required />
        </div>
        <div className="form-group">
          <label>Company/Institution</label>
          <input type="text" name="company" value={formData.company} onChange={handleChange} className="form-control" placeholder="e.g. OpenAI Infrastructure" required />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        <div className="form-group">
          <label>Geographic Node / Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} className="form-control" placeholder="e.g. Remote / Bangalore, India" required />
        </div>
        <div className="form-group">
          <label>Classification Type</label>
          <select name="type" value={formData.type} onChange={handleChange} className="form-control">
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
        <div className="form-group">
          {/* Label adjusted to Indian Rupees */}
          <label>Gross Salary Allocation (INR)</label>
          <input type="number" name="salary" value={formData.salary} onChange={handleChange} className="form-control" placeholder="e.g. 1200000" required />
        </div>
      </div>

      <div className="form-group">
        <label>Comprehensive Role Scope Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" rows="4" placeholder="Detail the core infrastructure responsibilities and team composition parameters..." required></textarea>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
        {editJob && <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>}
        <button type="submit" className="btn">{editJob ? 'Save Cluster Variations' : 'Publish Open Position'}</button>
      </div>
    </form>
  );
};

export default JobForm;