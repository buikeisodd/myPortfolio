import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Layers,
  Zap,
  Star,
  Coffee,
  Briefcase,
  Users,
} from "lucide-react";
import { projects } from "../data/projects";

/* ── Fade-in wrapper for sections ── */
const FadeIn = ({ children, delay = 0, y = 40, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ── Cycling role in hero ── */
const roles = [
  "Front-end Developer",
  "UI / UX Engineer",
  "React Specialist",
  "Creative Coder",
];

/* ── Tech stack items ── */
const stack = [
  { name: "React", color: "#61dafb" },
  { name: "HTML5", color: "#e34f26" },
  { name: "Git", color: "#f05032" },
  { name: "Vercel", color: "#ffffff" },
  { name: "Tailwind CSS", color: "#38bdf8" },
];

/* ── Stats ── */
const stats = [
  { icon: Briefcase, value: "5+", label: "Years Exp." },
  { icon: Star, value: "40+", label: "Projects" },
  { icon: Users, value: "20+", label: "Clients" },
  { icon: Coffee, value: "∞", label: "Coffees" },
];

/* ── Hero code snippet visual ── */
const codeLines = [
  { indent: 0, text: "const alex = {", color: "#fafafa" },
  { indent: 1, text: 'role: "Full-Stack Dev",', color: "#a3e635" },
  { indent: 1, text: 'passion: "clean code",', color: "#a3e635" },
  { indent: 1, text: "available: true,", color: "#60a5fa" },
  { indent: 1, text: "build: (idea) => {", color: "#fafafa" },
  { indent: 2, text: "return greatProduct", color: "#f9a8d4" },
  { indent: 1, text: "}", color: "#fafafa" },
  { indent: 0, text: "}", color: "#fafafa" },
];

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((p) => (p + 1) % roles.length),
      2800
    );
    return () => clearInterval(id);
  }, []);

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <div className="relative">

      {/* ════════ HERO ════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden pt-20"
      >
        {/* Ambient glow blobs */}
        <motion.div
          className="glow-blob w-[600px] h-[600px] -top-40 -left-60 bg-lime-400/[0.06]"
          animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="glow-blob w-[500px] h-[500px] top-40 -right-60 bg-violet-500/[0.07]"
          animate={{ scale: [1, 1.08, 1], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        <motion.div
          className="glow-blob w-[300px] h-[300px] bottom-20 left-1/3 bg-cyan-500/[0.05]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-80px)]">

            {/* LEFT: Text */}
            {/* FIX: changed py-16 → pt-16 pb-24 so there's clear breathing room at the
                 bottom on mobile before the next section appears on short Android screens */}
            <div className="flex flex-col justify-center pt-16 pb-24 lg:py-0">

              {/* Availability badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 mb-8 w-fit"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400" />
                </span>
                <span className="font-mono-custom text-xs tracking-widest text-zinc-500 uppercase">
                  Available for work
                </span>
              </motion.div>

              {/* Greeting */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="font-mono-custom text-zinc-500 text-sm mb-3 tracking-widest uppercase"
              >
                Hi there, I'm
              </motion.p>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[clamp(4rem,12vw,8rem)] leading-none text-white mb-4 tracking-wide"
              >
                CHIBUIKE
                <br />
                <span className="text-lime-400">ESEAGWU</span>
              </motion.h1>

              {/* Cycling role */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex items-center gap-3 mb-6 h-8"
              >
                <span className="text-zinc-600 text-lg">—</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="text-zinc-300 text-lg font-medium"
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-zinc-500 text-base leading-relaxed max-w-md mb-10"
              >
                I design and build performant web applications with pixel-perfect
                attention to detail. From concept to deployment — I ship products
                that people love to use.
              </motion.p>

              {/* CTAs
                  FIX: removed style={{marginBottom:20}} — was only 20px.
                  mb-10 is now handled by the description above, and pb-24
                  on this column handles the bottom gap on mobile. */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/projects">
                  <motion.span
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-lime-400 text-zinc-950 font-semibold rounded-full text-sm shadow-xl shadow-lime-400/20 hover:bg-lime-300 transition-colors"
                  >
                    View My Work <ArrowRight size={16} strokeWidth={2.5} />
                  </motion.span>
                </Link>
                <Link to="/contact">
                  <motion.span
                    whileHover={{ scale: 1.04, borderColor: "#a3e635" }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-7 py-3.5 border border-zinc-700 text-zinc-300 font-semibold rounded-full text-sm hover:border-lime-400 hover:text-lime-400 transition-all duration-300"
                  >
                    Get In Touch
                  </motion.span>
                </Link>
              </motion.div>
            </div>

            {/* RIGHT: Floating code card (desktop) */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex justify-center items-center relative"
              style={{ padding: 20 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-[380px] h-[380px] rounded-full border border-dashed border-lime-400/15"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute w-[300px] h-[300px] rounded-full border border-dashed border-zinc-700/40"
              />

              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative bg-[#0d0d0d] border border-[#1e1e1e] rounded-2xl overflow-hidden shadow-2xl shadow-black w-full max-w-[340px]"
              >
                <div className="flex items-center gap-2 px-5 py-4 border-b border-[#1e1e1e] bg-[#111]">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <div className="ml-4 font-mono-custom text-[10px] text-zinc-600 tracking-wider">
                    developer.js
                  </div>
                </div>
                <div className="p-5 font-mono-custom text-sm leading-loose">
                  {codeLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + i * 0.08, duration: 0.4 }}
                      className="flex"
                      style={{ paddingLeft: `${line.indent * 16}px` }}
                    >
                      <span className="text-[13px]" style={{ color: line.color }}>
                        {line.text}
                      </span>
                    </motion.div>
                  ))}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-lime-400 ml-1 -mb-0.5"
                  />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-4 -left-4 bg-[#111] border border-[#1e1e1e] rounded-xl px-4 py-2.5 shadow-xl flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-mono-custom text-xs text-zinc-400">React 18</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-4 -right-4 bg-[#111] border border-[#1e1e1e] rounded-xl px-4 py-2.5 shadow-xl flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-sm bg-blue-500" />
                <span className="font-mono-custom text-xs text-zinc-400">Let's make magic!</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono-custom text-[10px] tracking-widest text-zinc-700 uppercase">
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-zinc-700 to-transparent"
          />
        </motion.div>
      </section>

      {/* ════════ STATS BAND ════════
          FIX: Responsive grid — 2 cols on mobile with tighter gap and padding.
          Stat values shrink on mobile so they don't overflow small Android screens.
          Labels shortened to single-line friendly text ("Years Exp." not "Years Experience"). */}
      <section className="py-10 sm:py-14 border-y border-white/5 bg-[#0a0a0a] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-10">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <FadeIn key={label} delay={i * 0.08} y={20}>
                <div className="flex flex-col items-center text-center gap-1.5 sm:gap-2 p-4 sm:p-6 rounded-2xl bg-white/[0.025] border border-white/5">
                  <Icon size={18} className="text-lime-400 mb-0.5" />
                  {/* FIX: text-3xl on mobile → text-4xl sm → text-5xl lg */}
                  <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide">
                    {value}
                  </span>
                  <span className="font-mono-custom text-[10px] sm:text-xs text-zinc-600 tracking-widest uppercase leading-tight">
                    {label}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ ABOUT ════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="glow-blob w-[400px] h-[400px] top-0 right-0 bg-violet-600/[0.04]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <FadeIn>
                <p className="section-label mb-6">About Me</p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-wide text-white mb-6">
                  BUILDING WITH<br />
                  <span className="text-lime-400">PURPOSE</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-zinc-500 leading-relaxed mb-5">
                  I'm a front-end developer with 5+ years of experience turning ambitious
                  ideas into polished digital products. I obsess over performance,
                  accessibility, and the small interactions that make interfaces feel alive.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="text-zinc-500 leading-relaxed mb-8">
                  When I'm not shipping features, I'm open-sourcing tools, writing about
                  frontend architecture, or exploring the intersection of design systems
                  and developer experience.
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[#111] border border-[#1e1e1e]">
                    <Code2 size={16} className="text-lime-400" />
                    <span className="text-sm text-zinc-400">Clean Code</span>
                  </div>
                  <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[#111] border border-[#1e1e1e]">
                    <Layers size={16} className="text-lime-400" />
                    <span className="text-sm text-zinc-400">System Design</span>
                  </div>
                  <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[#111] border border-[#1e1e1e]">
                    <Zap size={16} className="text-lime-400" />
                    <span className="text-sm text-zinc-400">Performance First</span>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div>
              <FadeIn delay={0.15}>
                <p className="section-label mb-6">Tech Stack</p>
              </FadeIn>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {stack.map((tech, i) => (
                  <FadeIn key={tech.name} delay={0.2 + i * 0.04} y={20}>
                    <motion.div
                      whileHover={{ scale: 1.06, borderColor: tech.color + "44" }}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#111] border border-[#1e1e1e] transition-all duration-300 group"
                    >
                      <div
                        className="w-2 h-2 rounded-full group-hover:scale-110 transition-transform"
                        style={{ background: tech.color, boxShadow: `0 0 8px ${tech.color}55` }}
                      />
                      <span className="font-mono-custom text-[10px] text-zinc-500 text-center leading-tight tracking-wide group-hover:text-zinc-300 transition-colors">
                        {tech.name}
                      </span>
                    </motion.div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ FEATURED PROJECTS ════════ */}
      <section className="py-28 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <FadeIn>
                <p className="section-label mb-4">Selected Work</p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-wide text-white">
                  FEATURED<br />
                  <span className="text-lime-400">PROJECTS</span>
                </h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.2}>
              <Link to="/projects">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-700 text-zinc-400 text-sm font-medium rounded-full hover:border-lime-400 hover:text-lime-400 transition-all duration-300"
                >
                  All Projects <ArrowUpRight size={14} />
                </motion.span>
              </Link>
            </FadeIn>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, i) => (
              <FadeIn key={project.id} delay={i * 0.1} y={50}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex flex-col bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden hover:border-[#2a2a2a] transition-all duration-300 hover:shadow-2xl hover:shadow-black/50 h-full"
                >
                  <div className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: "24px 24px",
                      }}
                    />
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
                    <div className="absolute top-4 left-4">
                      <span className="font-mono-custom text-[10px] tracking-widest uppercase px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white/80 border border-white/15">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="px-4 py-2 border border-white/30 rounded-full text-white/80 text-xs backdrop-blur-sm hover:bg-white/10 transition-colors">
                        GitHub
                      </a>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="px-4 py-2 bg-lime-400 rounded-full text-zinc-950 text-xs font-semibold hover:bg-lime-300 transition-colors">
                        Live Demo
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="font-display text-2xl tracking-wide text-white mb-2 group-hover:text-lime-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed flex-1 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="tag-pill">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CTA BAND ════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="glow-blob w-[500px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-lime-400/[0.05]" />

        <FadeIn className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="section-label justify-center mb-6">Let's Collaborate</p>
          <h2 className="font-display text-[clamp(3rem,8vw,6rem)] leading-none tracking-wide text-white mb-6">
            HAVE AN IDEA?
            <br />
            <span className="text-lime-400">LET'S BUILD IT.</span>
          </h2>
          <p className="text-zinc-500 mb-10 max-w-md mx-auto leading-relaxed">
            Whether you need a new product built from scratch or want to level up
            your existing platform — I'm here for it.
          </p>
          <Link to="/contact">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-lime-400 text-zinc-950 font-semibold rounded-full text-base shadow-2xl shadow-lime-400/20 hover:bg-lime-300 transition-colors"
            >
              Start a Conversation <ArrowRight size={18} strokeWidth={2.5} />
            </motion.span>
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}