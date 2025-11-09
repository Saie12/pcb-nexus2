import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import Shuffle from "@/components/Shuffle";

export default function ServicesSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
          <Shuffle text="What I Offer" />
        </h2>
        <motion.p 
          className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Professional hardware design services from concept to production
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Schematic & PCB Layout",
              description: "Professional multi-layer PCB layouts in KiCad with DFM principles and robust power delivery.",
              icon: "🔌",
            },
            {
              title: "High-Speed Design",
              description: "Controlled impedance traces, matched-length differential pairs, and proper routing for signal integrity.",
              icon: "⚡",
            },
            {
              title: "Firmware Development",
              description: "Clean, efficient firmware in C/C++ for PIC, 8051, and ARM microcontrollers.",
              icon: "💻",
            },
            {
              title: "Prototyping & Bring-up",
              description: "Hands-on assembly, soldering, and functional testing to verify hardware functionality.",
              icon: "🔧",
            },
          ].map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <motion.div
                className="text-4xl mb-4"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {service.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link to="/services">
            <Button
              size="lg"
              variant="outline"
              className="group"
            >
              View All Services
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}