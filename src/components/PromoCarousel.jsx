import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    gradient: "from-[#0056D2] to-[#00308F]",
    title: "Learn Without Limits",
    text: "Start, switch, or advance your career with courses from expert instructors.",
    cta: "Browse Courses",
    to: "/courses",
    ctaColor: "text-[#0056D2]",
  },
  {
    gradient: "from-purple-600 to-pink-500",
    title: "Track Your Progress",
    text: "Enroll in courses, follow your learning journey, and earn certificates.",
    cta: "View My Profile",
    to: "/profile",
    ctaColor: "text-purple-700",
  },
  {
    gradient: "from-emerald-600 to-teal-500",
    title: "Learn At Your Own Pace",
    text: "Lifetime access to every course you enroll in — learn whenever it suits you.",
    cta: "Get Started",
    to: "/courses",
    ctaColor: "text-emerald-700",
  },
];

function PromoCarousel() {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll to a given card index
  function goTo(index) {
    const track = trackRef.current;
    if (!track) return;
    const clamped = (index + slides.length) % slides.length;
    const card = track.children[clamped];
    if (card) {
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
    }
  }

  // Keep dots in sync with manual scroll/swipe
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function handleScroll() {
      let closestIndex = 0;
      let closestDistance = Infinity;
      Array.from(track.children).forEach((card, i) => {
        const distance = Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });
      setActiveIndex(closestIndex);
    }

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Scrollable track - two cards visible, next one peeks at the edge */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {slides.map((slide) => (
          <div
            key={slide.title}
            className="snap-start shrink-0 basis-[88%] sm:basis-[48%]"
          >
            <div
              className={`rounded-xl bg-gradient-to-br ${slide.gradient} text-white p-8 md:p-10 flex flex-col justify-center min-h-[220px]`}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">{slide.title}</h2>
              <p className="text-white/90 text-sm mb-5 max-w-sm">{slide.text}</p>
              <Link
                to={slide.to}
                className={`bg-white ${slide.ctaColor} font-semibold text-sm px-5 py-2.5 rounded-full w-fit hover:opacity-90 transition`}
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Arrow buttons */}
      <button
        onClick={() => goTo(activeIndex - 1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-1.5 shadow-md transition z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => goTo(activeIndex + 1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-1.5 shadow-md transition z-10"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((slide, i) => (
          <button
            key={slide.title}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === activeIndex ? "w-6 bg-gray-900 dark:bg-white" : "w-2 bg-gray-300 dark:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default PromoCarousel;
