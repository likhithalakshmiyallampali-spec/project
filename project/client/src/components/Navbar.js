import React from 'react';

const Navbar = ({ theme, toggleTheme, currentView, setView }) => {
  return (
    <nav className="navbar">
      <h2 style={{ cursor: 'pointer' }} onClick={() => setView('dashboard')}>CoreJobPortal</h2>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <button className="btn btn-secondary" onClick={() => setView(currentView === 'dashboard' ? 'admin' : 'dashboard')}>
          {currentView === 'dashboard' ? 'Recruiter Dashboard' : 'View Job Openings'}
        </button>
        <button className="btn btn-secondary" onClick={toggleTheme}>
          Theme Shift ({theme === 'light' ? 'Dark' : 'Light'})
        </button>
      </div>
    </nav>
  );
};

export default Navbar;