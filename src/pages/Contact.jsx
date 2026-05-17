import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowUpRight,
} from "lucide-react";

/*
 ╔══════════════════════════════════════════════════════════════╗
 ║   FORMSPREE SETUP — only 1 thing to change                   ║
 ║                                                              ║
 ║  1. Go to https://formspree.io and sign up free              ║
 ║  2. Click "+ New Form", give it any name                     ║
 ║  3. Copy the endpoint URL shown — looks like:                ║
 ║       https://formspree.io/f/xyzabcde                        ║
 ║  4. Paste it below replacing YOUR_FORM_ID                    ║
 ║                                                              ║
 ║  Done! No template, no service ID, no public key needed.     ║
 ╚══════════════════════════════════════════════════════════════╝
*/
const FORMSPREE_URL = "https://formspree.io/f/xlgvrzyo";

/* ── Page transition ── */
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

/* ── Float-label input ── */
const FloatInput = ({
  id,
  label,
  type = "text",
  name,
  required,
  value,
  onChange,
  textarea = false,
}) => {
  const isFilled = value.length > 0;
  const Tag = textarea ? "textarea" : "input";
  return (
    <div className="relative group">
      <Tag
        id={id}
        name={name}
        type={!textarea ? type : undefined}
        required={required}
        value={value}
        onChange={onChange}
        rows={textarea ? 5 : undefined}
        placeholder=" "
        className={`peer w-full bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl px-4 pt-5 pb-2.5 text-sm text-zinc-200 placeholder-transparent
          focus:outline-none focus:border-lime-400/50 focus:shadow-[0_0_0_3px_rgba(163,230,53,0.1)]
          transition-all duration-300 font-sans resize-none ${textarea ? "min-h-[130px]" : ""}`}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 text-sm transition-all duration-200 pointer-events-none
          ${
            isFilled
              ? "top-2 text-[10px] tracking-wider text-lime-400 uppercase font-mono-custom"
              : "top-1/2 -translate-y-1/2 text-zinc-600"
          }
          peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-[10px] peer-focus:tracking-wider peer-focus:text-lime-400 peer-focus:uppercase peer-focus:font-mono-custom
          ${textarea && !isFilled ? "!top-4 !-translate-y-0" : ""}
          ${textarea && isFilled ? "!top-2" : ""}`}
      >
        {label}
      </label>
    </div>
  );
};

/* ── Info item ── */
const InfoItem = ({ icon: Icon, label, value, href }) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
      <Icon size={16} className="text-lime-400" />
    </div>
    <div>
      <p className="font-mono-custom text-[10px] tracking-widest text-zinc-600 uppercase mb-0.5">
        {label}
      </p>
      {href ? (
        <a
          href={href}
          className="text-zinc-300 text-sm hover:text-lime-400 transition-colors animated-underline"
        >
          {value}
        </a>
      ) : (
        <p className="text-zinc-300 text-sm">{value}</p>
      )}
    </div>
  </div>
);

const socials = [
  { icon: Github, href: "https://github.com/buikeisodd", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter / X" },
];

const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm(INITIAL_FORM);
      } else {
        const data = await res.json();
        console.error("Formspree error:", data);
        setStatus("error");
      }
    } catch (err) {
      console.error("Network error:", err);
      setStatus("error");
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen pt-24 pb-28 relative overflow-hidden">
        <div className="glow-blob w-[500px] h-[400px] -top-20 left-0 bg-lime-400/[0.04]" />
        <div className="glow-blob w-[400px] h-[400px] bottom-0 right-0 bg-violet-500/[0.05]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          {/* Header */}
          <div className="mb-16">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="section-label mb-5"
            >
              Get In Touch
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-display text-[clamp(3rem,9vw,6.5rem)] leading-none tracking-wide text-white"
            >
              LET'S <span className="text-lime-400">WORK</span>
              <br />
              TOGETHER
            </motion.h1>
          </div>

          {/* Two columns */}
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className="text-zinc-500 leading-relaxed mb-10 text-base max-w-sm">
                Have a project in mind, need a collaborator, or just want to say
                hi? My inbox is always open — I'll get back to you within 24
                hours.
              </p>

              <div className="flex flex-col gap-7 mb-12">
                <InfoItem
                  icon={Mail}
                  label="Email"
                  value="chibuikeeseagwu02@gmail.com"
                  href="mailto:chibuikeeseagwu02@gmail.com"
                />
                <InfoItem
                  icon={MapPin}
                  label="Location"
                  value="Lagos, Nigeria — Remote Friendly"
                />
              </div>

              <div className="h-px bg-white/5 mb-10" />

              <div>
                <p className="font-mono-custom text-[10px] tracking-widest text-zinc-700 uppercase mb-5">
                  Find me on
                </p>
                <div className="flex flex-col gap-3">
                  {socials.map(({ icon: Icon, href, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 6 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-[#0f0f0f] border border-[#1e1e1e] group hover:border-zinc-700 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          size={16}
                          className="text-zinc-500 group-hover:text-lime-400 transition-colors"
                        />
                        <span className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">
                          {label}
                        </span>
                      </div>
                      <ArrowUpRight
                        size={14}
                        className="text-zinc-700 group-hover:text-lime-400 transition-colors"
                      />
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex items-center gap-3 px-5 py-3.5 rounded-xl bg-lime-400/8 border border-lime-400/15 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400" />
                </span>
                <span className="font-mono-custom text-xs text-lime-400 tracking-wider">
                  Available for new projects
                </span>
              </div>
            </motion.div>

            {/* RIGHT: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-2xl p-8 lg:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-lime-400/[0.04] to-transparent rounded-2xl" />

                <h2 className="font-display text-3xl tracking-wide text-white mb-2">
                  SEND A MESSAGE
                </h2>
                <p className="text-zinc-600 text-sm mb-8">
                  Fill out the form and I'll respond as soon as possible.
                </p>

                <AnimatePresence mode="wait">
                  {/* Success */}
                  {status === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-16 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          delay: 0.1,
                        }}
                        className="w-20 h-20 rounded-full bg-lime-400/15 border border-lime-400/30 flex items-center justify-center mb-6"
                      >
                        <CheckCircle size={36} className="text-lime-400" />
                      </motion.div>
                      <h3 className="font-display text-3xl text-white tracking-wide mb-3">
                        MESSAGE SENT!
                      </h3>
                      <p className="text-zinc-500 text-sm mb-8 max-w-xs">
                        Thanks for reaching out. I'll be in touch within 24
                        hours.
                      </p>
                      <button
                        onClick={() => setStatus("idle")}
                        className="px-6 py-3 border border-zinc-700 text-zinc-400 text-sm rounded-full hover:border-lime-400 hover:text-lime-400 transition-all"
                      >
                        Send another
                      </button>
                    </motion.div>
                  )}

                  {/* Error */}
                  {status === "error" && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-10 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-4">
                        <AlertCircle size={28} className="text-red-400" />
                      </div>
                      <h3 className="font-display text-2xl text-white tracking-wide mb-2">
                        SOMETHING WENT WRONG
                      </h3>
                      <p className="text-zinc-500 text-sm mb-6">
                        Couldn't send the message. Double-check your Formspree
                        URL or email me directly.
                      </p>
                      <button
                        onClick={() => setStatus("idle")}
                        className="px-6 py-3 border border-zinc-700 text-zinc-400 text-sm rounded-full hover:border-red-400 hover:text-red-400 transition-all"
                      >
                        Try again
                      </button>
                    </motion.div>
                  )}

                  {/* Form */}
                  {(status === "idle" || status === "sending") && (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-4"
                    >
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FloatInput
                          id="name"
                          name="name"
                          label="Your Name"
                          required
                          value={form.name}
                          onChange={handleChange}
                        />
                        <FloatInput
                          id="email"
                          name="email"
                          label="Email Address"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                        />
                      </div>
                      <FloatInput
                        id="subject"
                        name="subject"
                        label="Subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                      />
                      <FloatInput
                        id="message"
                        name="message"
                        label="Your Message"
                        textarea
                        required
                        value={form.message}
                        onChange={handleChange}
                      />

                      <motion.button
                        type="submit"
                        disabled={status === "sending"}
                        whileHover={status !== "sending" ? { scale: 1.03 } : {}}
                        whileTap={status !== "sending" ? { scale: 0.97 } : {}}
                        className={`mt-2 flex items-center justify-center gap-3 w-full py-4 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg ${
                          status === "sending"
                            ? "bg-lime-400/50 text-zinc-950/60 cursor-not-allowed"
                            : "bg-lime-400 text-zinc-950 hover:bg-lime-300 shadow-lime-400/20"
                        }`}
                      >
                        {status === "sending" ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />{" "}
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={15} strokeWidth={2.5} /> Send Message
                          </>
                        )}
                      </motion.button>

                      <p className="text-center font-mono-custom text-[10px] text-zinc-700 tracking-wide mt-1">
                        Your information is private and never shared.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
