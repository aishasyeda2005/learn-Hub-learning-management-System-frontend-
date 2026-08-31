function CategoryCard({ name, count, icon: Icon }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition border border-gray-100 dark:border-gray-700 cursor-pointer">
      <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400">
        {Icon && <Icon size={22} />}
      </div>
      <h4 className="font-semibold text-gray-900 dark:text-white">{name}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">{count} courses</p>
    </div>
  );
}

export default CategoryCard;
