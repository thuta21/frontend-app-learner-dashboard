import React, { useState } from 'react';
import './Filter.scss';

const Filter = () => {
  const [activeTab, setActiveTab] = useState('inProgress');

  return (
    <div className="learning-tabs">
      <h2 className="learning-tabs__title">My Learning</h2>
      <div className="learning-tabs__buttons">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'inProgress' ? 'active' : ''}`}
          onClick={() => setActiveTab('inProgress')}
        >
          In Progress
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default Filter;
