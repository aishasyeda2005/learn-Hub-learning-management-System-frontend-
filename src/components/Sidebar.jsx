import { NavLink } from "react-router-dom";
import { User, BookOpen } from "lucide-react";

function Sidebar() {
  const links = [
    { to: "/profile", label: "Profile", icon: User },
    { to: "/courses", label: "Browse Courses", icon: BookOpen },
  ];

  return (
    <aside className="w-full md:w-56 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 h-fit">
      <nav className="flex md:flex-col gap-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
