// Single source of truth for everything on the site. Keep this in sync with the resume PDF.

export const site = {
  url: "https://mihir0336.vercel.app",
  title: "Mihir Patel | Full Stack Developer",
  description:
    "Mihir Patel is a Full Stack Developer in Ahmedabad, India, building with React, Next.js, TypeScript and Node.js, with 1+ year of paid remote experience shipping production features for a US-based multiplayer gaming platform and a freelance SaaS client.",
  resume: "/Mihir_Patel_CV.pdf",
};

export const profile = {
  name: "Mihir Patel",
  role: "Full Stack Developer",
  // The stack from the resume headline.
  headline: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB"],
  pitch:
    "I build full-stack web apps with React, Next.js and TypeScript. For 1+ year I've been paid to ship production features remotely: in-game UIs for a US-based multiplayer GTA V server, and a freelance client's WhatsApp marketing SaaS.",
  // Rendered in the foreground colour inside the pitch; must appear verbatim in `pitch`.
  pitchHighlight: "paid to ship production features remotely",
  location: "Ahmedabad, Gujarat, India",
  locationShort: "Ahmedabad, IN",
  email: "mihirpatel0336@gmail.com",
  phone: "+91 96647 92131",
  phoneHref: "tel:+919664792131",
  github: "https://github.com/Mihir0336",
  linkedin: "https://www.linkedin.com/in/mihirpatel0336",
  languages: ["English (fluent)", "Hindi (native)", "Gujarati (native)"],
};

export type Experience = {
  role: string;
  company: string;
  companyNote: string;
  // Shown as a small tag next to the company when set, e.g. "US".
  region?: string;
  location: string;
  start: string;
  end: string;
  current: boolean;
  points: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    role: "Full Stack Developer",
    company: "Legacy Network",
    companyNote: "US-based multiplayer GTA V roleplay server",
    region: "US",
    location: "Contract · Remote",
    start: "Aug 2025",
    end: "Present",
    current: true,
    points: [
      "Build in-game user interfaces in React and Svelte for a live multiplayer GTA V roleplay server.",
      "Write client- and server-side logic in Lua and connect it to the React/Svelte frontends through an event-based messaging layer (FiveM NUI).",
      "Ship features to a live production server, working remotely with the US-based owners across time zones from request to deployment.",
    ],
    tags: ["React", "Svelte", "Lua", "FiveM", "NUI"],
  },
  {
    role: "Full Stack Developer",
    company: "WhatsApp Marketing Platform",
    companyNote: "Freelance client project",
    location: "Remote",
    start: "May 2026",
    end: "Jun 2026",
    current: false,
    points: [
      "Customized and extended a production WhatsApp marketing SaaS for a client, built on React, TypeScript, Express, PostgreSQL (Drizzle ORM), Redis/BullMQ and Socket.io.",
      "Shipped features including a random message-template rotation system, per-account channel limits for super admins, group exclusion, and reply tracking in campaign analytics with Excel exports.",
      "Fixed campaign reliability issues, including completion checks for queued messages, retry handling, contact imports and automation keyword matching.",
      "Deployed and maintained the app on a Linux VPS with Nginx and PM2, including build scripts and database schema migrations.",
    ],
    tags: [
      "React",
      "TypeScript",
      "Express",
      "PostgreSQL",
      "Drizzle ORM",
      "Redis/BullMQ",
      "Socket.io",
      "Nginx",
      "PM2",
    ],
  },
];

export type Project = {
  title: string;
  summary: string;
  highlights: string[];
  tags: string[];
  // Which illustrated cover to draw (see components/project-cover.tsx).
  cover: "billing" | "finance" | "marketplace";
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    title: "Inventory & Billing System",
    summary:
      "Full-stack inventory and billing app with NextAuth authentication and a MySQL database.",
    highlights: [
      "Product and stock tracking with GST-inclusive bill generation",
      "Dashboard with data visualization",
      "Dark/light mode and a fully responsive UI",
    ],
    tags: ["Next.js", "TypeScript", "MySQL", "NextAuth", "Tailwind CSS"],
    cover: "billing",
    // The repo returns 404 (private; checked 2026-10-28). Uncomment once it's public:
    // github: "https://github.com/Mihir0336/inventory-billing-system",
  },
  {
    title: "Personal Finance Visualizer",
    summary: "Personal finance tracker with monthly expense charts and category budgets.",
    highlights: [
      "7 REST API endpoints for transactions, budgets and analytics on MongoDB Atlas",
      "5-second auto-refresh with cross-tab sync",
      "Paginated loading (10 records per page)",
      "Persistent dark mode, deployed on Vercel",
    ],
    tags: ["Next.js", "TypeScript", "MongoDB", "shadcn/ui"],
    cover: "finance",
    github: "https://github.com/Mihir0336/finance-visualizer",
    // The deployment returns 404 DEPLOYMENT_NOT_FOUND (checked 2026-10-28). Uncomment once it's redeployed:
    // live: "https://personal-finance-bay-five.vercel.app",
  },
  {
    title: "UniMart, University Marketplace",
    summary: "Multi-role e-commerce platform with separate admin, seller and buyer portals.",
    highlights: [
      "Product search, cart, checkout with coupons and order tracking",
      "Admins moderate products and ban or unban users",
      "Password hashing, sessions and input validation",
      "Protection against SQL injection and XSS",
    ],
    tags: ["PHP", "MySQL", "JavaScript", "AJAX", "Bootstrap"],
    cover: "marketplace",
    github: "https://github.com/Mihir0336/UniMart-Groceries",
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["JavaScript", "TypeScript", "Python (basic)", "PHP", "Lua", "SQL", "HTML/CSS"],
  },
  { group: "Frontend", items: ["React", "Next.js", "Svelte", "Tailwind CSS", "shadcn/ui"] },
  { group: "Backend", items: ["Node.js", "Next.js API routes", "REST APIs", "NextAuth"] },
  { group: "Databases", items: ["MySQL", "MongoDB (Atlas)"] },
  {
    group: "Tools & Deployment",
    items: ["Git", "GitHub", "Vercel", "Linux VPS", "Nginx", "PM2", "AI coding assistants"],
  },
];

export const education = [
  {
    degree: "B.E. in Computer Engineering",
    school: "Monark University",
    location: "Ahmedabad",
    years: "2025 — Present",
  },
  {
    degree: "Diploma in Computer Engineering",
    school: "LJ Polytechnic (Lok Jagruti Kendra University)",
    location: "Ahmedabad",
    years: "2021 — 2024",
  },
];

export const nav = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
