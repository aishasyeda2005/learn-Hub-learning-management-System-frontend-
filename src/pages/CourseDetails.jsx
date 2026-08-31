import { useParams, Link } from "react-router-dom";
import { Star, Clock, BarChart3, Check, Award, Calendar, Globe } from "lucide-react";
import courses from "../data/courses";
import Button from "../components/Button";
import { useApp } from "../context/AppContext";

// Extra content per category, since courses.js only stores the basics
const categoryDetails = {
  "Web Development": {
    learn: [
      "Build real projects using modern, industry-standard tools",
      "Understand core concepts through hands-on practice",
      "Write clean, maintainable, and reusable code",
      "Debug and deploy your own applications",
    ],
    skills: ["Web Development", "Problem Solving", "Version Control", "Debugging", "API Integration"],
    tools: ["VS Code", "Git & GitHub", "Chrome DevTools"],
  },
  Design: {
    learn: [
      "Apply design principles to create user-friendly interfaces",
      "Build wireframes, prototypes, and design systems",
      "Understand color theory, typography, and layout",
      "Present and justify design decisions to stakeholders",
    ],
    skills: ["UI Design", "UX Research", "Prototyping", "Visual Design", "Design Systems"],
    tools: ["Figma", "Adobe XD"],
  },
  "Data Science": {
    learn: [
      "Analyze and visualize real-world datasets",
      "Apply statistical methods to draw meaningful conclusions",
      "Build and evaluate predictive models",
      "Communicate data-driven insights clearly",
    ],
    skills: ["Data Analysis", "Statistics", "Data Visualization", "Python", "Critical Thinking"],
    tools: ["Python", "Pandas", "Jupyter Notebook"],
  },
  Marketing: {
    learn: [
      "Plan and execute a digital marketing strategy",
      "Understand audience targeting and campaign analytics",
      "Grow a brand's presence across channels",
      "Measure ROI on marketing efforts",
    ],
    skills: ["Digital Marketing", "SEO", "Social Media Strategy", "Content Planning", "Analytics"],
    tools: ["Google Analytics", "Meta Business Suite"],
  },
};

function CourseDetails() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === Number(id));
  const { enrolledCourses, enrollCourse } = useApp();

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

  const isEnrolled = enrolledCourses.some((c) => c.id === course.id);
  const details = categoryDetails[course.category] || categoryDetails["Web Development"];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Header banner */}
      <div className="bg-[#EDF3FF] dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">{course.category}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {course.title}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4 max-w-xl">{course.description}</p>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-full bg-[#0056D2] text-white text-sm font-bold flex items-center justify-center">
              {course.instructor.charAt(0)}
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Instructor: <span className="font-medium text-gray-900 dark:text-white">{course.instructor}</span>
            </p>
          </div>

          {/* Enroll block */}
          <div className="w-full md:w-72">
            {isEnrolled ? (
              <Button variant="secondary" className="w-full" onClick={() => {}}>
                Already Enrolled
              </Button>
            ) : (
              <Button className="w-full" onClick={() => enrollCourse(course)}>
                Enroll for Free
              </Button>
            )}
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-6">
              <span className="font-semibold">{course.students.toLocaleString()}</span> already enrolled
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Lifetime access · Certificate on completion
            </p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-wrap items-center gap-6 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800">
        <span className="flex items-center gap-1.5 font-semibold">
          {course.rating} <Star size={16} className="fill-yellow-400 text-yellow-400" />
          <span className="font-normal text-gray-500 dark:text-gray-400">
            ({course.students.toLocaleString()} reviews)
          </span>
        </span>
        <span className="flex items-center gap-1.5">
          <BarChart3 size={16} /> {course.level} level
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={16} /> {course.duration}
        </span>
      </div>

      {/* Everything stacked, Coursera-style */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* What you'll learn */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">What you'll learn</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 mb-14 bg-[#EDF3FF] dark:bg-gray-800/50 rounded-xl p-8">
          {details.learn.map((point, i) => (
            <div key={i} className="flex items-start gap-3">
              <Check size={18} className="text-gray-900 dark:text-white mt-0.5 shrink-0" />
              <p className="text-gray-700 dark:text-gray-300 text-sm">{point}</p>
            </div>
          ))}
        </div>

        {/* Skills you'll gain */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Skills you'll gain</h2>
        <div className="flex flex-wrap gap-2 mb-14">
          {details.skills.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 rounded-full bg-[#EDF3FF] dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Tools you'll learn */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Tools you'll learn</h2>
        <div className="flex flex-wrap gap-2 mb-14">
          {details.tools.map((tool) => (
            <span
              key={tool}
              className="px-4 py-2 rounded-full bg-[#EDF3FF] dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-medium"
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Details to know */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Details to know</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start gap-3">
            <Award size={22} className="text-[#0A66C2] mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">Shareable certificate</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Add to your LinkedIn profile</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar size={22} className="text-gray-700 dark:text-gray-300 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">Flexible schedule</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Learn at your own pace</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Globe size={22} className="text-gray-700 dark:text-gray-300 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">Taught in English</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Subtitles available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
