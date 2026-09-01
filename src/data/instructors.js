import courses from "./courses";

const rawInstructors = [
  { name: "Ayesha Khan", image: "/instructors/ayesha-khan.jpg" },
  { name: "Hamza Ali", image: "/instructors/hamza-ali.jpg" },
  { name: "Sara Ahmed", image: "/instructors/sara-ahmed.jpg" },
  { name: "Bilal Raza", image: "/instructors/bilal-raza.jpg" },
  { name: "Zainab Malik", image: "/instructors/zainab-malik.jpg" },
];

// Derive stats (course count, avg rating, category) from courses.js automatically
const instructors = rawInstructors.map((instructor) => {
  const theirCourses = courses.filter((c) => c.instructor === instructor.name);
  const avgRating =
    theirCourses.reduce((sum, c) => sum + c.rating, 0) / (theirCourses.length || 1);
  const totalStudents = theirCourses.reduce((sum, c) => sum + c.students, 0);

  return {
    ...instructor,
    role: theirCourses[0]?.category || "Instructor",
    courseCount: theirCourses.length,
    rating: Math.round(avgRating * 10) / 10,
    students: totalStudents,
  };
});

export default instructors;
