import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Profile from "./pages/Profile";
import ExploreTopic from "./pages/ExploreTopic";
import Certificate from "./pages/Certificate";
import NotFound from "./pages/NotFound";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <ScrollToTop />
        <div className="print:hidden">
          <Navbar />
        </div>
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/explore/:topic" element={<ExploreTopic />} />
            <Route path="/certificate/:id" element={<Certificate />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <div className="print:hidden">
          <Footer />
        </div>
        <div className="print:hidden">
          <Toast />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
