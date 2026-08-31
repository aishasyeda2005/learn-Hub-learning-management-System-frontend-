import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls the window to the top every time the route changes,
// since React Router keeps the scroll position by default.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
