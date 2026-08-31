import { BookOpen, CheckCircle, Clock, TrendingUp } from "lucide-react";
import Sidebar from "../components/Sidebar";
import ProgressCard from "../components/ProgressCard";
import { useApp } from "../context/AppContext";
import { Link } from "react-router-dom";

const recentActivity = [
  { text: 'Completed "React Basics"', time: "2 days ago" },
  { text: 'Started "JavaScript Advanced"', time: "3 days ago" },
  { text: "Completed Quiz: HTML & CSS", time: "5 days ago" },
  { text: "Earned Certificate: Git & GitHub", time: "1 week ago" },
];

function Dashboard() {
  const { enrolledCourses, progress } = useApp();

  const completedCount = Object.values(progress).filter((p) => p === 100).length;
  const totalHours = enrolledCourses.reduce((sum, c) => sum + parseInt(c.duration), 0);
  const overallProgress = enrolledCourses.length
    ? Math.round(
        Object.values(progress).reduce((a, b) => a + b, 0) / enrolledCourses.length
      )
    : 0;

  const stats = [
    { label: "Enrolled Courses", value: enrolledCourses.length, icon: BookOpen },
    { label: "Completed Courses", value: completedCount, icon: CheckCircle },
    { label: "Total Learning Hours", value: `${totalHours}h`, icon: Clock },
    { label: "Overall Progress", value: `${overallProgress}%`, icon: TrendingUp },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-6">
      <Sidebar />

      <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Student Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
              <Icon className="text-blue-600 dark:text-blue-400 mb-2" size={22} />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            </div>
          ))}
        </div>

        {/* My Courses */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">My Courses</h2>
          {enrolledCourses.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't enrolled in any courses yet.</p>
              <Link to="/courses" className="text-[#0056D2] dark:text-blue-400 font-medium hover:underline">
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {enrolledCourses.map((course) => (
                <ProgressCard key={course.id} course={course} percentage={progress[course.id] || 0} />
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3">
                <p className="text-sm text-gray-700 dark:text-gray-300">{activity.text}</p>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
