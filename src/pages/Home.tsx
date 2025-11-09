import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import { motion } from "framer-motion";
import { ArrowRight, Code, Cpu, Zap, Download, GitBranch } from "lucide-react";
import { Link } from "react-router";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Shuffle from "@/components/Shuffle";

export default function Home() {
  const featuredProjects = useQuery(api.projects.getFeatured);

  // Animation variants for staggered text reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const headlineText = "Expert PCB Design and Hardware Prototyping";
  const words = headlineText.split(" ");

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
    <div className="min-h-screen bg-[#111111]">
      <Navbar />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated PCB Trace Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M0,100 Q250,50 500,100 T1000,100"
              stroke="#00BFFF"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.path
              d="M0,300 Q250,250 500,300 T1000,300"
              stroke="#00BFFF"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 3, delay: 0.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 40px rgba(0,255,136,0.4)",
                    "0 0 60px rgba(0,191,255,0.6)",
                    "0 0 40px rgba(0,255,136,0.4)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-20 h-20 bg-gradient-to-br from-[#00ff88] via-[#0088ff] to-[#ff0080] rounded-2xl flex items-center justify-center mx-auto"
              >
                <Cpu size={40} className="text-[#0a0a0a]" />
              </motion.div>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Shuffle text="Expert PCB Design" className="block mb-2" />
              <span className="text-[#00BFFF]/60">and</span>
              <br />
              <Shuffle text="Hardware Prototyping" className="block bg-gradient-to-r from-[#00ff88] via-[#00BFFF] to-[#ff0080] bg-clip-text text-transparent" delay={200} />
            </motion.h1>

            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              A detail-oriented electronics engineer specializing in high-speed
              board design, embedded firmware, and rapid prototyping using KiCad,
              C++, and Python.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-[#00BFFF] text-white hover:bg-[#00BFFF]/90 shadow-[0_0_20px_rgba(0,191,255,0.3)] hover:shadow-[0_0_30px_rgba(0,191,255,0.5)] hover:-translate-y-1 font-semibold transition-all duration-300"
                >
                  Discuss Your Project
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link to="/projects">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF]/10 hover:shadow-[0_0_20px_rgba(0,191,255,0.3)] hover:-translate-y-1 transition-all duration-300"
                >
                  View My Work
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Skills Snapshot */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto"
          >
            {[
              { name: "KiCad", icon: Zap },
              { name: "C++", icon: Code },
              { name: "Python", icon: Code },
              { name: "Git", icon: Code },
              { name: "PIC", icon: Cpu },
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-[#1a1a1a] border border-[#00ff88]/20 rounded-xl p-6 text-center hover:border-[#00BFFF] hover:shadow-[0_0_20px_rgba(0,191,255,0.2)] transition-all duration-300 group cursor-pointer"
              >
                <skill.icon className="w-8 h-8 mx-auto mb-3 text-[#00ff88] group-hover:text-[#00BFFF] group-hover:scale-110 transition-all duration-300" />
                <p className="text-white font-medium">{skill.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. Featured Projects */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Featured <span className="text-[#00BFFF]">Projects</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Explore my latest work in PCB design, embedded systems, and hardware
            prototyping
          </p>

          {!featuredProjects ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#00ff88]" />
            </div>
          ) : featuredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400">No featured projects yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                  <ProjectCard
                    title={project.title}
                    summary={project.summary}
                    image={project.heroImage}
                    slug={project.slug}
                    technologies={project.technologies}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* 3. Services Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-[#111111]"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            What I <span className="text-[#00BFFF]">Offer</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Professional hardware design services from concept to production
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Schematic & PCB Layout",
                description: "Professional multi-layer PCB layouts in KiCad with DFM principles and robust power delivery.",
                icon: "🔌",
                color: "#00ff88",
              },
              {
                title: "High-Speed Design",
                description: "Controlled impedance traces, matched-length differential pairs, and proper routing for signal integrity.",
                icon: "⚡",
                color: "#0088ff",
              },
              {
                title: "Firmware Development",
                description: "Clean, efficient firmware in C/C++ for PIC, 8051, and ARM microcontrollers.",
                icon: "💻",
                color: "#ff0080",
              },
              {
                title: "Prototyping & Bring-up",
                description: "Hands-on assembly, soldering, and functional testing to verify hardware functionality.",
                icon: "🔧",
                color: "#00ff88",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-[#1a1a1a] border border-[#00ff88]/20 rounded-xl p-6 hover:border-[#00BFFF] hover:shadow-[0_0_20px_rgba(0,191,255,0.2)] transition-all duration-300 group cursor-pointer"
              >
                <div
                  className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ filter: `drop-shadow(0 0 10px ${service.color}40)` }}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00BFFF] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF]/10 hover:shadow-[0_0_20px_rgba(0,191,255,0.3)] hover:-translate-y-1 transition-all duration-300"
              >
                View All Services
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* 4. About & Tech Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            About <span className="text-[#00BFFF]">Me</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Passionate about turning innovative ideas into functional hardware
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-[#111111] border-[#00ff88]/20 h-full">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold text-white mb-6">
                    Personal Bio
                  </h3>
                  <div className="space-y-4 text-gray-400">
                    <p>
                      I'm a passionate electronics engineer with a deep fascination
                      for turning innovative ideas into functional hardware. My
                      journey in PCB design began with a curiosity about how
                      electronic devices work, and it has evolved into a
                      professional expertise in creating high-quality, reliable
                      circuit boards.
                    </p>
                    <p>
                      With hands-on experience in KiCad, embedded systems
                      programming, and hardware prototyping, I specialize in
                      designing PCBs that meet stringent performance requirements
                      while maintaining manufacturability.
                    </p>
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
              <Card className="bg-[#111111] border-[#00ff88]/20 h-full">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold text-white mb-6">
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
                      >
                        <div className="flex items-start">
                          <div className="w-10 h-10 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                            <skill.icon size={20} className="text-[#00ff88]" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold mb-2">
                              {skill.category}
                            </h4>
                            <ul className="space-y-1">
                              {skill.items.map((item) => (
                                <li key={item} className="text-gray-400 text-sm">
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

      {/* 5. CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-[#111111]"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#00ff88]/10 via-[#0088ff]/10 to-[#ff0080]/10 border border-[#00BFFF]/30 rounded-2xl p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Build Something{" "}
              <span className="bg-gradient-to-r from-[#00ff88] via-[#00BFFF] to-[#ff0080] bg-clip-text text-transparent">
                Amazing
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Have a project idea or looking for a PCB design engineer? I'd love to
              hear from you and discuss how we can work together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-[#00BFFF] text-white hover:bg-[#00BFFF]/90 shadow-[0_0_20px_rgba(0,191,255,0.3)] hover:shadow-[0_0_30px_rgba(0,191,255,0.5)] hover:-translate-y-1 font-semibold transition-all duration-300"
                >
                  Get In Touch
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF]/10 hover:shadow-[0_0_20px_rgba(0,191,255,0.3)] hover:-translate-y-1 transition-all duration-300"
                >
                  <Download className="mr-2" size={20} />
                  Download Resume
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}