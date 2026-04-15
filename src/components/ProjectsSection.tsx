import { motion } from "framer-motion";
import { Github, ExternalLink, TrendingUp, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Laravel SaaS Billing Platform",
    category: "Backend",
    description:
      "Multi-tenant SaaS platform with subscription billing, Stripe integration, role-based access control and automated invoice generation.",
    stack: ["Laravel", "PHP", "MySQL", "Stripe"],
    result: "Handles 1K+ active subscriptions monthly",
    github: "https://github.com/KrishnaDevFlow",
    live: null,
  },
  {
    title: "3D Portfolio & Product Viewer",
    category: "Full-Stack",
    description:
      "Interactive 3D product configurator built with React Three Fiber — real-time material swapping, orbit controls and GLTF model loading.",
    stack: ["React", "Three.js", "React Three Fiber", "TypeScript"],
    result: "Sub-100ms render · smooth 60fps on mobile",
    github: "https://github.com/KrishnaDevFlow",
    live: "https://example.com",
  },
  {
    title: "Node.js Real-Time Chat API",
    category: "Backend",
    description:
      "Scalable WebSocket chat backend with rooms, presence indicators, message history and JWT authentication deployed on AWS EC2.",
    stack: ["Node.js", "Express", "WebSocket", "AWS EC2"],
    result: "Supports 500+ concurrent connections",
    github: "https://github.com/KrishnaDevFlow",
    live: null,
  },
  {
    title: "CodeIgniter ERP Module",
    category: "Backend",
    description:
      "Custom ERP inventory and HR module built on CodeIgniter 4 with PDF reporting, role permissions and REST API for mobile clients.",
    stack: ["CodeIgniter 4", "PHP", "MySQL", "AWS S3"],
    result: "Deployed across 3 client businesses",
    github: "https://github.com/KrishnaDevFlow",
    live: "https://example.com",
  },
];

const categoryColor: Record<string, string> = {
  "Backend": "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
  "AWS & DevOps": "text-orange-400 bg-orange-400/10 border-orange-400/20",
  "Full-Stack": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => (
  <motion.article
    custom={index}
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-60px" }}
    className="glass-card glow-border rounded-2xl overflow-hidden group flex flex-col"
  >
    {/* top accent bar */}
    <div className="h-0.5 w-full" style={{ background: "var(--gradient-primary)" }} />

    <div className="p-6 md:p-7 flex flex-col flex-1 gap-4">
      {/* header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-xs text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-snug">
            {project.title}
          </h3>
        </div>
        <span
          className={`shrink-0 text-xs font-mono px-2.5 py-1 rounded-full border ${categoryColor[project.category] ?? "text-primary bg-primary/10 border-primary/20"}`}
        >
          {project.category}
        </span>
      </div>

      {/* description */}
      <p className="text-muted-foreground text-sm leading-relaxed flex-1">
        {project.description}
      </p>

      {/* tech stack */}
      <div className="flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground border border-border/40"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* divider */}
      <div className="border-t border-border/40" />

      {/* result + links */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
          <TrendingUp className="w-3.5 h-3.5 shrink-0" />
          <span>{project.result}</span>
        </div>

        <div className="flex items-center gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border/40 hover:border-primary/40 transition-all duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-3.5 h-3.5" />
              Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg text-primary-foreground border border-primary/60 hover:border-primary transition-all duration-200"
              style={{ background: "var(--gradient-primary)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live
            </a>
          )}
        </div>
      </div>
    </div>
  </motion.article>
);

const ProjectsSection = () => (
  <section id="projects" className="section-padding">
    <div className="section-container">
      {/* heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mb-12"
      >
        <p className="text-primary font-mono text-sm mb-3">// projects</p>
        <h2 className="text-3xl md:text-4xl font-bold">
          Featured <span className="gradient-text">Work</span>
        </h2>
        <p className="text-muted-foreground mt-3 max-w-xl">
          A selection of backend systems, cloud infrastructure, and full-stack products built for scale.
        </p>
      </motion.div>

      {/* grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-10 flex justify-center"
      >
        <a
          href="https://github.com/KrishnaDevFlow"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary border border-border/50 hover:border-primary/40 px-5 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
        >
          <Github className="w-4 h-4" />
          View all projects on GitHub
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </motion.div>
    </div>
  </section>
);

export default ProjectsSection;
