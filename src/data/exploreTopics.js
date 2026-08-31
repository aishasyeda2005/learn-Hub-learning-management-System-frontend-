// Content shown on the /explore/:topic pages, keyed by the exact link text
// used in ExploreMenu. category maps to a courses.js category so we can
// show relevant courses; entries without a match fall back to all courses.

const exploreTopics = {
  // Roles
  "Frontend Developer": {
    description:
      "If you enjoy building the visual, interactive parts of websites and apps, this role is for you. Frontend developers turn designs into working interfaces using HTML, CSS, and JavaScript frameworks like React.",
    skills: ["HTML & CSS", "JavaScript", "React", "Responsive Design", "Git & GitHub"],
    category: "Web Development",
  },
  "Backend Developer": {
    description:
      "Backend developers build the server, database, and logic that power an application behind the scenes. They focus on APIs, data storage, and making sure everything runs reliably.",
    skills: ["Node.js", "APIs", "Databases", "Server Logic", "Git & GitHub"],
    category: "Web Development",
  },
  "Full Stack Developer": {
    description:
      "Full stack developers work across both the frontend and backend, building complete features from the user interface down to the database.",
    skills: ["JavaScript", "React", "Node.js", "Databases", "Git & GitHub"],
    category: "Web Development",
  },
  "UI/UX Designer": {
    description:
      "If you like crafting intuitive, visually appealing digital experiences, this role is for you. UI/UX designers research user needs and design interfaces that are both usable and beautiful.",
    skills: ["Figma", "Wireframing", "Prototyping", "User Research", "Visual Design"],
    category: "Design",
  },
  "Data Analyst": {
    description:
      "If you like analyzing data to find insights, creating reports and visualizations, this role is for you. Data analysts collect, clean, and interpret data to help teams make informed decisions.",
    skills: ["Data Analysis", "Statistics", "Data Visualization", "Python", "Problem Solving"],
    category: "Data Science",
  },
  "Data Scientist": {
    description:
      "Data scientists go a step further than analysts — building predictive models and using statistics and machine learning to uncover deeper patterns in data.",
    skills: ["Python", "Statistics", "Machine Learning", "Data Visualization", "Probability"],
    category: "Data Science",
  },
  "Digital Marketer": {
    description:
      "Digital marketers plan and run campaigns across search, social, and email to grow a brand's audience and drive measurable results.",
    skills: ["SEO", "Social Media Strategy", "Content Planning", "Analytics", "Campaign Planning"],
    category: "Marketing",
  },
  "Software Tester": {
    description:
      "Software testers make sure applications work as expected before they reach users — writing test cases, finding bugs, and verifying fixes.",
    skills: ["Manual Testing", "Debugging", "Test Case Writing", "Attention to Detail"],
    category: "Web Development",
  },
  "Machine Learning Engineer": {
    description:
      "Machine learning engineers design and deploy models that let software learn from data, powering features like recommendations and predictions.",
    skills: ["Python", "Machine Learning", "Statistics", "Data Structures"],
    category: "Data Science",
  },
  "Product Manager": {
    description:
      "Product managers guide a product's direction — working with design, engineering, and marketing teams to decide what gets built and why.",
    skills: ["Prioritization", "Communication", "Market Research", "Analytics"],
    category: "Marketing",
  },

  // Categories
  "Web Development": {
    description:
      "Learn to build websites and web applications — from writing your first HTML page to building full interactive apps with modern frameworks.",
    skills: ["HTML & CSS", "JavaScript", "React", "Git & GitHub", "APIs"],
    category: "Web Development",
  },
  Design: {
    description:
      "Learn the principles and tools behind great design — from wireframes and prototypes to full visual design systems.",
    skills: ["Figma", "Typography", "Color Theory", "Prototyping"],
    category: "Design",
  },
  "Data Science": {
    description:
      "Learn to work with data — analyzing, visualizing, and building models that turn raw numbers into useful insights.",
    skills: ["Python", "Statistics", "Data Visualization", "Machine Learning"],
    category: "Data Science",
  },
  Marketing: {
    description:
      "Learn how to plan campaigns, grow an audience, and measure results across digital channels.",
    skills: ["SEO", "Social Media Strategy", "Content Planning", "Analytics"],
    category: "Marketing",
  },

  // Levels
  Beginner: {
    description: "Courses designed for learners with no prior experience — a great place to start.",
    skills: [],
    category: null,
    levelFilter: "Beginner",
  },
  Intermediate: {
    description: "Courses for learners who already know the basics and want to go further.",
    skills: [],
    category: null,
    levelFilter: "Intermediate",
  },
  Advanced: {
    description: "Courses for experienced learners ready to tackle harder, real-world problems.",
    skills: [],
    category: null,
    levelFilter: "Advanced",
  },

  // Trending skills
  React: {
    description:
      "React is the most widely used JavaScript library for building user interfaces, powering everything from small widgets to entire applications.",
    skills: ["JavaScript", "Components", "State Management", "Hooks"],
    category: "Web Development",
  },
  JavaScript: {
    description:
      "JavaScript is the programming language of the web, used to add interactivity to websites and build full applications on both frontend and backend.",
    skills: ["Variables & Functions", "DOM Manipulation", "Async/Await", "ES6+"],
    category: "Web Development",
  },
  Python: {
    description:
      "Python is a beginner-friendly, versatile language widely used in data science, automation, and backend development.",
    skills: ["Syntax Basics", "Data Structures", "Libraries", "Automation"],
    category: "Data Science",
  },
  Figma: {
    description:
      "Figma is the industry-standard design tool for creating wireframes, prototypes, and polished UI designs collaboratively.",
    skills: ["Wireframing", "Components", "Prototyping", "Design Systems"],
    category: "Design",
  },
  SEO: {
    description:
      "Search Engine Optimization (SEO) helps content rank higher in search results, driving organic traffic to a website or business.",
    skills: ["Keyword Research", "On-page SEO", "Link Building", "Analytics"],
    category: "Marketing",
  },
  "Git & GitHub": {
    description:
      "Git and GitHub are the standard tools developers use to track code changes and collaborate on projects.",
    skills: ["Version Control", "Branching", "Pull Requests", "Collaboration"],
    category: "Web Development",
  },
};

export function getTopicDetails(topic) {
  if (exploreTopics[topic]) {
    return exploreTopics[topic];
  }
  // Fallback for any link not explicitly defined above
  return {
    description: `Explore courses and resources related to ${topic}.`,
    skills: [],
    category: null,
  };
}

export default exploreTopics;
