function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16 print:hidden">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white text-xl font-bold mb-2">LearnHub</h3>
          <p className="text-sm text-gray-400">
            Learn new skills online with expert-led courses, anytime, anywhere.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>Home</li>
            <li>Courses</li>
            <li>Profile</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Categories</h4>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>Web Development</li>
            <li>Design</li>
            <li>Data Science</li>
            <li>Marketing</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Contact</h4>
          <p className="text-sm text-gray-400">support@learnhub.com</p>
          <p className="text-sm text-gray-400">+92 300 1234567</p>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center text-sm text-gray-500 py-4">
        © 2026 LearnHub. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
