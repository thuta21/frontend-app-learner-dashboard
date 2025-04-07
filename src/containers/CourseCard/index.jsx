import React from 'react';
import PropTypes from 'prop-types';
import { reduxHooks } from 'hooks';

import { Card } from '@openedx/paragon';

import { useIsCollapsed } from './hooks';
import CourseCardImage from './components/CourseCardImage';
import CourseCardDetails from './components/CourseCardDetails';
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
      <Card orientation={orientation} className="course-card-width">
        <div className="d-flex flex-column w-100">
          <CourseCardImage cardId={cardId} orientation="horizontal" />

          {sectionScores && sectionScores.length > 0 && (
            <p>Topic: {sectionScores.length}</p>
          )}
          <Card.Body>
            <Card.Header
              title={<CourseCardTitle cardId={cardId} />}
            />
            {/* Progress Bar Section */}
            <div className="mb-3">
              <div className="text-sm text-muted mb-1">
                {completionPercentage}% complete
              </div>
              <div className="w-100 bg-gray-300 rounded" style={{ height: '8px' }}>
                <div
                  className="bg-success rounded"
                  style={{
                    height: '8px',
                    width: `${completionPercentage}%`,
                    transition: 'width 0.4s ease',
                  }}
                />
              </div>
            </div>
            <Card.Section className="pt-0">
              <CourseCardDetails cardId={cardId} />
            </Card.Section>
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
