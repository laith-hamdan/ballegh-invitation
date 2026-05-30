import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SUCCESS_MESSAGES = [
  "أُسطورة. حضورك سيُكتب في سجلات هوجورتس.",
  "تمّ تسجيلك بقائمة الأبطال. لا تنسَ تجيب طاقتك معك.",
  "اعتبر مقعدك محجوز بسحر إلزامي.",
];

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 2.2 + Math.random() * 2,
        color: ["#f5d76e", "#d4af37", "#9f7aea", "#ffffff", "#6b46c1"][i % 5],
        size: 4 + Math.random() * 6,
        rotate: Math.random() * 360,
      })),
    [],
  );
  return (
    <div className="fixed inset-0 pointer-events-none z-[80] overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -40, x: `${p.x}vw`, opacity: 1, rotate: p.rotate }}
          animate={{
            y: "110vh",
            rotate: p.rotate + 540,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeIn",
          }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: 2,
            boxShadow: `0 0 8px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}

export default function RSVP() {
  const [state, setState] = useState("idle"); // 'idle' | 'yes' | 'no'
  const [confetti, setConfetti] = useState(false);
  const [msg, setMsg] = useState("");

  const handleYes = () => {
    setState("yes");
    setMsg(
      SUCCESS_MESSAGES[Math.floor(Math.random() * SUCCESS_MESSAGES.length)],
    );
    setConfetti(true);
    setTimeout(() => setConfetti(false), 5000);
  };
  const handleNo = () => {
    setState("no");
  };
  const reset = () => setState("idle");

  return (
    <section id="rsvp" className="relative py-24 sm:py-28 px-5">
      <div className="relative z-10 max-w-2xl mx-auto text-center">
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
            CONFIRM&nbsp;YOUR&nbsp;PRESENCE
          </span>
          <h2 className="section-title mt-3 text-2xl sm:text-4xl gold-text leading-snug">
            هل ستشهد هذه اللحظة التاريخية؟
          </h2>
          <p className="mt-4 font-cairo text-magic-parchment/70 text-sm sm:text-base">
            اختر بحكمة. الكون يراقبك… وأنا كذلك.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={handleYes}
                className="magic-btn w-full sm:w-auto px-8 py-4 rounded-full font-changa text-lg font-semibold flex items-center justify-center gap-2"
                style={{
                  borderColor: "rgba(110, 231, 183, 0.6)",
                  background:
                    "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(212, 175, 55, 0.15))",
                  color: "#86efac",
                  boxShadow:
                    "0 0 20px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(110, 231, 183, 0.3)",
                }}
              >
                <span className="text-xl">🟢</span>
                <span>سأحضر</span>
              </button>
              <button
                onClick={handleNo}
                className="magic-btn w-full sm:w-auto px-8 py-4 rounded-full font-changa text-lg font-semibold flex items-center justify-center gap-2"
                style={{
                  borderColor: "rgba(248, 113, 113, 0.5)",
                  background:
                    "linear-gradient(135deg, rgba(220, 38, 38, 0.15), rgba(107, 70, 193, 0.15))",
                  color: "#fca5a5",
                  boxShadow:
                    "0 0 20px rgba(220, 38, 38, 0.25), inset 0 1px 0 rgba(248, 113, 113, 0.3)",
                }}
              >
                <span className="text-xl">🔴</span>
                <span>عدم الحضور مرفوض</span>
              </button>
            </motion.div>
          )}

          {state === "yes" && (
            <motion.div
              key="yes"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-10 glass-card rounded-2xl p-8 relative overflow-hidden"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-6xl mb-4"
              >
                ✨
              </motion.div>
              <div className="font-changa text-2xl gold-text font-bold mb-2">
                تأكّد الحضور!
              </div>
              <div className="font-cairo text-magic-parchment/85 text-base">
                {msg}
              </div>
              <button
                onClick={reset}
                className="mt-6 text-xs text-magic-gold/60 hover:text-magic-gold transition font-cairo tracking-wider"
              >
                ↩ تراجع
              </button>
            </motion.div>
          )}

          {state === "no" && (
            <motion.div
              key="no"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-10 glass-card rounded-2xl p-8 border-magic-purple/40"
            >
              <div className="text-5xl mb-4">🪄</div>
              <div className="font-changa text-xl sm:text-2xl text-magic-parchment leading-relaxed">
                اختصر وارجع واضغط على «سأحضر»… أحسنلك.
              </div>
              <div className="mt-3 font-cairo text-magic-parchment/70 text-sm">
                هذا الخيار غير مُعترَف به في وزارة السحر.
              </div>
              <button
                onClick={reset}
                className="magic-btn mt-6 px-6 py-3 rounded-full font-changa text-sm"
              >
                خذني للخيار الصحيح
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {confetti && <Confetti />}
    </section>
  );
}
