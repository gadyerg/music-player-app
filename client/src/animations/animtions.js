export const menuSlide = {
    initial: {
        x: '-17vw'
    },
    slideIn: {
        x: 0,
        transition: {
            ease: 'linear',
            duration: .2
        }
    },
    slideOut: {
        x: '-17vw',
        transition: {
            ease: 'linear',
            duration: .2
        }
    }
}

export const imageSpin = {
    spin: {
        rotate: 360,
        transition: {
            ease: 'linear',
            repeat: Infinity,
            duration: 3
        }
    }
}