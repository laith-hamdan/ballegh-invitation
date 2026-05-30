import { motion } from "framer-motion";

const DETAILS = [
  {
    icon: "📅",
    en: "DATE",
    label: "التاريخ",
    value: "6 / 6 / 2026",
    sub: "يوم السبت",
  },
  {
    icon: "⏰",
    en: "TIME",
    label: "الوقت",
    value: "الساعة 3:30 عصراً",
    sub: "الالتزام بالوقت = نصف السحر",
  },
  {
    icon: "📍",
    en: "PLACE",
    label: "المكان",
    value: "جمعية كفاءات للريادة والابتكار",
    sub: "القاعة الكبرى — هوجورتس",
  },
];

export default function DiscussionDetails() {
  return (
    <section id="details" className="relative py-24 sm:py-28 px-5">
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span
            className="font-cinzel text-[10px] sm:text-xs tracking-[0.4em] text-magic-gold/70"
            style={{ direction: "ltr" }}
          >
            THE&nbsp;SUMMONING
          </span>
          <h2 className="section-title mt-3 text-3xl sm:text-4xl gold-text">
            تفاصيل المناقشة
          </h2>
          <p className="mt-4 font-cairo text-magic-parchment/70 text-sm sm:text-base">
            احفظ الموعد… ولا تأتِ بدون عصا سحرية (أو ابتسامة على الأقل).
          </p>
        </motion.div>

        {/* modern detail panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="magic-border glass-card rounded-3xl p-2 sm:p-3"
        >
          <div className="rounded-[1.25rem] bg-magic-midnight/40 px-4 sm:px-7 py-3 sm:py-4">
            {DETAILS.map((d, i) => (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`group relative flex items-center gap-4 sm:gap-5 py-5 ${
                  i !== DETAILS.length - 1
                    ? "border-b border-magic-gold/15"
                    : ""
                }`}
              >
                {/* gradient medallion */}
                <div className="relative shrink-0">
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl bg-gradient-to-br from-magic-gold/25 via-magic-purple/20 to-transparent border border-magic-gold/30 shadow-gold-glow"
                  >
                    {d.icon}
                  </motion.div>
                </div>

                {/* texts */}
                <div className="flex-1 min-w-0">
                  <div
                    className="font-cinzel text-[9px] sm:text-[10px] tracking-[0.35em] text-magic-gold/60 mb-1"
                    style={{ direction: "ltr" }}
                  >
                    {d.en}
                    <span className="font-cairo tracking-normal text-magic-parchment/40">
                      {"  ·  "}
                      {d.label}
                    </span>
                  </div>
                  <div className="font-changa text-lg sm:text-xl gold-text font-bold leading-snug truncate">
                    {d.value}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm text-magic-parchment/65 font-cairo leading-relaxed">
                    {d.sub}
                  </div>
                </div>

                {/* step index */}
                <div
                  className="shrink-0 font-cinzel text-magic-gold/25 text-2xl sm:text-3xl group-hover:text-magic-gold/50 transition-colors duration-500"
                  style={{ direction: "ltr" }}
                >
                  0{i + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Maps button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-9 flex justify-center"
        >
          <a
            href="https://maps.app.goo.gl/1GZVLAFp5fyhzee79"
            target="_blank"
            rel="noreferrer"
            className="magic-btn px-7 py-3.5 rounded-full font-changa text-base font-semibold flex items-center gap-3"
          >
            <span className="text-xl">🗺️</span>
            <span>افتح الموقع على خرائط جوجل</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
