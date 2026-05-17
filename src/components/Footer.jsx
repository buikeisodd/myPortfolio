import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, ArrowUpRight, Heart } from "lucide-react";
import { motion } from "framer-motion";

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          {/* Logo + tagline */}
          <div>
            <Link to="/" className="flex items-center gap-1 group mb-2">
              <span className="font-mono-custom text-lime-400 text-base">
                &lt;
              </span>
              <span className="font-mono-custom text-base font-semibold text-white group-hover:text-lime-400 transition-colors">
                BUIKE
              </span>
              <span className="font-mono-custom text-lime-400 text-base">
                /&gt;
              </span>
            </Link>
            <p className="text-zinc-600 text-sm max-w-xs leading-relaxed">
              Building digital experiences that live at the intersection of
              function and beauty.
            </p>
          </div>

          {/* Nav + socials */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            {/* Nav */}
            <nav className="flex gap-6">
              {footerLinks.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="text-sm text-zinc-500 hover:text-lime-400 transition-colors animated-underline"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-9 h-9 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 hover:border-lime-400 hover:text-lime-400 transition-colors duration-300"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-zinc-700 text-xs font-mono-custom tracking-wide">
            © {year} Buike Dev. All rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
}
