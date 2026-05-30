import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-16 px-5 mt-10 overflow-hidden">
      {/* top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-magic-gold/40 to-transparent" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* sigil */}
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background:
                  "radial-gradient(circle, rgba(245, 215, 110, 0.2) 0%, transparent 70%)",
              }}
            >
              <span className="text-2xl">✦</span>
            </motion.div>
          </div>

          <p className="font-changa text-base sm:text-lg gold-text leading-relaxed">
            تمّ تطوير هذه الدعوة باستخدام قليلٍ من السحر…
          </p>

          <div className="mt-8 flex items-center justify-center gap-3 text-magic-gold/40"></div>

          <p className="mt-6 text-[10px] font-cairo text-magic-parchment/40 tracking-wider">
            ليث حمدان · علم الحاسوب · المعركة النهائية
          </p>
        </motion.div>

        {/* hidden easter egg */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.18 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 2 }}
          className="mt-12 text-[10px] font-cinzel tracking-[0.3em] text-magic-purple/40 select-none"
          style={{ direction: "ltr" }}
        >
          Powered by caffeine and questionable life decisions.
        </motion.p>
      </div>
    </footer>
  );
}
