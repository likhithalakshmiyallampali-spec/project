import React, { useState, useEffect, useCallback } from 'react';
import JobCard from '../components/JobCard';

const Dashboard = ({ onApply }) => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('All');
  const [sort, setSort] = useState('latest');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Wrapped in useCallback to stabilize memory reference and satisfy all ESLint structural rules
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/jobs?search=${search}&type=${type}&sort=${sort}&page=${page}&limit=6`);
      const json = await res.json();
      
      if (json.success) {
        // Checking for clean state to seed Indian corporate positions automatically if database is completely empty
        if (json.data.length === 0 && search === '' && type === 'All' && page === 1) {
          const baselineJobs = [
            {
              title: 'Senior Full Stack Engineer',
              company: 'Razorpay India Tech',
              location: 'Bangalore, KA',
              type: 'Full-time',
              salary: 2400000,
              description: 'Architect low-latency payment processing gateways and construct scale visualization interfaces utilizing React components and multi-cluster Node backend configurations.'
            },
            {
              title: 'Frontend UI Platform Developer',
              company: 'Zomato Engineering',
              location: 'Gurgaon, HR',
              type: 'Full-time',
              salary: 1800000,
              description: 'Design open-source component frameworks and optimize application lifecycle loading performance speeds for standard merchant dashboard views.'
            },
            {
              title: 'Backend Cloud Consultant',
              company: 'Infosys Innovation Labs',
              location: 'Hyderabad, TS',
              type: 'Contract',
              salary: 1500000,
              description: 'Construct transactional telemetry pipelines and deploy automated data caching layers across relational engine clusters to ensure operational reliability.'
            }
          ];

          for (const job of baselineJobs) {
            await fetch('http://localhost:5000/api/jobs', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(job)
            });
          }

          // Secondary pull execution to display newly seeded items
          const retryRes = await fetch(`http://localhost:5000/api/jobs?search=&type=All&sort=latest&page=1&limit=6`);
          const retryJson = await retryRes.json();
          if (retryJson.success) {
            setJobs(retryJson.data);
            setTotalPages(retryJson.totalPages);
          }
        } else {
          setJobs(json.data);
          setTotalPages(json.totalPages);
        }
      }
    } catch (err) {
      console.error('Error handling catalog pipeline aggregation: ', err);
    } finally {
      setLoading(false);
    }
  }, [search, type, sort, page]);

  // Effect hook tracking the stabilized fetch function
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <div className="container">
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-0.75px' }}>Explore Open Positions</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Discover verified engineering placements across the technological ecosystem</p>
      </div>

      <div className="search-bar-container">
        <input type="text" placeholder="Filter by position title or partner company..." className="form-control" style={{ flex: 2, minWidth: '260px' }} value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        <select className="form-control" style={{ flex: 1, minWidth: '160px' }} value={type} onChange={(e) => { setType(e.target.value); setPage(1); }}>
          <option value="All">All Classifications</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Remote">Remote</option>
        </select>
        <select className="form-control" style={{ flex: 1, minWidth: '160px' }} value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}>
          <option value="latest">Sort: Latest Additions</option>
          <option value="salary_asc">Compensation: Low to High</option>
          <option value="salary_desc">Compensation: High to Low</option>
        </select>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : jobs.length === 0 ? (
        <div className="empty-state">
          <h3 style={{ fontSize: '20px', marginBottom: '8px', color: 'var(--text-primary)' }}>No Positions Found</h3>
          <p>No job listings correspond to your specific filter criteria parameters.</p>
        </div>
      ) : (
        <>
          <div className="grid">
            {jobs.map(job => (
              <JobCard key={job._id} job={job} isAdmin={false} onApply={onApply} />
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '40px' }}>
            <button className="btn btn-secondary" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
            <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>Page {page} of {totalPages}</span>
            <button className="btn btn-secondary" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;