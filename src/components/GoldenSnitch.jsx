import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// The Snitch reveals a little (fun + warm) line about Laith Hamdan each catch.
const CATCH_MESSAGES = [
  "أمسكت السنيتش! وأمسكت معه سرّ نجاح ليث: إصرارٌ ما بيعرف ينام 🏆",
  "ليث حمدان — ثلاث سنين تعب، واليوم بيقطف ثمرة التخرّج 🎓",
  "بطلُ هذه الحكاية: ليث. والسنيتش مجرّد كومبارس بالقصة 😄",
  "خلف كل مشروع ناجح… ليث، وفنجان قهوة، وكثير من الأمل ☕",
  "ليث ما استسلم يومًا — لهيك السنيتش استسلمله أول 🪄",
  "صفّقوا لليث حمدان… الساحر الذي حوّل السهر إلى مشروع تخرّج ✨",
  "أمسكته! تمامًا مثل ما أمسك ليث حلمه وما فلّته 💛",
];

function randomPoint(w, h) {
  const padX = Math.min(80, w * 0.12);
  const padY = Math.min(120, h * 0.18);
  return {
    x: padX + Math.random() * (w - padX * 2),
    y: padY + Math.random() * (h - padY * 2),
  };
}

export default function GoldenSnitch() {
  const [size, setSize] = useState({ w: 1024, h: 768 });
  const [pathKey, setPathKey] = useState(0);
  const [caught, setCaught] = useState(0);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const update = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // a fresh wandering path each time it's caught (or on resize)
  const path = useMemo(() => {
    const pts = Array.from({ length: 6 }, () => randomPoint(size.w, size.h));
    return {
      x: pts.map((p) => p.x),
      y: pts.map((p) => p.y),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathKey, size.w, size.h]);

  const handleCatch = () => {
    const msg = CATCH_MESSAGES[Math.floor(Math.random() * CATCH_MESSAGES.length)];
    setToast(msg);
    setCaught((c) => c + 1);
    setPathKey((k) => k + 1); // re-route the snitch
    window.clearTimeout(handleCatch._t);
    handleCatch._t = window.setTimeout(() => setToast(null), 2800);
  };

  return (
    <div className="fixed inset-0 z-[70] pointer-events-none overflow-hidden">
      <motion.button
        key={pathKey}
        onClick={handleCatch}
        aria-label="أمسك السنيتش الذهبي"
        className="absolute pointer-events-auto focus:outline-none"
        style={{ top: 0, left: 0 }}
        initial={{ x: path.x[0], y: path.y[0] }}
        animate={{ x: path.x, y: path.y }}
        transition={{
          duration: 16,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.25 }}
        whileTap={{ scale: 0.8 }}
      >
        <motion.span
          animate={{ rotate: [-12, 12, -12], y: [0, -3, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          className="block text-2xl sm:text-3xl select-none drop-shadow-[0_0_10px_rgba(245,215,110,0.9)]"
          aria-hidden
        >
          🟡
        </motion.span>
        {/* little wings */}
        <span
          className="absolute -top-1 -left-2 text-[10px] opacity-80 select-none"
          aria-hidden
        >
          🪽
        </span>
        <span
          className="absolute -top-1 -right-2 text-[10px] opacity-80 -scale-x-100 select-none"
          aria-hidden
        >
          🪽
        </span>
      </motion.button>

      {/* catch toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none fixed left-1/2 -translate-x-1/2 bottom-24 z-[95] glass-card rounded-2xl px-6 py-4 text-center max-w-[88vw]"
          >
            <div className="text-3xl mb-1">🟡✨</div>
            <div className="font-changa gold-text font-bold text-base sm:text-lg">
              {toast}
            </div>
            {caught >= 3 && (
              <div className="mt-1 text-xs font-cairo text-magic-parchment/70">
                أمسكته {caught} مرّات — يبدو إنك فاضي زيادة 😄
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
