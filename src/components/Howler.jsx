import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// The Howler screams the date reminder, one shouted line at a time.
const SCREAM = [
  "المناقشششة!",
  "السبت 6 / 6 — الساعة 3:30 عصراً!",
  "لا تتأخّر… ولا تنسَ تجيب طاقتك معك!",
  "وإذا ما حضرت… وزارة السحر رح تلاحقك! 🪄",
];

export default function Howler() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* floating trigger (bottom-right; music player sits bottom-left) */}
      <motion.button
        onClick={() => setOpen(true)}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
        aria-label="افتح الرسالة الصارخة"
        className="fixed bottom-5 right-5 z-[90] w-12 h-12 rounded-full flex items-center justify-center text-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(220,38,38,0.35), rgba(127,29,29,0.5))",
          border: "1px solid rgba(248,113,113,0.7)",
          boxShadow:
            "0 0 18px rgba(220,38,38,0.55), inset 0 1px 0 rgba(255,255,255,0.25)",
          backdropFilter: "blur(8px)",
        }}
      >
        ✉️
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center px-6"
            style={{
              background: "rgba(5,5,20,0.72)",
              backdropFilter: "blur(4px)",
            }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.6, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
              className="howler-shake relative w-full max-w-sm rounded-2xl p-6 sm:p-8 text-center"
              style={{
                background:
                  "linear-gradient(160deg, #dc2626 0%, #991b1b 60%, #7f1d1d 100%)",
                border: "2px solid #fca5a5",
                boxShadow:
                  "0 0 40px rgba(220,38,38,0.7), 0 0 90px rgba(220,38,38,0.4)",
              }}
            >
              {/* angry mouth */}
              <motion.div
                animate={{ scaleY: [1, 0.55, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="mx-auto mb-4 w-20 h-10 rounded-b-full bg-[#3b0a0a] origin-top"
              />

              <div
                className="font-cinzel text-[10px] tracking-[0.4em] text-red-100/80 mb-3"
                style={{ direction: "ltr" }}
              >
                A&nbsp;HOWLER&nbsp;ARRIVES
              </div>

              <div className="space-y-2">
                {SCREAM.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 + i * 0.5, duration: 0.3 }}
                    className={`font-changa font-extrabold text-white leading-snug ${
                      i === 0 ? "text-2xl sm:text-3xl" : "text-base sm:text-lg"
                    }`}
                    style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              <button
                onClick={() => setOpen(false)}
                className="mt-6 px-5 py-2 rounded-full font-cairo text-sm text-red-50 border border-red-200/60 hover:bg-white/10 transition"
              >
                طيّب طيّب… سمعتك! 🙉
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
