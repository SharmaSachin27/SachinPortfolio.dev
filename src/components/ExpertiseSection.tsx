import { motion } from "framer-motion";
import {
  Server,
  Zap,
  Cloud,
  CheckCircle2,
  Award,
  Database,
  GitBranch,
  Globe,
  HardDrive,
  Layers,
  Lock,
  RefreshCw,
  ShieldCheck,
  Workflow,
} from "lucide-react";

const expertise = [
  {
    id: "php",
    icon: Server,
    accentColor: "#6366f1",
    label: "Backend Engineering",
    headline: "PHP, Laravel & CodeIgniter",
    summary:
      "Building production-grade server-side systems with PHP — from Laravel-powered REST APIs to CodeIgniter MVC apps — with a focus on clean architecture and performance.",
    capabilities: [
      { icon: Layers,    text: "Laravel 10/11 — Eloquent, queues, events" },
      { icon: Globe,     text: "RESTful API design & versioning" },
      { icon: Database,  text: "MySQL / PostgreSQL query optimisation" },
      { icon: Lock,      text: "Auth: Sanctum, Passport, JWT, OAuth 2.0" },
      { icon: GitBranch, text: "CodeIgniter 3 & 4 MVC applications" },
    ],
    chips: ["PHP 8.x", "Laravel 11", "CodeIgniter 4", "MySQL", "Composer"],
    stat: { value: "5+", label: "years of PHP development" },
  },
  {
    id: "node",
    icon: Zap,
    accentColor: "#22c55e",
    label: "Full-Stack & 3D",
    headline: "Node.js, React & Three.js",
    summary:
      "Crafting high-performance APIs with Node.js and interactive UIs with React — including immersive 3D experiences powered by Three.js and React Three Fiber.",
    capabilities: [
      { icon: Zap,       text: "Node.js REST APIs with Express" },
      { icon: RefreshCw, text: "React — hooks, context, performance optimisation" },
      { icon: Workflow,  text: "Three.js & React Three Fiber 3D scenes" },
      { icon: Lock,      text: "TypeScript across the full stack" },
      { icon: Database,  text: "WebSocket & real-time event streaming" },
    ],
    chips: ["Node.js", "React", "Three.js", "TypeScript", "Tailwind CSS"],
    stat: { value: "3D", label: "interactive web experiences" },
  },
  {
    id: "aws",
    icon: Cloud,
    accentColor: "#f97316",
    label: "Cloud & DevOps",
    headline: "AWS Cloud",
    summary:
      "AWS certified with hands-on experience deploying and managing cloud infrastructure — from EC2 and S3 to Lambda serverless functions.",
    capabilities: [
      { icon: HardDrive,   text: "EC2 instances, auto-scaling & load balancers" },
      { icon: Cloud,       text: "S3 storage, CloudFront CDN & signed URLs" },
      { icon: Zap,         text: "Lambda serverless functions & API Gateway" },
      { icon: ShieldCheck, text: "IAM roles, VPC & security groups" },
      { icon: RefreshCw,   text: "CI/CD with GitHub Actions & Docker" },
    ],
    chips: ["EC2", "S3", "Lambda", "RDS", "CloudFront", "IAM"],
    stat: { value: "AWS", label: "AWS Cloud certified" },
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: "easeOut" },
  }),
};

type ExpertiseItem = typeof expertise[number];

function ExpertiseCard({ item, index }: { item: ExpertiseItem; index: number }) {
  const Icon = item.icon;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="glass-card glow-border rounded-2xl overflow-hidden flex flex-col group"
    >
      <div className="h-0.5 w-full" style={{ background: item.accentColor }} />

      <div className="p-7 flex flex-col gap-5 flex-1">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
            style={{ background: `${item.accentColor}20`, border: `1px solid ${item.accentColor}40` }}
          >
            <Icon className="w-5 h-5" style={{ color: item.accentColor }} />
          </div>
          <span
            className="text-xs font-mono font-medium px-2.5 py-1 rounded-full border"
            style={{ color: item.accentColor, background: `${item.accentColor}12`, borderColor: `${item.accentColor}30` }}
          >
            {item.label}
          </span>
        </div>

        <div>
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {item.headline}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{item.summary}</p>
        </div>

        <ul className="space-y-2.5">
          {item.capabilities.map(({ icon: CapIcon, text }) => (
            <li key={text} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: item.accentColor }} />
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <div className="flex-1" />

        <div className="flex flex-wrap gap-2">
          {item.chips.map((chip) => (
            <span
              key={chip}
              className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground border border-border/40"
            >
              {chip}
            </span>
          ))}
        </div>

        <div className="border-t border-border/40" />

        <div className="flex items-center gap-3">
          <span className="text-2xl font-extrabold font-mono" style={{ color: item.accentColor }}>
            {item.stat.value}
          </span>
          <span className="text-xs text-muted-foreground leading-tight">{item.stat.label}</span>
        </div>
      </div>
    </motion.div>
  );
}

function CertBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mt-12 flex justify-center"
    >
      <div className="glass-card rounded-2xl px-8 py-5 flex items-center gap-5 border border-orange-400/20 max-w-md w-full">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-orange-400/10 border border-orange-400/30">
          <Award className="w-6 h-6 text-orange-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">AWS Cloud certified</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Foundational · Cloud concepts, services & security
          </p>
        </div>
        <div className="ml-auto shrink-0">
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-orange-400/10 text-orange-400 border border-orange-400/20">
            Certified
          </span>
        </div>
      </div>
    </motion.div>
  );
}

const ExpertiseSection = () => (
  <section id="expertise" className="section-padding bg-card/20">
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mb-12"
      >
        <p className="text-primary font-mono text-sm mb-3">// expertise</p>
        <h2 className="text-3xl md:text-4xl font-bold">
          Core <span className="gradient-text">Expertise</span>
        </h2>
        <p className="text-muted-foreground mt-3 max-w-xl">
          Deep specialisation across backend engineering, API development, and AWS cloud infrastructure.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {expertise.map((item, i) => (
          <ExpertiseCard key={item.id} item={item} index={i} />
        ))}
      </div>

      <CertBadge />
    </div>
  </section>
);

export default ExpertiseSection;
