import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import Shuffle from "@/components/Shuffle";
import MagneticButton from "@/components/animations/MagneticButton";
import StaggerText from "@/components/animations/StaggerText";
import FloatingElement from "@/components/animations/FloatingElement";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-24 px-6 sm:px-8 min-h-[80vh] flex items-center overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(0, 0, 0, 0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(0, 0, 0, 0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(0, 0, 0, 0.05) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating decorative elements */}
      <FloatingElement delay={0} duration={4} className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-xl" />
      <FloatingElement delay={1} duration={5} className="absolute bottom-40 left-10 w-32 h-32 bg-gradient-to-br from-accent/10 to-accent/5 rounded-full blur-xl" />
      <FloatingElement delay={2} duration={3.5} className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-full blur-xl" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <h1 
                className="text-5xl sm:text-6xl md:text-7xl text-balance text-gray-200"
                style={{ 
                  fontFamily: '"Audiowide", sans-serif', 
                  fontWeight: 400, 
                  fontStyle: 'normal',
                  letterSpacing: '0.05em'
                }}
              >
                <Shuffle text="PCB Design &" className="block" />
                <Shuffle text="Hardware Prototyping" className="block" delay={200} />
              </h1>
            </motion.div>
            <StaggerText 
              text="Electronics engineer specializing in high-speed board design, embedded firmware, and rapid prototyping using KiCad, C++, and Python."
              className="text-xl text-muted-foreground max-w-2xl"
              delay={0.4}
            />
          </div>

          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link to="/projects">
              <MagneticButton className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg transition-shadow">
                View Work
                <ArrowRight size={16} />
              </MagneticButton>
            </Link>
            <Link to="/contact">
              <MagneticButton className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:shadow-lg transition-shadow">
                Get in Touch
              </MagneticButton>
            </Link>
          </motion.div>

          <motion.div 
            className="pt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {["KiCad", "C++", "Python", "ARM Cortex-M", "High-Speed Design"].map((skill, index) => (
              <motion.span
                key={skill}
                className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full hover:scale-105 transition-transform cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                whileHover={{ y: -2 }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}