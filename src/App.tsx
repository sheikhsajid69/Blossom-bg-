import { AnimatePresence, motion, useInView } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useRef, useState } from 'react'

const navLinks = ['Wander', 'Archive', 'Story', 'Connect']
const heroVideoUrl = import.meta.env.VITE_HERO_VIDEO_URL

type StaggeredFadeProps = {
  text: string
}

function StaggeredFade({ text }: StaggeredFadeProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <span ref={ref} className="block overflow-hidden">
      {text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          custom={i}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={{
            hidden: {
              opacity: 0,
              y: 18,
            },
            show: (index: number) => ({
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.55,
                ease: 'easeOut',
                delay: index * 0.07,
              },
            }),
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#010101] text-white">
      <video
        className="absolute inset-0 h-full w-full object-cover object-center"
        src={heroVideoUrl}
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_38%),linear-gradient(180deg,rgba(1,1,1,0.08)_0%,rgba(1,1,1,0.42)_58%,rgba(1,1,1,0.72)_100%)]" />

      <div className="relative z-20 flex min-h-screen flex-col">
        <header className="px-5 pt-5 sm:px-8 sm:pt-7">
          <nav className="relative z-20 flex items-center justify-between md:justify-center md:gap-14">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center text-white md:hidden"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <a
              href="#"
              className="text-center text-[11px] font-light uppercase tracking-[0.25em] text-white sm:text-xs md:text-sm md:tracking-[0.3em]"
            >
              Organic Visions
            </a>

            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-xs font-light uppercase tracking-[0.2em] text-white/80 transition duration-300 hover:text-white"
                >
                  {link}
                </a>
              ))}
            </div>

            <div className="h-10 w-10 md:hidden" />
          </nav>
        </header>

        <AnimatePresence>
          {isMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mobile-menu-glass fixed left-4 right-4 top-16 z-50 flex flex-col items-center gap-5 rounded-2xl py-8 md:hidden"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link}
                  href="#"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, delay: 0.05 + index * 0.06, ease: 'easeOut' }}
                  className="text-sm font-light uppercase tracking-[0.25em] text-white/90 transition duration-300 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link}
                </motion.a>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>

        <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-12 pt-12 text-center sm:px-8 sm:pt-16 md:pt-24">
          <div className="max-w-6xl">
            <h1 className="font-garamond mb-6 text-4xl font-normal leading-[1.08] tracking-tight text-white sm:mb-8 sm:text-6xl md:text-8xl lg:text-9xl">
              <StaggeredFade text="WITNESS THE" />
              <StaggeredFade text="HIDDEN REALM" />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="mx-auto mb-8 max-w-xs text-sm font-light leading-relaxed text-white/70 sm:mb-10 sm:max-w-md sm:text-base md:text-lg"
            >
              An odyssey through delicate living forms,
              <br className="hidden sm:block" /> revealed by lens and curiosity.
            </motion.p>

            <motion.button
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="liquid-glass rounded-full px-7 py-3.5 text-[11px] font-light uppercase tracking-[0.18em] text-white/90 transition duration-300 hover:text-white sm:px-10 sm:py-4 sm:text-xs sm:tracking-[0.2em]"
            >
              Begin the Experience
            </motion.button>
          </div>
        </section>
      </div>
    </main>
  )
}
