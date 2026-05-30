import { useState } from "react";
import { motion } from "framer-motion";

const ARTIFACTS = [
  {
    img: "/gifts/airbods.jpeg",
    icon: "🎧",
    title: "سماعات AirPods",
    desc: "لعزل أصوات «خلصت المشروع؟» وسماع موسيقى النصر بأعلى جودة سحرية.",
    tag: "AirPods",
    accent: "from-slate-300/30 to-blue-300/10",
  },
  {
    img: "/gifts/barca.jpeg",
    icon: "👕",
    title: "قميص برشلونة",
    desc: "لأن البطل لازم يلبس زي الأبطال — Visca Barça! 🔵🔴",
    tag: "FC Barcelona Kit",
    accent: "from-blue-600/30 to-red-600/10",
  },
  {
    img: "/gifts/keyboard.png",
    icon: "⌨️",
    title: "كيبورد ميكانيكي",
    desc: "كل ضغطة تشبه تعويذة… وصوت الكلاك بيرعب الباجز قبل المناقشة.",
    tag: "Mechanical Keyboard",
    accent: "from-orange-500/30 to-zinc-500/10",
  },
  {
    img: "/gifts/harry-potter.jpg",
    icon: "🧙",
    title: "مجسّمات هاري بوتر",
    desc: "جيشٌ سحري صغير يحرس المكتب ويرفع المعنويات وقت اليأس.",
    tag: "Harry Potter Set",
    accent: "from-amber-600/30 to-purple-700/10",
  },
  {
    img: "/gifts/cash.jpg",
    icon: "💸",
    title: "دعم مالي",
    desc: "أقوى تعويذة على الإطلاق — تُرمّم الميزانية والمعنويات معًا. 💛",
    tag: "Cash Support",
    accent: "from-emerald-500/30 to-teal-500/10",
  },
];

function ArtifactImage({ a }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="aspect-square rounded-xl mb-4 flex items-center justify-center bg-magic-midnight/60 border border-magic-gold/20 overflow-hidden">
      {!failed ? (
        <img
          src={a.img}
          alt={a.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={() => setFailed(true)}
        />
      ) : (
        <motion.span
          animate={{ y: [0, -6, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-6xl"
        >
          {a.icon}
        </motion.span>
      )}
    </div>
  );
}

export default function WishList() {
  // duplicate list to create seamless loop illusion (track scrolls -50%)
  const items = [...ARTIFACTS, ...ARTIFACTS];

  return (
    <section id="wishlist" className="relative py-24 sm:py-28">
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 px-5"
        >
          <span
            className="font-cinzel text-[10px] sm:text-xs tracking-[0.4em] text-magic-gold/70"
            style={{ direction: "ltr" }}
          >
            ARTIFACTS&nbsp;FOR&nbsp;THE&nbsp;HERO
          </span>
          <h2 className="section-title mt-3 text-3xl sm:text-4xl gold-text">
            هدايا لدعم البطل
          </h2>
          <p className="mt-4 font-cairo text-magic-parchment/70 text-sm sm:text-base max-w-md mx-auto">
            هدايا اختيارية بالكامل… لكنها تزيد فُرص نجاح المناقشة بنسبة 73%.
          </p>
        </motion.div>

        <div
          className="marquee-viewport no-scrollbar overflow-hidden pb-4"
          style={{ direction: "ltr" }}
        >
          <div className="marquee-track">
          {items.map((a, i) => (
            <motion.div
              key={`${a.tag}-${i}`}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className="shrink-0 w-[230px] sm:w-[260px] glass-card rounded-2xl p-5 relative overflow-hidden group ml-5"
              style={{ direction: "rtl" }}
            >
              {/* accent gradient backdrop */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${a.accent} opacity-50 group-hover:opacity-80 transition-opacity duration-500`}
              />

              {/* glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 50% 0%, rgba(245, 215, 110, 0.25) 0%, transparent 65%)",
                }}
              />

              <div className="relative">
                {/* product image (falls back to emoji if the file is missing) */}
                <ArtifactImage a={a} />

                <div
                  className="font-cinzel text-[9px] tracking-[0.3em] text-magic-gold/60 mb-1"
                  style={{ direction: "ltr" }}
                >
                  {a.tag}
                </div>
                <div className="font-changa text-lg gold-text font-bold leading-snug">
                  {a.title}
                </div>
                <div className="mt-2 text-sm text-magic-parchment/75 font-cairo leading-relaxed">
                  {a.desc}
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </div>

        <div className="text-center mt-6 text-xs text-magic-gold/50 font-cairo px-5">
          ✦ مرّر فوق البطاقات بالماوس لإيقاف الحركة ✦
        </div>
      </div>
    </section>
  );
}
