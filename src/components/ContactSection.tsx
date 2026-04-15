import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const WHATSAPP_NUMBER = "9998258543"; // replace with your WhatsApp number, no + or spaces

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters"),
});

type FormData = z.infer<typeof schema>;

const base =
  "w-full px-4 py-3 rounded-lg bg-secondary border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 font-display text-sm";
const ok = "border-border";
const err = "border-destructive focus:ring-destructive/40";

function FieldError({ msg }: { msg?: string }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="flex items-center gap-1.5 text-xs text-destructive mt-1.5"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-8"
    >
      <p className="text-muted-foreground text-lg leading-relaxed">
        Have a project in mind? Fill the form and your message will open directly
        in WhatsApp — I'll get back to you fast.
      </p>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm">sharmashachin98@gmail.com</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm">Remote · Worldwide</span>
        </div>
      </div>

      <div className="glass-card rounded-xl p-4 flex items-center gap-3 border border-border/50 max-w-xs">
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground font-medium">Available for work</span> — typically replies
          within 24 h
        </p>
      </div>
    </motion.div>
  );
}

const ContactSection = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const messageLen = watch("message")?.length ?? 0;

  const onSubmit = (data: FormData) => {
    const text = encodeURIComponent(
      `Hi, I'm ${data.name} (${data.email})\n\n${data.message}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
    reset();
  };

  return (
    <section id="contact" className="section-padding bg-card/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-primary font-mono text-sm mb-3">// contact</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Let's <span className="gradient-text">Connect</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <ContactInfo />

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {isSubmitSuccessful ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card rounded-2xl p-10 flex flex-col items-center text-center gap-4 border border-emerald-500/20"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">WhatsApp opened!</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Your message is pre-filled in WhatsApp. Just hit send!
                  </p>
                  <button
                    onClick={() => reset(undefined, { keepIsSubmitSuccessful: false })}
                    className="mt-2 text-xs font-mono text-primary hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="glass-card rounded-2xl p-6 md:p-8 space-y-5 border border-border/50"
                >
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      autoComplete="name"
                      {...register("name")}
                      className={`${base} ${errors.name ? err : ok}`}
                    />
                    <FieldError msg={errors.name?.message} />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      {...register("email")}
                      className={`${base} ${errors.email ? err : ok}`}
                    />
                    <FieldError msg={errors.email?.message} />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-mono text-muted-foreground">Message</label>
                      <span
                        className={`text-xs font-mono tabular-nums ${
                          messageLen > 1800 ? "text-destructive" : "text-muted-foreground"
                        }`}
                      >
                        {messageLen}/2000
                      </span>
                    </div>
                    <textarea
                      rows={5}
                      placeholder="Tell me about your project..."
                      {...register("message")}
                      className={`${base} resize-none ${errors.message ? err : ok}`}
                    />
                    <FieldError msg={errors.message?.message} />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-[var(--shadow-glow)]"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    <Send className="w-4 h-4" />
                    Send via WhatsApp
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
