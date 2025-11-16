import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Shuffle from "@/components/Shuffle";
import FlowingMenu from "@/components/FlowingMenu";

export default function AboutSection() {
  const skillsMenuItems = [
    {
      link: "#eda-tools",
      text: "EDA Tools",
      image: "https://upload.wikimedia.org/wikipedia/commons/5/59/KiCad-Logo.svg"
    },
    {
      link: "#design-concepts",
      text: "Design Concepts",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop"
    },
    {
      link: "#microcontrollers",
      text: "Microcontrollers & IDEs",
      image: "https://upload.wikimedia.org/wikipedia/commons/8/82/Atmel_logo.svg"
    },
    {
      link: "#programming",
      text: "Programming",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg"
    },
    {
      link: "#version-control",
      text: "Version Control",
      image: "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png"
    },
    {
      link: "#simulation",
      text: "Simulation & Prototyping",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop"
    }
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

        <div className="grid grid-cols-1 gap-8">
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-card border border-border rounded-xl hover:shadow-lg transition-shadow overflow-hidden">
              <div className="p-6 pb-4">
                <h3 className="text-3xl font-bold text-foreground mb-2">
                  Core Competencies
                </h3>
              </div>
              <div className="w-full" style={{ height: '600px', position: 'relative' }}>
                <FlowingMenu items={skillsMenuItems} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}