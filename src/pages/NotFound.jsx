import { Link } from "react-router-dom";
import Button from "../components/Button";

function NotFound() {
  return (
    <div className="text-center py-32 px-6">
      <h1 className="text-7xl font-bold text-blue-600 dark:text-blue-400 mb-4">404</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}

export default NotFound;
