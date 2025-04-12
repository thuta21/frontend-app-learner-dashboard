import React from 'react';
import PropTypes from 'prop-types';
import { reduxHooks } from 'hooks';

import { Card } from '@openedx/paragon';

import { useIsCollapsed } from './hooks';
import CourseCardImage from './components/CourseCardImage';
// import CourseCardDetails from './components/CourseCardDetails';
import CourseCardTitle from './components/CourseCardTitle';
import './CourseCard.scss';
import { useCourseProgressData } from '../CoursesPanel/progress-hooks';

export const CourseCard = ({
  cardId,
}) => {
  const isCollapsed = useIsCollapsed();
  const orientation = isCollapsed ? 'vertical' : 'horizontal';
  const { courseId } = reduxHooks.useCardCourseRunData(cardId);

  const { completionPercentage, sectionScores } = useCourseProgressData(courseId);

  return (
    <div className="mb-4.5" id={cardId} data-testid="CourseCard">
      <Card orientation={orientation} className="course-card-width" style={{ borderRadius: '12px' }}>
        <div className="d-flex flex-column w-100">
          <CourseCardImage cardId={cardId} orientation="horizontal" />

          <Card.Body className="d-flex flex-column justify-content-between h-100">
            <div className="d-flex justify-content-between px-3 pt-3" style={{ marginBottom: '16px' }}>
              <span className="text-muted" style={{ fontSize: '16px' }}>
                {sectionScores?.length ? `${sectionScores.length} topics` : '\u00A0'}
              </span>
              {/* <span className="text-sm text-muted">36 hrs</span> */}
            </div>

            <div className="px-3" style={{ marginBottom: '14px' }}>
              <CourseCardTitle cardId={cardId} />
            </div>

            <div className="px-3 pb-4">
              <div className="w-100 bg-gray-300 rounded" style={{ height: '8px', marginBottom: '8px' }}>
                <div
                  className="bg-success rounded"
                  style={{
                    height: '8px',
                    width: `${completionPercentage}%`,
                    transition: 'width 0.4s ease',
                  }}
                />
              </div>
              <div className="text-muted mb-1" style={{ fontSize: '16px' }}>
                {completionPercentage}% complete
              </div>
            </div>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};
CourseCard.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCard;
