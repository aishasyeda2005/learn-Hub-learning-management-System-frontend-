# LearnHub — Setup Instructions

## 1. In your existing "learnhub" Vite project folder, install these packages:

npm install react-router-dom lucide-react

(react-router-dom = routing between pages, lucide-react = icons used in the components)

## 2. Copy these files into your project

Replace/create these files with the exact same folder paths:

- src/data/courses.js
- src/context/AppContext.jsx
- src/components/Navbar.jsx
- src/components/Footer.jsx
- src/components/Button.jsx
- src/components/CourseCard.jsx
- src/components/CategoryCard.jsx
- src/components/ProgressCard.jsx
- src/components/Sidebar.jsx
- src/components/Toast.jsx
- src/pages/Home.jsx
- src/pages/Courses.jsx
- src/pages/CourseDetails.jsx
- src/pages/Dashboard.jsx
- src/pages/Profile.jsx
- src/pages/NotFound.jsx
- src/App.jsx        (replace existing)
- src/main.jsx        (replace existing)
- src/index.css        (replace existing)
- vite.config.js       (replace existing, only if Tailwind not already configured)

## 3. Run

npm run dev

Then open http://localhost:5173 in your browser.

## What's included

- Full routing: Home, Courses, Course Details, Dashboard, Profile, 404
- Search, category filter, level filter, and sorting on the Courses page
- Enrollment system with localStorage persistence
- Wishlist (heart icon on course cards)
- Progress bars on Dashboard
- Editable Profile form with validation, saved to localStorage
- Dark mode toggle (top right of navbar)
- Toast notifications for enroll/wishlist/profile actions
- Fully responsive (mobile nav menu included)
