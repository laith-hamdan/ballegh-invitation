import { motion } from 'framer-motion'

const PARAGRAPHS = [
  'عندما اتخذتُ القرار قبل 3 سنوات…',
  'كنتُ أعلم، وجاهز لدفع ضريبة هذا الحمل الإضافي…',
  'وكان يتبادر إلى ذهني دائمًا:',
  '«إنّ قِمم الجبال تستحقّ لا جَرَم.»',
  'وها أنا أقف على أواخر خطوات حياتي الجامعية،',
  'وأقول: وصلتُ أخيرًا للمعركة النهائية.',
]

export default function StorySection() {
  return (
    <section
      id="story"
      className="relative py-24 sm:py-32 px-5 cinematic-fade-mask"
    >
      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.4em] text-magic-gold/70" style={{ direction: 'ltr' }}>
            THE&nbsp;JOURNEY
          </span>
          <h2 className="section-title mt-3 text-3xl sm:text-4xl gold-text">
            حكاية الرحلة
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-magic-gold to-transparent" />
        </motion.div>

        <div className="space-y-7">
          {PARAGRAPHS.map((p, i) => {
            const isQuote = p.startsWith('«')
            const isHighlight = i === PARAGRAPHS.length - 1
            return (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1, delay: i * 0.15, ease: [0.2, 0.8, 0.2, 1] }}
                className={
                  isHighlight
                    ? 'font-changa text-2xl sm:text-3xl font-bold gold-text text-center leading-relaxed'
                    : isQuote
                    ? 'font-messiri text-xl sm:text-2xl text-magic-parchment text-center italic leading-relaxed'
                    : 'font-cairo text-base sm:text-lg text-magic-parchment/85 leading-loose text-center'
                }
              >
                {p}
              </motion.p>
            )
          })}
        </div>

        {/* decorative sigil */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center gap-3 text-magic-gold/50">
            <div className="h-px w-16 bg-gradient-to-l from-magic-gold/50 to-transparent" />
            <span className="text-xl">⚔︎</span>
            <div className="h-px w-16 bg-gradient-to-r from-magic-gold/50 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
