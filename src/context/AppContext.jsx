import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  // Enrolled courses - persisted in localStorage
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const saved = localStorage.getItem("enrolledCourses");
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist - persisted in localStorage
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Progress per course id: { courseId: percentage }
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem("progress");
    return saved ? JSON.parse(saved) : {};
  });

  // Completed lessons per course: { courseId: [true, false, true, ...] }
  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem("completedLessons");
    return saved ? JSON.parse(saved) : {};
  });

  // Profile info - persisted in localStorage
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("profile");
    return saved
      ? JSON.parse(saved)
      : {
          fullName: "Syeda Aisha",
          photo: "",
          banner: "",          
          email: "aisha@example.com",
          university: "Your University",
          department: "Computer Science",
          semester: "5th",
          bio: "Learning web development and building projects.",
        };
  });

  // Dark mode - persisted in localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Toast notification
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("progress", JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  function enrollCourse(course) {
    if (enrolledCourses.find((c) => c.id === course.id)) {
      showToast("Already enrolled in this course", "error");
      return;
    }
    setEnrolledCourses((prev) => [...prev, course]);
    setProgress((prev) => ({ ...prev, [course.id]: 0 }));
    showToast(`Enrolled in "${course.title}"`);
  }

  function removeCourse(courseId) {
    setEnrolledCourses((prev) => prev.filter((c) => c.id !== courseId));
    showToast("Course removed from your list", "error");
  }

  function toggleWishlist(course) {
    setWishlist((prev) => {
      const exists = prev.find((c) => c.id === course.id);
      if (exists) {
        showToast("Removed from wishlist");
        return prev.filter((c) => c.id !== course.id);
      }
      showToast("Added to wishlist");
      return [...prev, course];
    });
  }

  function updateProgress(courseId, percentage) {
    setProgress((prev) => ({ ...prev, [courseId]: percentage }));
  }

  // Toggle a single lesson's completed state for a course, and
  // automatically recalculate that course's overall progress %.
  function toggleLesson(courseId, lessonIndex, totalLessons) {
    setCompletedLessons((prev) => {
      const current = prev[courseId] || Array(totalLessons).fill(false);
      const updated = [...current];
      updated[lessonIndex] = !updated[lessonIndex];

      const completedCount = updated.filter(Boolean).length;
      const percentage = Math.round((completedCount / totalLessons) * 100);
      setProgress((p) => ({ ...p, [courseId]: percentage }));

      if (updated[lessonIndex]) {
        showToast("Lesson marked as complete");
      }

      return { ...prev, [courseId]: updated };
    });
  }

  return (
    <AppContext.Provider
      value={{
        enrolledCourses,
        wishlist,
        progress,
        completedLessons,
        profile,
        darkMode,
        toast,
        setProfile,
        setDarkMode,
        enrollCourse,
        removeCourse,
        toggleWishlist,
        updateProgress,
        toggleLesson,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
