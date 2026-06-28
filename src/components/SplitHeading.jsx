import { motion } from 'motion/react'

export function SplitHeading({ children, tag = 'h2', className, baseDelay = 0 }) {
  const text  = typeof children === 'string' ? children : String(children ?? '')
  const words = text.split(' ')

  /* motion[tag] gives us motion.h2 / motion.h3 etc.
     whileInView on the outer element so the IntersectionObserver fires
     on the VISIBLE tag — not on the words hidden inside overflow:hidden */
  const MotionTag = motion[tag] ?? motion.div

  return (
    <MotionTag
      className={className}
      aria-label={text}
      style={{ display: 'flex', flexWrap: 'wrap', columnGap: '0.26em', rowGap: 0 }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{ overflow: 'hidden', display: 'inline-block', paddingBottom: '0.08em' }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            variants={{
              hidden: { y: '110%' },
              show: {
                y: 0,
                transition: {
                  duration: 0.72,
                  ease: [0.22, 1, 0.36, 1],
                  delay: baseDelay + i * 0.052,
                },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}
