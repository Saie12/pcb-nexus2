import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Code, Cpu, Zap, GitBranch } from "lucide-react";
import Shuffle from "@/components/Shuffle";

export default function AboutSection() {
  const skills = [
    {
      category: "EDA Tools",
      items: ["KiCad (Schematic Capture, PCB Layout, 3D Rendering, Gerber Generation)"],
      icon: Cpu,
    },
    {
      category: "Design Concepts",
      items: [
        "High-Speed Design (Impedance Control, Differential Pairs, Length Matching)",
        "EMI/EMC",
        "DFM",
      ],
      icon: Zap,
    },
    {
      category: "Microcontrollers & IDEs",
      items: ["PIC", "8051", "ARM Cortex-M", "MPLAB X IDE", "Keil IDE"],
      icon: Cpu,
    },
    {
      category: "Programming",
      items: ["C", "C++", "Python (for scripting and automation)"],
      icon: Code,
    },
    {
      category: "Version Control & Collaboration",
      items: ["Git", "GitHub", "CadLab"],
      icon: GitBranch,
    },
    {
      category: "Simulation & Prototyping",
      items: ["SPICE", "Soldering (SMD/THT)", "Lab equipment"],
      icon: Zap,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
          <Shuffle text="About Me" />
        </h2>
        <motion.p 
          className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Passionate about turning innovative ideas into functional hardware
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card border-border h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold text-foreground mb-6">
                  Personal Bio
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    I'm a passionate electronics engineer with a deep fascination
                    for turning innovative ideas into functional hardware. My
                    journey in PCB design began with a curiosity about how
                    electronic devices work, and it has evolved into a
                    professional expertise in creating high-quality, reliable
                    circuit boards.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    With hands-on experience in KiCad, embedded systems
                    programming, and hardware prototyping, I specialize in
                    designing PCBs that meet stringent performance requirements
                    while maintaining manufacturability.
                  </motion.p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-card border-border h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold text-foreground mb-6">
                  Core Competencies
                </h3>
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.category}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-start">
                        <motion.div 
                          className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center mr-3 flex-shrink-0"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <skill.icon size={20} className="text-foreground" />
                        </motion.div>
                        <div>
                          <h4 className="text-foreground font-semibold mb-2">
                            {skill.category}
                          </h4>
                          <ul className="space-y-1">
                            {skill.items.map((item) => (
                              <li key={item} className="text-muted-foreground text-sm">
                                • {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}