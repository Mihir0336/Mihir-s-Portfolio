// Single source of truth for everything on the site. Keep this in sync with the resume PDF.

export const site = {
  url: "https://mihir0336.vercel.app",
  title: "Mihir Patel | Full Stack Developer",
  description:
    "Mihir Patel is a Full Stack Developer in Ahmedabad, India, building with Next.js, React, TypeScript and Node.js, with 1+ year of paid remote experience shipping for live GTA V roleplay communities.",
  resume: "/Mihir_Patel_CV.pdf",
};

export const profile = {
  name: "Mihir Patel",
  role: "Full Stack Developer",
  pitch:
    "I build full-stack web apps with Next.js, React and TypeScript, and for 1+ year I've been paid to ship gameplay systems and in-game UIs remotely for two live GTA V roleplay communities.",
  // Rendered in the foreground colour inside the pitch; must appear verbatim in `pitch`.
  pitchHighlight: "paid to ship gameplay systems and in-game UIs",
  location: "Ahmedabad, Gujarat, India",
  locationShort: "Ahmedabad, IN",
  email: "mihirpatel0336@gmail.com",
  phone: "+91 96647 92131",
  phoneHref: "tel:+919664792131",
  github: "https://github.com/Mihir0336",
  linkedin: "https://www.linkedin.com/in/mihirpatel0336",
};

export type Experience = {
  role: string;
  company: string;
  companyNote: string;
  region: string;
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
    companyNote: "US-based GTA V roleplay server",
    region: "US",
    location: "Remote",
    start: "Aug 2025",
    end: "Present",
    current: true,
    points: [
      "Build custom FiveM gameplay scripts in Lua, on both the client and server side.",
      "Build in-game UIs in React and Svelte, connected to Lua through FiveM's NUI messaging.",
      "Work remotely with the server owners across time zones.",
    ],
    tags: ["Lua", "React", "Svelte", "FiveM", "NUI"],
  },
  {
    role: "Full Stack Developer",
    company: "Yatra Roleplay",
    companyNote: "Indian GTA V roleplay server",
    region: "IN",
    location: "Remote",
    start: "Aug 2025",
    end: "Present",
    current: true,
    points: [
      "Write custom Lua scripts and React/Svelte interfaces.",
      "Ship features for two live communities in parallel.",
    ],
    tags: ["Lua", "React", "Svelte", "FiveM"],
  },
];

export type Project = {
  title: string;
  summary: string;
  highlights: string[];
  tags: string[];
  // Which illustrated cover to draw (see components/project-cover.tsx).
  cover: "billing" | "finance" | "marketplace" | "stock";
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    title: "Inventory & Billing System",
    summary: "Full-stack inventory and billing app with an analytics dashboard.",
    highlights: [
      "Authentication",
      "Stock tracking",
      "GST-inclusive billing",
      "Dashboard with charts",
    ],
    tags: ["Next.js", "TypeScript", "Prisma ORM", "MySQL", "NextAuth", "Tailwind CSS"],
    cover: "billing",
    // The repo currently returns 404 (private). Uncomment once it's public:
    // github: "https://github.com/Mihir0336/inventory-billing-system",
  },
  {
    title: "Personal Finance Visualizer",
    summary: "Personal finance tracker with budgets and monthly charts.",
    highlights: [
      "7 REST endpoints",
      "Monthly charts",
      "Budgets",
      "5-sec auto-refresh with cross-tab sync",
    ],
    tags: ["Next.js 14", "TypeScript", "MongoDB", "Recharts", "shadcn/ui"],
    cover: "finance",
    github: "https://github.com/Mihir0336/finance-visualizer",
    // The deployment returns 404 DEPLOYMENT_NOT_FOUND (checked 2026-10-27). Uncomment once it's redeployed:
    // live: "https://personal-finance-bay-five.vercel.app",
  },
  {
    title: "UniMart, University Marketplace",
    summary: "University marketplace with separate admin, seller and buyer portals.",
    highlights: [
      "Admin, seller and buyer portals",
      "Cart and coupons",
      "Order tracking",
      "SQL injection and XSS protection",
    ],
    tags: ["PHP", "MySQL", "JavaScript", "jQuery/AJAX", "Bootstrap"],
    cover: "marketplace",
    github: "https://github.com/Mihir0336/UniMart-Groceries",
  },
  {
    title: "Stock Management System",
    summary: "Inventory and GST billing system built for Agricon Shop.",
    highlights: ["Inventory management", "GST billing", "Admin panel"],
    tags: ["PHP", "MySQL", "JavaScript"],
    cover: "stock",
    github: "https://github.com/Mihir0336/Stock-Management-System",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["JavaScript", "TypeScript", "Lua", "PHP", "SQL", "HTML", "CSS"] },
  {
    group: "Frontend",
    items: ["React", "Next.js", "Svelte", "Tailwind CSS", "shadcn/ui", "Framer Motion", "Recharts"],
  },
  { group: "Backend", items: ["Node.js", "Express", "REST APIs", "NextAuth", "Prisma ORM"] },
  { group: "Databases", items: ["MySQL", "MongoDB"] },
  { group: "Game dev", items: ["FiveM (CitizenFX)", "NUI"] },
  { group: "Tools", items: ["Git", "GitHub", "Vercel", "VS Code"] },
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
