import { Link } from "react-router-dom";

const columns = [
  {
    title: "Explore roles",
    links: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "UI/UX Designer",
      "Data Analyst",
      "Data Scientist",
      "Digital Marketer",
      "Software Tester",
      "Machine Learning Engineer",
      "Product Manager",
    ],
  },
  {
    title: "Explore categories",
    links: ["Web Development", "Design", "Data Science", "Marketing"],
  },
  {
    title: "Earn a Certificate",
    links: ["Web Development", "Data Science", "Design", "Marketing"],
    extraTitle: "Explore by level",
    extraLinks: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    title: "Explore trending skills",
    links: ["React", "JavaScript", "Python", "Figma", "SEO", "Git & GitHub"],
  },
];

function ExploreMenu({ onClose }) {
  return (
    <div
      className="absolute left-0 top-full w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg z-40"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">{col.title}</h3>
            <ul className="flex flex-col gap-2 mb-4">
              {col.links.map((link) => (
                <li key={link}>
                  <Link
                    to={`/explore/${encodeURIComponent(link)}`}
                    onClick={onClose}
                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-[#0056D2] dark:hover:text-blue-400"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>

            {col.extraTitle && (
              <>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">{col.extraTitle}</h3>
                <ul className="flex flex-col gap-2 mb-4">
                  {col.extraLinks.map((link) => (
                    <li key={link}>
                      <Link
                        to={`/explore/${encodeURIComponent(link)}`}
                        onClick={onClose}
                        className="text-sm text-gray-600 dark:text-gray-300 hover:text-[#0056D2] dark:hover:text-blue-400"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <Link
              to="/courses"
              onClick={onClose}
              className="text-sm font-semibold text-gray-900 dark:text-white underline"
            >
              View all
            </Link>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-5 text-sm text-gray-700 dark:text-gray-300">
          Not sure where to begin?{" "}
          <Link
            to="/courses"
            onClick={onClose}
            className="font-semibold text-[#0056D2] dark:text-blue-400 underline"
          >
            Browse free courses
          </Link>{" "}
          or{" "}
          <Link
            to="/courses"
            onClick={onClose}
            className="font-semibold text-[#0056D2] dark:text-blue-400 underline"
          >
            Learn more about learnhub Plus
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ExploreMenu;
