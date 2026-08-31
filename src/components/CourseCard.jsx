import { Link } from "react-router-dom";
import { Star, Heart } from "lucide-react";
import { useApp } from "../context/AppContext";

function CourseCard({ course }) {
  const { wishlist, toggleWishlist } = useApp();
  const isWishlisted = wishlist.some((c) => c.id === course.id);

  return (
    <Link
      to={`/courses/${course.id}`}
      className="block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition overflow-hidden group"
    >
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-36 object-cover group-hover:scale-[1.02] transition"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(course);
          }}
          className="absolute top-2 right-2 bg-white/90 dark:bg-gray-900/90 p-1.5 rounded-full"
          aria-label="Toggle wishlist"
        >
          <Heart size={16} className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"} />
        </button>
      </div>

      <div className="p-4">
        {/* Provider row - mimics Coursera's "org + name" line */}
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-5 h-5 rounded-full bg-[#0056D2] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
            {course.instructor.charAt(0)}
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400 truncate">{course.instructor}</span>
        </div>

        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2 leading-snug">
          {course.title}
        </h3>

        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          {course.level} · {course.category}
        </p>

        <div className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300 mb-1">
          <span className="font-semibold">{course.rating}</span>
          <Star size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="text-gray-400">({course.students.toLocaleString()})</span>
        </div>

        <p className="text-sm font-bold text-gray-900 dark:text-white mt-2">${course.price}</p>
      </div>
    </Link>
  );
}

export default CourseCard;
