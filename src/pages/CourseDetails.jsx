import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Star, Clock, BarChart3, Check, Award, Calendar, Globe, CheckCircle2, Circle, Plus, Minus } from "lucide-react";
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
    weeks: [
      {
        label: "Week 01",
        topics: [
          { title: "Course overview & what you'll build", duration: "00:05:30" },
          { title: "Setting up your development environment", duration: "00:08:15" },
          { title: "HTML & CSS refresher", duration: "00:12:40" },
        ],
      },
      {
        label: "Week 02",
        topics: [
          { title: "JavaScript fundamentals", duration: "00:15:20" },
          { title: "Working with the DOM", duration: "00:10:45" },
          { title: "Introduction to components", duration: "00:14:10" },
        ],
      },
      {
        label: "Week 03",
        topics: [
          { title: "Props and state in depth", duration: "00:13:00" },
          { title: "Handling events and forms", duration: "00:11:25" },
          { title: "Building your first mini project", duration: "00:18:50" },
        ],
      },
      {
        label: "Week 04",
        topics: [
          { title: "Routing between pages", duration: "00:09:40" },
          { title: "Fetching data from an API", duration: "00:12:15" },
          { title: "Debugging common errors", duration: "00:07:55" },
        ],
      },
      {
        label: "Week 05",
        topics: [
          { title: "Styling with Tailwind CSS", duration: "00:10:30" },
          { title: "Responsive design techniques", duration: "00:09:05" },
          { title: "Optimizing performance", duration: "00:08:20" },
        ],
      },
      {
        label: "Week 06",
        topics: [
          { title: "Deploying your project", duration: "00:07:10" },
          { title: "Version control with Git", duration: "00:06:45" },
          { title: "Final project & wrap-up", duration: "00:20:00" },
        ],
      },
    ],
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
    weeks: [
      {
        label: "Week 01",
        topics: [
          { title: "Design principles & fundamentals", duration: "00:06:20" },
          { title: "Setting up your Figma workspace", duration: "00:07:10" },
          { title: "Understanding your users", duration: "00:09:30" },
        ],
      },
      {
        label: "Week 02",
        topics: [
          { title: "Wireframing a layout", duration: "00:11:45" },
          { title: "Working with grids & spacing", duration: "00:08:15" },
          { title: "Building reusable components", duration: "00:12:00" },
        ],
      },
      {
        label: "Week 03",
        topics: [
          { title: "Color theory basics", duration: "00:07:50" },
          { title: "Typography fundamentals", duration: "00:08:40" },
          { title: "Applying a visual style", duration: "00:10:20" },
        ],
      },
      {
        label: "Week 04",
        topics: [
          { title: "Building an interactive prototype", duration: "00:14:30" },
          { title: "Micro-interactions & animation", duration: "00:09:10" },
          { title: "Usability testing basics", duration: "00:08:00" },
        ],
      },
      {
        label: "Week 05",
        topics: [
          { title: "Creating a design system", duration: "00:12:10" },
          { title: "Handoff to developers", duration: "00:06:30" },
          { title: "Common design mistakes to avoid", duration: "00:07:20" },
        ],
      },
      {
        label: "Week 06",
        topics: [
          { title: "Building your portfolio piece", duration: "00:15:00" },
          { title: "Presenting your design decisions", duration: "00:09:45" },
          { title: "Final review and next steps", duration: "00:06:15" },
        ],
      },
    ],
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
    weeks: [
      {
        label: "Week 01",
        topics: [
          { title: "Course overview & tools setup", duration: "00:06:00" },
          { title: "Introduction to the dataset", duration: "00:08:30" },
          { title: "Python basics refresher", duration: "00:14:20" },
        ],
      },
      {
        label: "Week 02",
        topics: [
          { title: "Cleaning and preparing data", duration: "00:13:10" },
          { title: "Handling missing values", duration: "00:09:15" },
          { title: "Working with Pandas DataFrames", duration: "00:12:45" },
        ],
      },
      {
        label: "Week 03",
        topics: [
          { title: "Exploratory data analysis", duration: "00:15:40" },
          { title: "Descriptive statistics", duration: "00:10:20" },
          { title: "Identifying patterns & outliers", duration: "00:08:55" },
        ],
      },
      {
        label: "Week 04",
        topics: [
          { title: "Data visualization techniques", duration: "00:12:30" },
          { title: "Building charts & dashboards", duration: "00:11:05" },
          { title: "Choosing the right chart type", duration: "00:07:40" },
        ],
      },
      {
        label: "Week 05",
        topics: [
          { title: "Intro to predictive modeling", duration: "00:16:15" },
          { title: "Evaluating model results", duration: "00:10:50" },
          { title: "Common pitfalls in analysis", duration: "00:08:10" },
        ],
      },
      {
        label: "Week 06",
        topics: [
          { title: "Drawing conclusions from results", duration: "00:09:20" },
          { title: "Presenting your findings", duration: "00:08:05" },
          { title: "Final project and review", duration: "00:18:00" },
        ],
      },
    ],
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
    weeks: [
      {
        label: "Week 01",
        topics: [
          { title: "Digital marketing fundamentals", duration: "00:05:45" },
          { title: "Understanding your audience", duration: "00:08:10" },
          { title: "Setting campaign goals", duration: "00:06:30" },
        ],
      },
      {
        label: "Week 02",
        topics: [
          { title: "Content planning & strategy", duration: "00:10:20" },
          { title: "Writing for different channels", duration: "00:09:00" },
          { title: "Building a content calendar", duration: "00:07:15" },
        ],
      },
      {
        label: "Week 03",
        topics: [
          { title: "SEO basics", duration: "00:12:40" },
          { title: "Keyword research", duration: "00:09:50" },
          { title: "On-page optimization", duration: "00:08:25" },
        ],
      },
      {
        label: "Week 04",
        topics: [
          { title: "Running a sample campaign", duration: "00:14:10" },
          { title: "Social media ad basics", duration: "00:10:05" },
          { title: "Budgeting and bidding", duration: "00:07:50" },
        ],
      },
      {
        label: "Week 05",
        topics: [
          { title: "Reading analytics & reports", duration: "00:11:30" },
          { title: "Key metrics to track", duration: "00:08:20" },
          { title: "A/B testing basics", duration: "00:07:00" },
        ],
      },
      {
        label: "Week 06",
        topics: [
          { title: "Building a marketing plan", duration: "00:13:15" },
          { title: "Case study review", duration: "00:09:40" },
          { title: "Final review and next steps", duration: "00:06:20" },
        ],
      },
    ],
  },
};

function CourseDetails() {
  const { id } = useParams();
  const [openWeek, setOpenWeek] = useState(null);
  const course = courses.find((c) => c.id === Number(id));
  const { enrolledCourses, enrollCourse, completedLessons, toggleLesson, progress } = useApp();

  const details = course
    ? categoryDetails[course.category] || categoryDetails["Web Development"]
    : null;

  // On page load (or when switching to a different course), auto-open the
  // first week that isn't fully completed yet — or the last week if
  // everything is already done. Must run before any early return so hook
  // order stays consistent across renders.
  useEffect(() => {
    if (!course || !details) return;
    const doneArr = completedLessons[course.id] || [];
    let target = details.weeks.length - 1;
    let offset = 0;
    for (let w = 0; w < details.weeks.length; w++) {
      const weekTopics = details.weeks[w].topics.length;
      const weekDoneCount = doneArr.slice(offset, offset + weekTopics).filter(Boolean).length;
      if (weekDoneCount < weekTopics) {
        target = w;
        break;
      }
      offset += weekTopics;
    }
    setOpenWeek(target);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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

  // Flatten weeks into a running offset so each topic has one global index
  // (shared with completedLessons/toggleLesson, which just work with a flat array).
  const topicOffsets = [];
  let runningTotal = 0;
  details.weeks.forEach((week) => {
    topicOffsets.push(runningTotal);
    runningTotal += week.topics.length;
  });
  const totalTopics = runningTotal;

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
        {/* Course Content - lesson tracking */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Course Content</h2>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {progress[course.id] || 0}% complete
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6">
            <div
              className="bg-[#0056D2] h-2 rounded-full transition-all"
              style={{ width: `${progress[course.id] || 0}%` }}
            />
          </div>

          {!isEnrolled && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Enroll in this course to start tracking your lesson progress.
            </p>
          )}

          <div className="flex flex-col gap-3">
            {details.weeks.map((week, weekIndex) => {
              const startIndex = topicOffsets[weekIndex];
              const doneArr = completedLessons[course.id] || [];
              const weekDoneCount = week.topics.filter(
                (_, t) => doneArr[startIndex + t]
              ).length;
              const isWeekDone = weekDoneCount === week.topics.length;
              const isOpen = openWeek === weekIndex;

              return (
                <div key={week.label} className="rounded-md overflow-hidden">
                  {/* Week header bar */}
                  <button
                    onClick={() => setOpenWeek(isOpen ? null : weekIndex)}
                    className={`w-full flex items-center gap-3 px-5 py-3 text-white font-semibold text-sm transition ${
                      isWeekDone ? "bg-green-600 hover:bg-green-700" : "bg-gray-500 hover:bg-gray-600"
                    }`}
                  >
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    {week.label}
                    <span className="ml-auto text-xs font-normal opacity-90">
                      {weekDoneCount}/{week.topics.length} completed
                    </span>
                  </button>

                  {/* Expanded content */}
                  {isOpen && (
                    <div>
                      <div className="grid grid-cols-[1fr_auto_auto_auto] bg-[#4a86c8] text-white text-xs font-semibold px-5 py-2.5 uppercase tracking-wide">
                        <span>Topic</span>
                        <span className="w-32 text-center">Completion</span>
                        <span className="w-24 text-center">Duration</span>
                        <span className="w-28 text-center">Ref. Material</span>
                      </div>
                      {week.topics.map((topic, t) => {
                        const globalIndex = startIndex + t;
                        const isDone = completedLessons[course.id]?.[globalIndex] || false;
                        return (
                          <button
                            key={topic.title}
                            disabled={!isEnrolled}
                            onClick={() =>
                              toggleLesson(course.id, globalIndex, totalTopics)
                            }
                            className="w-full grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 px-5 py-4 bg-white dark:bg-gray-800 border border-t-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60 text-left transition"
                          >
                            <span
                              className={`text-sm ${
                                isDone
                                  ? "text-gray-400 dark:text-gray-500 line-through"
                                  : "text-gray-800 dark:text-gray-200"
                              }`}
                            >
                              {t + 1} - {topic.title}
                            </span>
                            <span className="w-32 flex justify-center">
                              {isDone ? (
                                <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                              ) : (
                                <Circle size={20} className="text-gray-300 dark:text-gray-600 shrink-0" />
                              )}
                            </span>
                            <span className="w-24 text-center text-xs text-gray-500 dark:text-gray-400">
                              {topic.duration}
                            </span>
                            <span className="w-28 text-center text-xs text-gray-400 dark:text-gray-500">
                              N/A
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

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
