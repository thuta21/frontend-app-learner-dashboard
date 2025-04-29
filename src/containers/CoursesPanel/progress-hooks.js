// In src/containers/CoursePanel/hooks.js
import { useEffect, useState } from 'react';
import { getCourseProgressData } from '../../data/services/lms/api';

export const useCourseProgressData = (courseId) => {
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!courseId) { return; }
      try {
        setLoading(true);
        const data = await getCourseProgressData(courseId);
        setProgressData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [courseId]);

  // Calculate completion percentage
  const summary = progressData?.completion_summary;

  const completionPercentage = summary ? Math.round((summary.complete_count
      / (summary.complete_count + summary.incomplete_count + summary.locked_count)) * 100) || 0
    : 0;

  return {
    progressData,
    loading,
    error,
    completionPercentage,
    completionSummary: progressData?.completion_summary,
    courseGrade: progressData?.course_grade,
    sectionScores: progressData?.section_scores,
  };
};
