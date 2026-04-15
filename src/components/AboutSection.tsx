import { motion } from "framer-motion";
import { Award, Code2, Palette, Server } from "lucide-react";

const highlights = [
  { icon: Server, label: "Full-Stack Dev", desc: "PHP, Laravel, Node.js, React" },
  { icon: Award, label: "Cloud & DevOps", desc: "AWS · Deployment · CI/CD" },
  { icon: Palette, label: "3D & UI", desc: "Three.js · React · Tailwind" },
  { icon: Code2, label: "Sachin Sharma", desc: "Freelance · Open to work" },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary font-mono text-sm mb-3">// about me</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Building <span className="gradient-text">Full-Stack Systems</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mb-12 leading-relaxed">
            I'm Sachin Sharma — a freelance full-stack developer with wide experience in PHP,
            Laravel, Node.js, React and AWS. I build clean, scalable web solutions that perform
            from backend architecture through deployment and user-facing experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card glow-border rounded-xl p-6 group"
            >
              <item.icon className="w-8 h-8 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="font-semibold text-foreground mb-1">{item.label}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
