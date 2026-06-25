export const revealContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
}

export const revealItem = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: 'blur(10px)',
  },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.64,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export const cardHover = {
  y: -8,
  transition: {
    duration: 0.28,
    ease: [0.22, 1, 0.36, 1],
  },
}

export const heroTitle = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.16,
    },
  },
}

export const heroLetter = {
  hidden: {
    opacity: 0,
    y: 72,
    rotateX: -48,
    filter: 'blur(12px)',
  },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.72,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}
