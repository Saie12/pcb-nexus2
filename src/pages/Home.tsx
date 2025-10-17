import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import { motion } from "framer-motion";
import { ArrowRight, Code, Cpu, Zap } from "lucide-react";
import { Link } from "react-router";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-[#111111]">
      <Navbar />

      {/* Hero Section with Animated Background */}
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
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
            >
              {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block">
                  {word.split("").map((char, charIndex) => (
                    <motion.span
                      key={`${wordIndex}-${charIndex}`}
                      variants={charVariants}
                      className={
                        word === "Hardware" || word === "Prototyping"
                          ? "bg-gradient-to-r from-[#00ff88] via-[#00BFFF] to-[#ff0080] bg-clip-text text-transparent"
                          : word === "and"
                          ? "text-[#00BFFF]/60"
                          : ""
                      }
                      style={{ display: "inline-block" }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {wordIndex < words.length - 1 && <span> </span>}
                  {wordIndex === 3 && <br />}
                </span>
              ))}
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

      {/* Featured Projects */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-[#111111]"
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

      <Footer />
    </div>
  );
}