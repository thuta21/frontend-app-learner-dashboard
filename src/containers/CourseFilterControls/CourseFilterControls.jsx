import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@openedx/paragon';
import { reduxHooks } from 'hooks';
import useCourseFilterControlsData from './hooks';
import './index.scss';

export const CourseFilterControls = ({
  setSortBy,
  filters,
}) => {
  const hasCourses = reduxHooks.useHasCourses();
  const {
    handleFilterChange,
  } = useCourseFilterControlsData({
    filters,
    setSortBy,
  });
  const useWatchedCourseCount = () => {
    const [courseCount, setCourseCount] = useState(() => {
      const saved = localStorage.getItem('courseCount');
      return saved ? parseInt(saved, 10) : 0;
    });

    useEffect(() => {
      // Sync from other tabs/windows
      const handleStorage = (event) => {
        if (event.key === 'courseCount') {
          setCourseCount(parseInt(event.newValue, 10) || 0);
        }
      };

      // Polling fallback for same-tab changes
      const interval = setInterval(() => {
        const stored = parseInt(localStorage.getItem('courseCount'), 10) || 0;
        setCourseCount((prev) => (prev !== stored ? stored : prev));
      }, 1000); // check every 1s

      window.addEventListener('storage', handleStorage);

      return () => {
        window.removeEventListener('storage', handleStorage);
        clearInterval(interval);
      };
    }, []);

    return courseCount;
  };

  const courseCount = useWatchedCourseCount();

  return (
    <div id="course-filter-controls">
      <h2 className="learning-tabs__title">My Learning</h2>
      <div className="filter-toggle-container d-flex gap-2">
        <Form.CheckboxSet
          name="course-status-filters"
          onChange={handleFilterChange}
          value={filters}
          disabled={!hasCourses}
        >
          <div className="d-flex" style={{ gap: '1rem' }}>
            <input
              type="checkbox"
              value="inProgress"
              id="filter-inProgress"
              checked={filters.includes('inProgress')}
              onChange={handleFilterChange}
              className="visually-hidden"
            />
            <label
              htmlFor="filter-inProgress"
              className={`filter-pill ${filters.includes('inProgress') ? 'active' : ''}`}
            >
              In Progress
              <span className="filter-pill-count">
                {filters.includes('inProgress') ? `(${courseCount})` : ''}
              </span>
            </label>

            <input
              type="checkbox"
              value="done"
              id="filter-done"
              checked={filters.includes('done')}
              onChange={handleFilterChange}
              className="visually-hidden"
            />
            <label
              htmlFor="filter-done"
              className={`filter-pill ${filters.includes('done') ? 'active' : ''}`}
            >
              Complete {filters.includes('done') ? `(${courseCount})` : ''}
            </label>
          </div>
        </Form.CheckboxSet>
      </div>
    </div>
  );
};
CourseFilterControls.propTypes = {
  setSortBy: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CourseFilterControls;
