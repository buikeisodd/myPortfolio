import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { projects, CATEGORIES } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

/* ── Page transition wrapper ── */
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = projects.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  return (
    <PageWrapper>
      <div className="min-h-screen pt-24 pb-28">
        {/* ── Header ── */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 mb-16">
          {/* Ambient glow */}
          <div className="glow-blob w-[500px] h-[300px] -top-20 left-0 bg-lime-400/[0.04]" />
          <div className="glow-blob w-[400px] h-[300px] -top-10 right-0 bg-violet-500/[0.05]" />

          <div className="relative">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="section-label mb-5"
            >
              Portfolio
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-display text-[clamp(3.5rem,10vw,7rem)] leading-none tracking-wide text-white mb-4"
            >
              MY <span className="text-lime-400">PROJECTS</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-zinc-500 max-w-xl text-base leading-relaxed"
            >
              A curated collection of projects spanning frontend mastery,
              backend architecture, and everything in between.
            </motion.p>
          </div>
        </div>

        {/* ── Controls: filters + search ── */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
          >
            {/* Category filter tabs */}
            <div className="flex gap-2 p-1.5 bg-[#0f0f0f] border border-[#1e1e1e] rounded-full flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-4 py-2 text-xs font-medium rounded-full transition-colors duration-200 z-10 ${
                    activeCategory === cat
                      ? "text-zinc-950"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {/* Animated active pill */}
                  {activeCategory === cat && (
                    <motion.span
                      layoutId="filterPill"
                      className="absolute inset-0 bg-lime-400 rounded-full"
                      style={{ zIndex: -1 }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  {cat}
                  {cat !== "All" && (
                    <span className="ml-1.5 font-mono-custom text-[9px] opacity-60">
                      ({projects.filter((p) => p.category === cat).length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative group">
              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-lime-400 transition-colors"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects, tech..."
                className="pl-9 pr-8 py-2.5 bg-[#0f0f0f] border border-[#1e1e1e] rounded-full text-sm text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-lime-400/40 focus:shadow-[0_0_0_3px_rgba(163,230,53,0.08)] transition-all w-56 font-mono-custom"
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-colors"
                  >
                    <X size={12} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Result count */}
          <motion.p
            key={`${activeCategory}-${searchQuery}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 font-mono-custom text-xs text-zinc-700 tracking-wider"
          >
            Showing {filtered.length} of {projects.length} projects
            {activeCategory !== "All" && ` in ${activeCategory}`}
            {searchQuery && ` for "${searchQuery}"`}
          </motion.p>
        </div>

        {/* ── Project Grid ── */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div
                layout
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-28 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#111] border border-[#1e1e1e] flex items-center justify-center mb-5">
                  <Search size={24} className="text-zinc-700" />
                </div>
                <h3 className="font-display text-2xl text-zinc-600 tracking-wide mb-2">
                  NO RESULTS
                </h3>
                <p className="text-zinc-700 text-sm mb-6">
                  No projects match your current filters.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("All");
                    setSearchQuery("");
                  }}
                  className="px-5 py-2.5 border border-zinc-800 text-zinc-500 text-sm rounded-full hover:border-lime-400 hover:text-lime-400 transition-all duration-300"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
}
