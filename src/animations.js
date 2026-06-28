/* Emil Kowalski principles applied:
   - transform + opacity only (no filter: blur — not GPU-composited reliably)
   - custom cubic-bezier curves, never built-in ease-in
   - UI durations under 300ms where possible; longer only for first-time reveals
   - asymmetric enter/exit: enter deliberate, exit snappy
*/

export const revealContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.06,
    },
  },
}

export const revealItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.56,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export const cardHover = {
  y: -5,
  transition: {
    duration: 0.2,
    ease: [0.22, 1, 0.36, 1],
  },
}

export const heroTitle = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.042,
      delayChildren: 0.14,
    },
  },
}

export const heroLetter = {
  hidden: { opacity: 0, y: 64, rotateX: -42 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.68,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}
