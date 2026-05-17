import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#050505]/85 backdrop-blur-2xl border-b border-white/5 shadow-2xl shadow-black/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1 group">
              <span className="font-mono-custom text-lime-400 text-sm">
                &lt;
              </span>
              <span className="font-mono-custom text-sm font-semibold text-white group-hover:text-lime-400 transition-colors duration-300 tracking-wide">
                BUIKE
              </span>
              <span className="font-mono-custom text-lime-400 text-sm">
                /&gt;
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg hover:text-lime-400 ${
                    location.pathname === link.href
                      ? "text-lime-400"
                      : "text-zinc-400"
                  }`}
                >
                  {link.label}
                  {location.pathname === link.href && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-4 right-4 h-px bg-lime-400"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/contact">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-lime-400 text-zinc-950 text-sm font-semibold rounded-full hover:bg-lime-300 transition-colors duration-300 shadow-lg shadow-lime-400/20"
                >
                  Hire Me <ArrowUpRight size={14} strokeWidth={2.5} />
                </motion.span>
              </Link>
            </div>

            {/* Mobile: Hamburger */}
            <button
              onClick={() => setMenuOpen((p) => !p)}
              className="md:hidden p-2 text-zinc-400 hover:text-lime-400 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              clipPath: "circle(0% at calc(100% - 40px) 40px)",
            }}
            animate={{
              opacity: 1,
              clipPath: "circle(150% at calc(100% - 40px) 40px)",
            }}
            exit={{
              opacity: 0,
              clipPath: "circle(0% at calc(100% - 40px) 40px)",
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#050505] flex flex-col items-center justify-center md:hidden"
          >
            {/* Close button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-6 p-2 text-zinc-400 hover:text-lime-400 transition-colors"
            >
              <X size={26} />
            </button>

            {/* Nav links */}
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15 + i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                    duration: 0.5,
                  }}
                >
                  <Link
                    to={link.href}
                    className={`font-display text-6xl tracking-wide transition-colors duration-300 hover:text-lime-400 ${
                      location.pathname === link.href
                        ? "text-lime-400"
                        : "text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.38,
                  ease: [0.22, 1, 0.36, 1],
                  duration: 0.5,
                }}
                className="mt-6"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-lime-400 text-zinc-950 font-semibold rounded-full text-lg"
                >
                  Hire Me <ArrowUpRight size={18} />
                </Link>
              </motion.div>
            </nav>

            {/* Decorative */}
            <div className="absolute bottom-10 font-mono-custom text-xs text-zinc-700 tracking-widest">
              PORTFOLIO — 2024
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
