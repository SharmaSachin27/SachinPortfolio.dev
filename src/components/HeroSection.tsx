import { useRef, useCallback, Suspense, lazy } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown } from "lucide-react";

const ParticleBackground = lazy(() => import("./ParticleBackground"));

/* ── word-by-word headline animation ───────────────────── */
const headlineSegments = [
  { text: "Full-Stack Developer", gradient: false },
  { text: "|",                   gradient: false, muted: true },
  { text: "Cloud & React",        gradient: true  },
  { text: "|",                   gradient: false, muted: true },
  { text: "AWS Certified",        gradient: false },
];

const wordVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, delay: 0.15 + i * 0.13, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ── spring config — loose & smooth ────────────────────── */
const SPRING = { stiffness: 60, damping: 20, mass: 1 };

const HeroSection = () => {
  /* raw normalised mouse: -1 → +1 */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  /* spring-smoothed values driving CSS transforms */
  const springX = useSpring(rawX, SPRING);
  const springY = useSpring(rawY, SPRING);

  /* parallax layers — glow moves most, text moves least */
  const glowX  = useTransform(springX, [-1, 1], ["-28px", "28px"]);
  const glowY  = useTransform(springY, [-1, 1], ["-20px", "20px"]);
  const textX  = useTransform(springX, [-1, 1], ["-8px",  "8px"]);
  const textY  = useTransform(springY, [-1, 1], ["-6px",  "6px"]);
  const subX   = useTransform(springX, [-1, 1], ["-5px",  "5px"]);
  const subY   = useTransform(springY, [-1, 1], ["-4px",  "4px"]);

  /* shared ref for Three.js — avoids React re-renders on every mousemove */
  const mouseRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      const nx = ((e.clientX - left) / width)  * 2 - 1;  // -1 → +1
      const ny = -(((e.clientY - top)  / height) * 2 - 1); // +1 top, -1 bottom

      rawX.set(nx);
      rawY.set(ny);
      mouseRef.current = { x: nx, y: ny };
    },
    [rawX, rawY]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    mouseRef.current = { x: 0, y: 0 };
  }, [rawX, rawY]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* base background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, hsl(220 25% 10%) 0%, hsl(220 20% 4%) 70%, hsl(220 20% 2%) 100%)",
        }}
      />

      {/* particles — cursor-reactive */}
      <Suspense fallback={null}>
        <ParticleBackground mouseRef={mouseRef} />
      </Suspense>

      {/* glow orb behind heading — moves most */}
      <motion.div
        aria-hidden
        style={{ x: glowX, y: glowY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          className="w-[520px] h-[260px] rounded-full opacity-[0.13]"
          style={{
            background: "var(--gradient-primary)",
            filter: "blur(72px)",
          }}
        />
      </motion.div>

      {/* content */}
      <div className="section-container relative z-10 text-center">

        {/* headline — each segment fades/slides in independently */}
        <motion.h1
          style={{ x: textX, y: textY }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-balance text-foreground flex flex-wrap justify-center gap-x-4 gap-y-1"
        >
          {headlineSegments.map((seg, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className={
                seg.gradient
                  ? "gradient-text"
                  : seg.muted
                  ? "text-muted-foreground/40"
                  : ""
              }
            >
              {seg.text}
            </motion.span>
          ))}
        </motion.h1>

        {/* subtitle */}
        <motion.p
          style={{ x: subX, y: subY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: "easeOut" }}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance"
        >
          Full-stack developer — PHP, Laravel, Node.js, React & AWS
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease: "easeOut" }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-lg font-bold text-lg text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-glow)]"
            style={{ background: "var(--gradient-primary)" }}
          >
            Hire Me
          </a>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-xs font-mono">scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
