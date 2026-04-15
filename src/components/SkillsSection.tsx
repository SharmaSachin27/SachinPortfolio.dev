import { motion } from "framer-motion";
import SkillsOrb from "./SkillsOrb";

const skillCategories = [
  {
    title: "Backend",
    skills: [
      { name: "PHP", level: 95 },
      { name: "Laravel", level: 90 },
      { name: "CodeIgniter", level: 88 },
      { name: "Node.js", level: 85 },
      { name: "REST APIs", level: 92 },
    ],
  },
  {
    title: "Frontend & 3D",
    skills: [
      { name: "React", level: 85 },
      { name: "Three.js", level: 78 },
      { name: "JavaScript / TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML / CSS", level: 92 },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS (EC2, S3, Lambda)", level: 82 },
      { name: "Docker", level: 78 },
      { name: "MySQL / PostgreSQL", level: 88 },
      { name: "Linux / Nginx", level: 83 },
      { name: "CI/CD Pipelines", level: 75 },
    ],
  },
];

const SkillBar = ({ name, level, delay }: { name: string; level: number; delay: number }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-foreground font-medium">{name}</span>
      <span className="text-muted-foreground font-mono">{level}%</span>
    </div>
    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ background: 'var(--gradient-primary)' }}
      />
    </div>
  </div>
);

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding bg-card/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-primary font-mono text-sm mb-3">// skills</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Technical <span className="gradient-text">Proficiency</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-10"
        >
          <SkillsOrb />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.15 }}
              className="glass-card rounded-xl p-6 space-y-5"
            >
              <h3 className="font-semibold text-lg text-foreground border-b border-border/50 pb-3">
                {cat.title}
              </h3>
              {cat.skills.map((skill, si) => (
                <SkillBar key={skill.name} {...skill} delay={ci * 0.15 + si * 0.08} />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
