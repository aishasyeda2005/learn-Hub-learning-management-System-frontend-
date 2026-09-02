import { useParams, Link } from "react-router-dom";
import { Printer, ArrowLeft } from "lucide-react";
import courses from "../data/courses";
import Button from "../components/Button";
import { useApp } from "../context/AppContext";

function Certificate() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === Number(id));
  const { profile, progress } = useApp();

  const isComplete = course && (progress[course.id] || 0) === 100;

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (!course) {
    return (
      <div className="text-center py-32">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Course not found</h2>
        <Link to="/courses" className="text-[#0056D2] dark:text-blue-400 hover:underline mt-4 inline-block">
          Back to Courses
        </Link>
      </div>
    );
  }

  if (!isComplete) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Certificate not available yet
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Complete all lessons in "{course.title}" to unlock your certificate.
        </p>
        <Link to={`/courses/${course.id}`}>
          <Button>Go to Course</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Toolbar - hidden when printing */}
      <div className="flex items-center justify-between mb-6 print:hidden">
        <Link
          to={`/courses/${course.id}`}
          className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-[#0056D2] dark:hover:text-blue-400"
        >
          <ArrowLeft size={16} /> Back to course
        </Link>
        <Button onClick={() => window.print()} className="flex items-center gap-2">
          <Printer size={16} /> Print / Save as PDF
        </Button>
      </div>

      {/* Certificate */}
      <div className="bg-white dark:bg-gray-900 border-4 border-[#0056D2] rounded-xl p-10 md:p-16 text-center relative overflow-hidden">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-24 h-24 border-t-8 border-l-8 border-[#0056D2]/20 rounded-tl-xl" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-8 border-r-8 border-[#0056D2]/20 rounded-br-xl" />

        <p className="text-2xl font-bold text-[#0056D2] mb-1">learnhub</p>
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-8">
          Certificate of Completion
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">This certifies that</p>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 font-serif">
          {profile.fullName}
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          has successfully completed the course
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
          {course.title}
        </h2>

        <div className="flex items-center justify-center gap-16 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{course.instructor}</p>
            <p className="text-xs text-gray-400 mt-1">Instructor</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{today}</p>
            <p className="text-xs text-gray-400 mt-1">Date Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Certificate;
