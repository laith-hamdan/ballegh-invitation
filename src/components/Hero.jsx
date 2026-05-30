import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SEQUENCE = [
  {
    text: "بعد 3 سنوات من شح الإجازات والسهر...",
    size: "text-2xl sm:text-3xl",
    duration: 3400,
  },
  {
    text: "وبعد عددٍ لا نهائي من تقلّب الشِفتات بطقس العرب بسبب الجامعة...",
    size: "text-xl sm:text-2xl",
    duration: 3800,
  },
  { text: "يدعوكم ليث حمدان", size: "text-3xl sm:text-4xl", duration: 2200 },
  {
    text: "لحضور مناقشة مشروع تخرجه",
    size: "text-2xl sm:text-3xl",
    duration: 2400,
  },
];

export default function Hero({ start = true, onStart }) {
  const [step, setStep] = useState(-1);
  const [revealTitle, setRevealTitle] = useState(false);

  useEffect(() => {
    // wait until the loading screen finishes before the cinematic text begins
    if (!start) return;
    let cancelled = false;
    let timer;
    const run = async () => {
      await wait(400);
      for (let i = 0; i < SEQUENCE.length; i++) {
        if (cancelled) return;
        setStep(i);
        await wait(SEQUENCE[i].duration);
      }
      if (cancelled) return;
      setStep(SEQUENCE.length);
      await wait(400);
      if (cancelled) return;
      setRevealTitle(true);
    };
    run();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [start]);

  const handleSkip = () => {
    setStep(SEQUENCE.length);
    setRevealTitle(true);
  };

  const scrollNext = () => {
    document.getElementById("profile")?.scrollIntoView({ behavior: "smooth" });
    onStart?.();
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-5 py-16 overflow-hidden"
    >
      {/* skip button */}
      {!revealTitle && (
        <button
          onClick={handleSkip}
          className="absolute top-6 left-6 text-xs text-magic-gold/60 hover:text-magic-gold transition font-cairo tracking-wider z-20"
          aria-label="تخطّي المقدمة"
        >
          تخطّي ↩
        </button>
      )}

      {/* sequenced cinematic lines (removed once the title is revealed so the
          title sits centered in the section, not pushed downward) */}
      {!revealTitle && (
      <div className="relative z-10 w-full max-w-2xl mx-auto text-center min-h-[40vh] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {step >= 0 && step < SEQUENCE.length && (
            <motion.h2
              key={step}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
              transition={{ duration: 1.0, ease: [0.2, 0.8, 0.2, 1] }}
              className={`font-changa font-semibold ${SEQUENCE[step].size} text-magic-parchment leading-relaxed`}
              style={{
                textShadow:
                  "0 2px 30px rgba(245, 215, 110, 0.25), 0 0 40px rgba(159, 122, 234, 0.15)",
              }}
            >
              {SEQUENCE[step].text}
            </motion.h2>
          )}
        </AnimatePresence>
      </div>
      )}

      {/* Title reveal */}
      <AnimatePresence>
        {revealTitle && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative z-10 flex flex-col items-center text-center"
          >
            {/* small over-line */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-cinzel text-xs sm:text-sm tracking-[0.4em] text-magic-gold/70 mb-4"
              style={{ direction: "ltr" }}
            ></motion.span>

            {/* title — solid gold (no gradient text-clip, which clips Arabic
                glyphs on iOS), clearest and matches the other section titles */}
            <div className="relative">
              <motion.h1
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.2,
                  duration: 1.4,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className="relative font-changa font-extrabold text-[2.1rem] sm:text-6xl md:text-7xl gold-text leading-[1.5] sm:leading-[1.3] py-2"
              >
                دعوة لحضور مناقشة مشروع تخرج ليث حمدان
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="mt-5 font-messiri text-magic-parchment/80 text-base sm:text-lg max-w-md"
            >
              المعركة النهائية — حيث يلتقي العلم بالسحر.
            </motion.p>

            {/* CTA */}
            <motion.button
              onClick={scrollNext}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              whileTap={{ scale: 0.96 }}
              className="magic-btn mt-10 px-10 py-4 rounded-full font-changa text-lg font-semibold tracking-wider relative"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>ابدأ الرحلة</span>
                <motion.span
                  animate={{ x: [0, -6, 0] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ✦
                </motion.span>
              </span>
            </motion.button>

            {/* hint scroll */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="mt-14 flex flex-col items-center text-magic-gold/60 text-xs font-cairo tracking-widest"
            >
              <span>اسحب للأسفل</span>
              <motion.div
                animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="mt-2 w-px h-8 bg-gradient-to-b from-magic-gold/0 via-magic-gold to-magic-gold/0"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
