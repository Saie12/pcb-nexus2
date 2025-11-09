import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import Shuffle from "@/components/Shuffle";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-24 px-6 sm:px-8 min-h-[80vh] flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-balance">
              <Shuffle text="PCB Design &" className="block" />
              <Shuffle text="Hardware Prototyping" className="block" delay={200} />
            </h1>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Electronics engineer specializing in high-speed board design, 
              embedded firmware, and rapid prototyping using KiCad, C++, and Python.
            </motion.p>
          </div>

          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link to="/projects">
              <Button size="lg" className="gap-2 group">
                View Work
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                Get in Touch
              </Button>
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