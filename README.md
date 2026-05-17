# ⚡ Dev Portfolio — Alex Morgan

A sleek, dark-themed developer portfolio built with **Vite + React + Tailwind CSS + Framer Motion**.

---

## 🚀 Features

- **Custom animated cursor** with lag ring (desktop only)
- **Smooth page transitions** powered by Framer Motion
- **Hero section** with cycling role titles, floating code card & ambient glows
- **About section** with animated tech stack grid
- **Projects page** with:
  - Live category filter tabs (animated pill indicator)
  - Real-time search bar
  - Animated card grid with `AnimatePresence` layout transitions
  - Hover overlays with GitHub / Live Demo links
- **Contact page** with:
  - Float-label form inputs
  - **EmailJS integration** — emails land directly in your inbox, no backend needed
  - Success & error states with animations
- **Responsive** — mobile-first, hamburger menu with clip-path reveal animation
- **Grain texture overlay** for depth
- **Custom scrollbar** in accent color
- **Google Fonts**: Bebas Neue (display), DM Sans (body), JetBrains Mono (code)

---

## 📦 Stack

| Tool | Purpose |
|---|---|
| Vite | Build tool & dev server |
| React 18 | UI framework |
| Tailwind CSS v3 | Utility-first styling |
| Framer Motion | Animations & page transitions |
| React Router DOM v6 | Client-side routing |
| @emailjs/browser | Send emails from the browser |
| Lucide React | Icon library |

---

## 🛠 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## ✉️ Setting Up EmailJS (Contact Form)

The contact form sends emails **directly from the browser** — no backend or server required.

### Step-by-step:

1. **Create a free account** at [emailjs.com](https://www.emailjs.com)

2. **Add an Email Service** (Gmail, Outlook, Yahoo, etc.)
   - Dashboard → Email Services → Add New Service
   - Follow the OAuth/SMTP instructions
   - Copy your **Service ID** (e.g. `service_abc123`)

3. **Create an Email Template**
   - Dashboard → Email Templates → Create New Template
   - Use these exact variable names in your template:

   ```
   From: {{user_name}} <{{user_email}}>
   Subject: {{subject}}
   
   Message:
   {{message}}
   ```

   - Copy your **Template ID** (e.g. `template_xyz789`)

4. **Get your Public Key**
   - Dashboard → Account → General → Public Key

5. **Update `src/pages/Contact.jsx`** — replace the three constants at the top:

   ```js
   const EMAILJS_SERVICE_ID  = 'service_abc123'   // ← your Service ID
   const EMAILJS_TEMPLATE_ID = 'template_xyz789'  // ← your Template ID
   const EMAILJS_PUBLIC_KEY  = 'aB1cD2eF3...'     // ← your Public Key
   ```

That's it — hit submit on the contact form and the email arrives in your inbox! 🎉

---

## 🎨 Personalising the Portfolio

### Update your info
| File | What to change |
|---|---|
| `index.html` | Page `<title>` and meta description |
| `src/components/Navbar.jsx` | Your name in the logo |
| `src/pages/Home.jsx` | Name, bio, roles, stats, tech stack |
| `src/components/Footer.jsx` | Social media links |
| `src/pages/Contact.jsx` | Email address, location, social links |

### Update projects
Edit **`src/data/projects.js`** — each project has:
```js
{
  id: 1,
  title: 'Project Name',
  description: 'What it does...',
  category: 'Fullstack',    // All | Frontend | Backend | Fullstack | Mobile
  tags: ['React', 'Node.js'],
  gradient: 'from-violet-600 via-purple-700 to-indigo-800', // Tailwind gradient
  accent: '#7c3aed',
  githubUrl: 'https://github.com/you/repo',
  liveUrl: 'https://your-project.com',
  featured: true,           // Shows on home page (max 3)
  year: '2024',
}
```

### Change colour accent
The accent colour is **lime green (`#a3e635`)** throughout. To change it globally:
1. Find-replace `#a3e635` in `src/index.css`
2. Find-replace `lime-400` / `lime-300` in all JSX files
3. Update `tailwind.config.js` colours if needed

---

## 📁 Project Structure

```
portfolio/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── projects.js          # All project data
    ├── components/
    │   ├── Navbar.jsx            # Fixed nav + mobile menu
    │   ├── Footer.jsx
    │   ├── CustomCursor.jsx      # Animated cursor (desktop)
    │   └── ProjectCard.jsx       # Reusable project card
    └── pages/
        ├── Home.jsx              # Hero, about, stats, featured work
        ├── Projects.jsx          # Filter + search + all projects
        └── Contact.jsx           # EmailJS contact form
```

---

## 🌍 Deployment

Works with any static host:

```bash
npm run build   # outputs to /dist
```

| Platform | Notes |
|---|---|
| **Vercel** | Connect repo → auto-deploys on push |
| **Netlify** | Drag & drop `/dist` folder or connect repo |
| **GitHub Pages** | Add `base` option to `vite.config.js` |

For React Router to work on Netlify, add a `public/_redirects` file:
```
/*  /index.html  200
```

---

## 📄 License

MIT — free to use and modify for personal and commercial projects.
