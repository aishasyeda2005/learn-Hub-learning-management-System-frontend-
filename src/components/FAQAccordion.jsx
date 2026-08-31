import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Can I try a course first, to make sure it's right for me?",
    a: "Yes! Every course page shows the full curriculum, instructor, and reviews before you enroll, so you know exactly what you're signing up for.",
  },
  {
    q: "What's included when I enroll in a course?",
    a: "You get lifetime access to the course content, a certificate on completion, and the ability to learn at your own pace.",
  },
  {
    q: "Will I save money with learnhub Plus?",
    a: "If you plan to take more than 2-3 courses, learnhub Plus usually works out cheaper than paying per course, since it includes unlimited access.",
  },
  {
    q: "Do I need any prior experience to start?",
    a: "No. Most of our courses are beginner-friendly, and each course page clearly shows the required skill level before you enroll.",
  },
  {
    q: "Can I get a refund if I'm not satisfied?",
    a: "Yes, we offer a refund within 7 days of enrollment if you haven't completed more than 20% of the course.",
  },
  {
    q: "Is the certificate recognized by employers?",
    a: "Our certificates are shareable on LinkedIn and showcase the skills and tools you learned, helping strengthen your professional profile.",
  },
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 3);

  function toggle(index) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Frequently asked questions
      </h2>

      <div className="border border-gray-200 dark:border-gray-700 rounded-xl divide-y divide-gray-200 dark:divide-gray-700">
        {visibleFaqs.map((faq, index) => (
          <div key={faq.q} className="px-6">
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-semibold text-gray-900 dark:text-white">{faq.q}</span>
              <ChevronDown
                size={20}
                className={`text-gray-500 dark:text-gray-400 shrink-0 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <p className="text-sm text-gray-600 dark:text-gray-300 pb-5 pr-8">{faq.a}</p>
            )}
          </div>
        ))}

        {!showAll && (
          <div className="py-5 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="font-semibold text-gray-900 dark:text-white flex items-center justify-center gap-2 mx-auto"
            >
              Show all {faqs.length} frequently asked questions
              <ChevronDown size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default FAQAccordion;
