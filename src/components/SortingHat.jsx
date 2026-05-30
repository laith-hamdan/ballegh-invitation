import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// The four Hogwarts houses, with a warm, light-hearted description of each
// house's character — written for the invited guests, not techies.
const HOUSES = [
  {
    name: "غريفندور",
    en: "GRYFFINDOR",
    emoji: "🦁",
    color: "#b91c1c",
    verdict:
      "بيت الشجعان! أصحاب القلوب الجريئة الذين لا يخافون خوض أصعب المعارك. أنت من معدنٍ نادر.",
  },
  {
    name: "سليذرين",
    en: "SLYTHERIN",
    emoji: "🐍",
    color: "#15803d",
    verdict:
      "بيت الطموحين! أصحاب الذكاء والإصرار الذين يصنعون طريقهم بثقةٍ نحو القمة. مستقبلك لامع.",
  },
  {
    name: "رافنكلو",
    en: "RAVENCLAW",
    emoji: "🦅",
    color: "#1d4ed8",
    verdict:
      "بيت الحكماء! أصحاب العقول المتّقدة وحبّ المعرفة والفضول الذي لا يهدأ. حكمتك تسبق سنواتك.",
  },
  {
    name: "هافلباف",
    en: "HUFFLEPUFF",
    emoji: "🦡",
    color: "#ca8a04",
    verdict:
      "بيت الأوفياء! أصحاب القلوب الطيّبة والصبر والإخلاص في كل ما يفعلون. وجودك نعمةٌ على من حولك.",
  },
];

export default function SortingHat() {
  const [status, setStatus] = useState("idle"); // idle | sorting | done
  const [house, setHouse] = useState(null);

  const sortMe = () => {
    if (status === "sorting") return;
    setStatus("sorting");
    setHouse(null);
    // dramatic "thinking" pause before the hat decides
    setTimeout(() => {
      const pick = HOUSES[Math.floor(Math.random() * HOUSES.length)];
      setHouse(pick);
      setStatus("done");
    }, 1900);
  };

  return (
    <section id="sorting" className="relative pt-2 sm:pt-4 pb-20 sm:pb-24 px-5">
      <div className="relative z-10 max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <span
            className="font-cinzel text-[10px] sm:text-xs tracking-[0.4em] text-magic-gold/70"
            style={{ direction: "ltr" }}
          >
            THE&nbsp;SORTING&nbsp;HAT
          </span>
          <h2 className="section-title mt-3 text-3xl sm:text-4xl gold-text">
            قبعة الفرز
          </h2>
          <p className="mt-4 font-cairo text-magic-parchment/70 text-sm sm:text-base">
            اضغط على القبعة لتكتشف لأي بيتٍ تنتمي قبل أن تدخل القاعة الكبرى.
          </p>
        </motion.div>

        {/* the hat */}
        <motion.button
          onClick={sortMe}
          whileTap={{ scale: 0.93 }}
          className="relative mt-10 mx-auto block focus:outline-none"
          aria-label="افرزني"
        >
          <motion.div
            animate={
              status === "sorting"
                ? { rotate: [-8, 8, -6, 6, 0], y: [0, -6, 0] }
                : { y: [0, -6, 0] }
            }
            transition={
              status === "sorting"
                ? { duration: 0.6, repeat: Infinity }
                : { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }
            className="text-7xl sm:text-8xl drop-shadow-[0_0_25px_rgba(212,175,55,0.5)] select-none"
          >
            🎩
          </motion.div>
          <div className="mt-3 text-xs font-cairo text-magic-gold/70 tracking-wider">
            {status === "sorting" ? "…تفكّر القبعة" : "اضغط لتُفرَز"}
          </div>
        </motion.button>

        {/* result */}
        <AnimatePresence mode="wait">
          {status === "done" && house && (
            <motion.div
              key={house.en}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              className="mt-8 glass-card rounded-2xl p-6 relative overflow-hidden"
              style={{
                borderColor: `${house.color}99`,
                boxShadow: `0 0 30px ${house.color}55, inset 0 1px 0 rgba(255,255,255,0.15)`,
              }}
            >
              <div
                className="absolute inset-0 opacity-25 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${house.color} 0%, transparent 70%)`,
                }}
              />
              <div className="relative">
                <div className="text-5xl mb-2">{house.emoji}</div>
                <div
                  className="font-cinzel text-[10px] tracking-[0.35em] text-magic-parchment/60"
                  style={{ direction: "ltr" }}
                >
                  {house.en}
                </div>
                <div className="font-changa text-2xl sm:text-3xl gold-text font-bold mt-1">
                  {house.name}
                </div>
                <div className="mt-3 font-cairo text-magic-parchment/85 text-sm sm:text-base leading-relaxed">
                  {house.verdict}
                </div>
                <button
                  onClick={sortMe}
                  className="mt-5 text-xs text-magic-gold/70 hover:text-magic-gold transition font-cairo tracking-wider"
                >
                  ↻ افرزني مرّة ثانية
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
