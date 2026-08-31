import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import courses from "../data/courses";
import CourseCard from "../components/CourseCard";

const categories = ["All", "Web Development", "Design", "Data Science", "Marketing"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];
const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low", "Rating", "Popularity"];

function Courses() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  const filteredCourses = useMemo(() => {
    let result = courses.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || course.category === category;
      const matchesLevel = level === "All" || course.level === level;
      return matchesSearch && matchesCategory && matchesLevel;
    });

    if (sortBy === "Price: Low to High") result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "Price: High to Low") result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === "Rating") result = [...result].sort((a, b) => b.rating - a.rating);
    if (sortBy === "Popularity") result = [...result].sort((a, b) => b.students - a.students);
    if (sortBy === "Newest") result = [...result].sort((a, b) => b.id - a.id);

    return result;
  }, [search, category, level, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">All Courses</h1>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0056D2]"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2.5 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="px-4 py-2.5 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          {levels.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2.5 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          {sortOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Results */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          No courses found. Try changing your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;
