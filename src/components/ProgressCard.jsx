import { Link } from "react-router-dom";

function ProgressCard({ course, percentage }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-4 items-center">
      <img src={course.image} alt={course.title} className="w-full sm:w-32 h-24 object-cover rounded-lg" />

      <div className="flex-1 w-full">
        <h4 className="font-semibold text-gray-900 dark:text-white">{course.title}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{course.instructor}</p>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-1">
          <div
            className="bg-[#0056D2] h-2 rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{percentage}% completed</p>
      </div>

      <Link
        to={`/courses/${course.id}`}
        className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
      >
        Continue
      </Link>
    </div>
  );
}

export default ProgressCard;
