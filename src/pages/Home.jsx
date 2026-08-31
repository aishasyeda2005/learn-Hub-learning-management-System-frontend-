import { useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import courses from "../data/courses";
import CourseCard from "../components/CourseCard";
import FAQAccordion from "../components/FAQAccordion";
import PromoCarousel from "../components/PromoCarousel";

const categoryPills = ["All", "Web Development", "Design", "Data Science", "Marketing"];

const instructorLogos = ["Ayesha Khan", "Hamza Ali", "Sara Ahmed", "Bilal Raza", "Zainab Malik"];

const testimonials = [
  {
    name: "Fatima N.",
    quote:
      "I have a full-time job and a busy schedule. learnhub's flexibility let me study whenever I had time to spare.",
  },
  {
    name: "Ali R.",
    quote:
      "Every course felt practical and hands-on. I built real projects instead of just watching videos.",
  },
  {
    name: "Mehak S.",
    quote:
      "The instructors explain things clearly and the platform is simple to use. It kept me motivated to finish.",
  },
];

const pricingPlans = [
  {
    name: "Single Course",
    description: "Learn one skill and earn a certificate.",
    price: "$19",
    period: "/course",
    note: "One-time payment per course",
    cta: "Browse Courses",
    highlight: false,
    features: [
      "Access to a single course",
      "Certificate upon completion",
      "Lifetime access to that course",
    ],
  },
  {
    name: "learnhub Plus",
    description: "Unlimited access to every course on the platform.",
    price: "$15",
    period: "/month",
    note: "Cancel anytime",
    cta: "Get Plus",
    highlight: true,
    features: [
      "Unlimited access to all courses",
      "Unlimited certificates",
      "New courses added regularly",
      "Priority support",
    ],
  },
  {
    name: "learnhub for Teams",
    description: "Upskill your whole team in one place.",
    price: "$199",
    period: "/year per user",
    note: "Minimum 5 seats",
    cta: "Contact Sales",
    highlight: false,
    features: [
      "Everything in learnhub Plus",
      "Team progress tracking",
      "Centralized billing",
    ],
  },
];

function Home() {
  const [activePill, setActivePill] = useState("All");

  const filtered =
    activePill === "All" ? courses : courses.filter((c) => c.category === activePill);

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Promo banners - Coursera style gradient cards */}
      <section className="max-w-7xl mx-auto px-6 pt-8">
        <PromoCarousel />
      </section>

      {/* Category pills */}
      <section className="max-w-7xl mx-auto px-6 pt-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">New and popular</h2>
        <div className="flex gap-2 flex-wrap mb-6">
          {categoryPills.map((pill) => (
            <button
              key={pill}
              onClick={() => setActivePill(pill)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                activePill === pill
                  ? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
              }`}
            >
              {pill}
            </button>
          ))}
        </div>
      </section>

      {/* Course grid in shaded panel - Coursera "Most popular" style */}
      <section className="max-w-7xl mx-auto px-6 pb-10">
        <div className="bg-[#EDF3FF] dark:bg-gray-800/50 rounded-xl p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.slice(0, 8).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Trusted instructors strip */}
      <section className="max-w-7xl mx-auto px-6 py-10 border-t border-gray-100 dark:border-gray-800">
        <h3 className="text-center text-gray-600 dark:text-gray-400 text-sm font-medium mb-6">
          Learn from experienced instructors across every field
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          {instructorLogos.map((name) => (
            <span
              key={name}
              className="px-5 py-2.5 rounded-full border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2"
            >
              <span className="w-5 h-5 rounded-full bg-[#0056D2] text-white text-[10px] font-bold flex items-center justify-center">
                {name.charAt(0)}
              </span>
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Is learnhub worth it? Hear from our students
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-[#0056D2] text-white font-bold flex items-center justify-center">
                  {t.name.charAt(0)}
                </div>
                <p className="font-semibold text-gray-900 dark:text-white">{t.name}</p>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">"{t.quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing plans */}
      <section className="bg-[#EDF3FF] dark:bg-gray-800/50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            Find the right plan for your goals
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
            Learn without limits, at a price that works for you.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white dark:bg-gray-900 rounded-xl border overflow-hidden ${
                  plan.highlight
                    ? "border-[#0056D2] shadow-lg md:-mt-4"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                {plan.highlight && (
                  <div className="bg-[#0056D2] text-white text-center text-xs font-bold py-2 uppercase tracking-wide">
                    Best value
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{plan.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 min-h-[40px]">
                    {plan.description}
                  </p>

                  <p className="mb-1">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{plan.period}</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">{plan.note}</p>

                  <Link to="/courses">
                    <button
                      className={`w-full py-2.5 rounded-full font-semibold text-sm transition ${
                        plan.highlight
                          ? "bg-[#0056D2] text-white hover:bg-[#003d99]"
                          : "border-2 border-[#0056D2] text-[#0056D2] hover:bg-blue-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </Link>

                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-3">
                    Key features:
                  </p>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Check size={16} className="text-gray-900 dark:text-white mt-0.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQAccordion />

      {/* Get job-ready banner */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="rounded-xl bg-gradient-to-r from-blue-100 via-cyan-50 to-green-100 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Get job-ready for an in-demand career
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Unlimited access to all courses on learnhub.
            </p>
          </div>
          <Link
            to="/courses"
            className="bg-white border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-semibold text-sm px-6 py-2.5 rounded-full whitespace-nowrap hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Start Learning
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
