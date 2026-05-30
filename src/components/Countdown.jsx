import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TARGET = new Date("2026-06-06T15:30:00+03:00").getTime();

function computeRemaining() {
  const diff = TARGET - Date.now();
  if (diff <= 0)
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, expired: false };
}

function Cell({ value, label, sub }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div
          className="absolute inset-0 blur-2xl opacity-70"
          style={{
            background:
              "radial-gradient(circle, rgba(245, 215, 110, 0.45) 0%, transparent 70%)",
          }}
        />
        <div className="relative glass-card rounded-2xl px-3 sm:px-6 py-4 sm:py-6 min-w-[70px] sm:min-w-[100px] text-center overflow-hidden">
          <motion.div
            key={value}
            initial={{ y: 15, opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-cinzel font-bold text-3xl sm:text-5xl gold-text tabular-nums"
            style={{ direction: "ltr" }}
          >
            {String(value).padStart(2, "0")}
          </motion.div>
          <div className="mt-2 text-[10px] sm:text-xs font-cairo text-magic-parchment/70 tracking-widest">
            {label}
          </div>
          <div
            className="font-cinzel text-[8px] sm:text-[9px] text-magic-gold/40 tracking-[0.25em] mt-1"
            style={{ direction: "ltr" }}
          >
            {sub}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Countdown() {
  const [t, setT] = useState(computeRemaining);

  useEffect(() => {
    const id = setInterval(() => setT(computeRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="countdown" className="relative py-24 sm:py-28 px-5">
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Platform 9¾ sign — the train to the final battle */}
          <motion.div
            initial={{ opacity: 0, rotate: -4 }}
            whileInView={{ opacity: 1, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
            className="inline-flex items-center gap-2 mb-5 px-5 py-2 rounded-lg"
            style={{
              background: "linear-gradient(135deg, #1a1a1a, #2b2b2b)",
              border: "2px solid #d4af37",
              boxShadow:
                "0 6px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
              direction: "ltr",
            }}
          >
            <span className="text-lg">🚂</span>
            <span className="font-cinzel font-bold text-magic-goldlight tracking-wider text-sm sm:text-base">
              PLATFORM&nbsp;9¾
            </span>
          </motion.div>

          <div>
            <span
              className="font-cinzel text-[10px] sm:text-xs tracking-[0.4em] text-magic-gold/70"
              style={{ direction: "ltr" }}
            >
              THE&nbsp;FINAL&nbsp;BATTLE&nbsp;BEGINS&nbsp;IN
            </span>
          </div>
          <h2 className="section-title mt-3 text-2xl sm:text-3xl gold-text">
            العدّ التنازلي للمعركة النهائية
          </h2>
        </motion.div>

        {t.expired ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-10 glass-card rounded-2xl p-10"
          >
            <div className="text-5xl mb-3">⚔️</div>
            <div className="font-changa text-2xl gold-text">
              المعركة قد بدأت — أو انتهت ببطولة.
            </div>
          </motion.div>
        ) : (
          <div className="mt-10 flex justify-center items-stretch gap-2 sm:gap-4 flex-row-reverse">
            <Cell value={t.days} label="يوم" sub="DAYS" />
            <Cell value={t.hours} label="ساعة" sub="HRS" />
            <Cell value={t.minutes} label="دقيقة" sub="MIN" />
            <Cell value={t.seconds} label="ثانية" sub="SEC" />
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-sm sm:text-base font-cairo text-magic-parchment/70"
        >
          6 / 6 / 2026 — الساعة 3:30 عصراً
        </motion.p>
      </div>
    </section>
  );
}
