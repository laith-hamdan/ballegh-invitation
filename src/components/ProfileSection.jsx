import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfileSection() {
  const [clicks, setClicks] = useState(0);
  const [showEaster, setShowEaster] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const handleClick = () => {
    const next = clicks + 1;
    setClicks(next);
    if (next >= 5) {
      setShowEaster(true);
      setTimeout(() => {
        setShowEaster(false);
        setClicks(0);
      }, 2600);
    }
  };

  return (
    <section
      id="profile"
      className="relative py-20 sm:py-28 flex flex-col items-center justify-center px-5"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* profile image */}
        <button
          onClick={handleClick}
          aria-label="ليث حمدان"
          className="relative group focus:outline-none"
        >
          {/* spinning outer rune */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-6 rounded-full border border-magic-gold/25"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-10 rounded-full border border-magic-purple/20 border-dashed"
          />

          {/* glow ring */}
          <div className="ring-breathe rounded-full p-[3px] bg-gradient-to-br from-magic-gold via-magic-purple to-magic-gold">
            <div className="rounded-full p-[2px] bg-magic-midnight">
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full overflow-hidden">
                {/* real portrait — /public/profile.png */}
                {!imgFailed && (
                  <img
                    src="/profile.png"
                    alt="ليث حمدان"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={() => setImgFailed(true)}
                  />
                )}
                {/* fallback shown only if the image fails to load */}
                {imgFailed && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-magic-deepblue via-[#1a0b2e] to-magic-midnight">
                    <div className="text-center">
                      <div className="font-cinzel text-magic-gold text-5xl tracking-widest">
                        L.H
                      </div>
                      <div className="text-xs text-magic-gold/60 mt-1 tracking-widest">
                        PORTRAIT
                      </div>
                    </div>
                  </div>
                )}

                {/* hover sparkle overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 20%, rgba(245, 215, 110, 0.25) 0%, transparent 50%)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* corner sparkles */}
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="absolute text-magic-goldlight text-xl pointer-events-none"
              style={{
                top: i < 2 ? "-8px" : "calc(100% - 12px)",
                left: i % 2 === 0 ? "-8px" : "calc(100% - 12px)",
              }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.7, 1.2, 0.7] }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            >
              ✦
            </motion.span>
          ))}
        </button>

        {/* name + field */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-8 font-changa font-bold text-3xl sm:text-4xl gold-text"
        >
          ليث حمدان
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-2 font-messiri text-magic-parchment/80 text-base sm:text-lg"
        >
          طالب علم الحاسوب · ساحرٌ في طور التخرّج
        </motion.p>

        {/* tags */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {["Computer Science", "Gryffindor مرشّح"].map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-cairo bg-white/5 border border-magic-gold/25 text-magic-parchment/80"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* easter egg */}
      <AnimatePresence>
        {showEaster && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6 pointer-events-none"
          >
            <div className="glass-card rounded-2xl px-8 py-6 text-center">
              <div
                className="font-cinzel text-3xl gold-text tracking-widest"
                style={{ direction: "ltr" }}
              >
                Sleep Not Found.
              </div>
              <div className="mt-2 text-sm font-cairo text-magic-parchment/70">
                404 — النوم غير متوفر في هذا الكون.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
