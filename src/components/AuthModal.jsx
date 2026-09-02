import { X } from "lucide-react";
import { useState } from "react";

function AuthModal({ mode = "login", onClose }) {
  const [email, setEmail] = useState("");

  const isLogin = mode === "login";

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-xl max-w-md w-full p-8 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {isLogin ? "Log in" : "Join for Free"}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Learn on your own time from expert instructors.
        </p>

        <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          placeholder="name@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#0056D2]"
        />

        <button className="w-full bg-[#0056D2] hover:bg-[#003d99] text-white font-semibold py-3 rounded-full mb-6 transition">
          {isLogin ? "Continue" : "Sign up"}
        </button>

        <div className="border-t border-gray-200 dark:border-gray-700 mb-6" />

        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 rounded-lg py-3 font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <span className="text-lg font-bold text-[#4285F4]">G</span> Continue with Google
          </button>
          <button className="flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 rounded-lg py-3 font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <span className="text-lg font-bold text-[#1877F2]">f</span> Continue with Facebook
          </button>
          <button className="flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 rounded-lg py-3 font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            Continue with Apple
          </button>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
          By continuing, you agree to learnhub's Terms of Use and Privacy Notice.
        </p>
      </div>
    </div>
  );
}

export default AuthModal;
