import { useParams, Link } from "react-router-dom";
import { Check } from "lucide-react";
import courses from "../data/courses";
import CourseCard from "../components/CourseCard";
import { getTopicDetails } from "../data/exploreTopics";

function ExploreTopic() {
  const { topic } = useParams();
  const topicName = decodeURIComponent(topic);
  const details = getTopicDetails(topicName);

  const relatedCourses = details.levelFilter
    ? courses.filter((c) => c.level === details.levelFilter)
    : details.category
    ? courses.filter((c) => c.category === details.category)
    : courses;

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Header banner */}
      <div className="bg-[#EDF3FF] dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            <Link to="/" className="hover:underline">
              Home
            </Link>{" "}
            / Explore
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {topicName}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed">
            {details.description}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Skills needed */}
        {details.skills.length > 0 && (
          <div className="mb-14">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
              Skills you'll need
            </h2>
            <div className="flex flex-wrap gap-2">
              {details.skills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#EDF3FF] dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-medium"
                >
                  <Check size={14} />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Recommended courses */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Recommended courses
          </h2>
          {relatedCourses.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No courses found yet for this topic —{" "}
              <Link to="/courses" className="text-[#0056D2] dark:text-blue-400 hover:underline">
                browse all courses
              </Link>
              .
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedCourses.slice(0, 6).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExploreTopic;
