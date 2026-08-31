function Button({ children, onClick, variant = "primary", type = "button", className = "" }) {
  const base = "px-5 py-2.5 rounded-full font-semibold text-sm transition disabled:opacity-50";
  const variants = {
    primary: "bg-[#0056D2] text-white hover:bg-[#003d99]",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100",
    outline: "border-2 border-[#0056D2] text-[#0056D2] hover:bg-blue-50 dark:hover:bg-gray-800",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button type={type} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

export default Button;
