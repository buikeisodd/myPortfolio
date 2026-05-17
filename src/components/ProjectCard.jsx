import { motion } from "framer-motion";
import { Github, ExternalLink, Calendar } from "lucide-react";

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{
        opacity: { duration: 0.4, delay: index * 0.06 },
        y: { duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] },
        layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      }}
      className="group relative flex flex-col bg-[#111111] border border-[#1e1e1e] rounded-2xl overflow-hidden card-hover"
    >
      {/* Gradient visual header */}
      <div
        className={`relative h-44 bg-gradient-to-br ${project.gradient} overflow-hidden flex-shrink-0`}
      >
        {/* Abstract grid lines */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "28px 28px",
          }}
        />

        {/* Floating circles decoration */}
        <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-white/10 backdrop-blur-sm" />
        <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-white/8" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/12 backdrop-blur-sm" />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="font-mono-custom text-[10px] tracking-widest uppercase px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white/80 border border-white/15">
            {project.category}
          </span>
        </div>

        {/* Year */}
        <div className="absolute top-4 right-4 flex items-center gap-1 text-white/60">
          <Calendar size={11} />
          <span className="font-mono-custom text-[10px]">{project.year}</span>
        </div>

        {/* Hover overlay with links */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm font-medium backdrop-blur-sm hover:bg-white/20 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={14} /> Code
          </motion.a>
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-lime-400 rounded-full text-zinc-950 text-sm font-semibold hover:bg-lime-300 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={14} /> Live
          </motion.a>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display text-2xl tracking-wide text-white mb-2 group-hover:text-lime-400 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-zinc-500 text-sm leading-relaxed flex-1 mb-4">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer links */}
        <div className="flex items-center gap-4 pt-4 border-t border-[#1e1e1e]">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-zinc-600 hover:text-zinc-300 transition-colors text-xs font-mono-custom"
          >
            <Github size={13} /> GitHub
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-zinc-600 hover:text-lime-400 transition-colors text-xs font-mono-custom"
          >
            <ExternalLink size={13} /> Live Demo
          </a>
        </div>
      </div>
    </motion.article>
  );
}
