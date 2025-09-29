import React, { useContext } from "react";
import { ThemeContext } from "../Them/ThemProvider";
import { motion } from "framer-motion";

const primaryColor = "#3b82f6";

const features = [
  {
    id: 1,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-14 md:h-14" fill="none" viewBox="0 0 24 24" stroke={primaryColor} strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l2.09 6.26L20 9.27l-5 3.63L16.18 20 12 16.9 7.82 20 9 12.9 4 9.27l5.91-.99L12 2z" />
      </svg>
    ),
    title: "Trusted Professionals",
    desc: "Experienced & vetted technicians — background checked and certified for safety.",
    bullets: ["Certified technicians", "Background-checked", "Licensed & insured"],
    badges: ["Certified", "Top Rated"],
  },
  {
    id: 2,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-14 md:h-14" fill="none" viewBox="0 0 24 24" stroke={primaryColor} strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M6 12h12M10 17h4" />
      </svg>
    ),
    title: "Transparent Pricing",
    desc: "Clear estimates with no hidden fees — you approve before we start.",
    bullets: ["Free estimates", "Itemized invoices", "No hidden fees"],
    badges: ["Upfront Price"],
  },
  {
    id: 3,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-14 md:h-14" fill="none" viewBox="0 0 24 24" stroke={primaryColor} strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Fast & Reliable",
    desc: "Same-day or next-day service options — we respect your time.",
    bullets: ["Same-day available", "Punctual technicians", "Satisfaction follow-up"],
    badges: ["24/7 Support", "Warranty"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const FeatureSection = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <section className={`${isDark ? "bg-black text-gray-100" : "bg-white text-gray-900"} py-20`}>
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">Why Customers Choose Us</h2>
          <p className={`mt-3 text-sm md:text-base ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Reliable services, transparent pricing and quick response — delivered by professionals.
          </p>
        </header>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-16"
        >
          {features.map((f, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <motion.article
                key={f.id}
                variants={itemVariants}
                aria-labelledby={`feature-${f.id}`}
              >
                <div className={`mx-auto flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""} items-center md:items-stretch gap-8 md:gap-12`}>
                  {/* icon */}
                  <div className="flex-shrink-0 flex items-center justify-center md:w-1/4">
                    <div
                      className={`w-24 h-24 md:w-28 md:h-28 flex items-center justify-center rounded-xl
                        ${isDark ? "bg-white/5 backdrop-blur-sm" : "bg-blue-50/80"}`}
                      style={{ border: `1px solid ${primaryColor}22` }}
                    >
                      {f.icon}
                    </div>
                  </div>

                  {/* content */}
                  <div className="md:w-3/4">
                    <div
                      className={`p-6 md:p-8 rounded-2xl shadow-lg transition-transform hover:-translate-y-1 hover:shadow-2xl
                        ${isDark ? "bg-gray-900/60" : "bg-white/95"}`}
                      style={{ minHeight: 140, backdropFilter: "blur(6px)" }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 id={`feature-${f.id}`} className="text-lg md:text-xl font-semibold" style={{ color: primaryColor }}>
                            {f.title}
                          </h3>
                          <p className={`mt-2 text-sm md:text-base ${isDark ? "text-gray-300" : "text-gray-700"}`}>{f.desc}</p>

                          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-400 md:text-sm">
                            {f.bullets.map((b, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <span style={{ color: primaryColor }} className="flex-shrink-0">●</span>
                                <span className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {/* badges */}
                        <div className="flex flex-col items-end gap-2">
                          {f.badges.map((badge, i) => (
                            <span
                              key={i}
                              className={`text-xs font-medium px-3 py-1 rounded-full ${isDark ? "bg-white/6 text-white" : "bg-blue-50 text-blue-700"}`}
                              style={{ border: `1px solid ${primaryColor}22` }}
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;
