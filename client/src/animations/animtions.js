export const menuSlide = {
  initial: {
    x: "-20rem",
  },
  slideIn: {
    x: 0,
    transition: {
      ease: "linear",
      duration: 0.2,
    },
  },
  slideOut: {
    x: "-20rem",
    transition: {
      ease: "linear",
      duration: 0.2,
    },
  },
};

export const imageSpin = {
  spin: {
    rotate: 360,
    transition: {
      ease: "linear",
      repeat: Infinity,
      duration: 3,
    },
  },
};
