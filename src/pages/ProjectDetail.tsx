import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Model3DViewer from "@/components/Model3DViewer";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const projects = useQuery(api.projects.list);
  
  const project = projects?.find((p) => p.slug === slug);

  if (!projects) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#00ff88]" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <div className="pt-32 pb-20 px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <Link to="/projects">
            <Button className="bg-[#00ff88] text-[#0a0a0a] hover:bg-[#00ff88]/90">
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/projects">
              <Button
                variant="ghost"
                className="mb-8 text-gray-400 hover:text-[#00ff88] hover:bg-[#00ff88]/10 transition-all"
              >
                <ArrowLeft className="mr-2" size={20} />
                Back to Projects
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {project.title}
            </motion.h1>

            <motion.div 
              className="relative h-96 rounded-2xl overflow-hidden mb-8 border border-[#00ff88]/20 group"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
            </motion.div>

            <motion.p 
              className="text-xl text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {project.summary}
            </motion.p>

            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-white mb-3">
                Key Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1.5 bg-[#00ff88]/10 text-[#00ff88] text-sm rounded-lg border border-[#00ff88]/20 hover:bg-[#00ff88]/20 hover:shadow-[0_0_15px_rgba(0,255,136,0.3)] transition-all cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* 3D Model Viewer - Add this section for High Speed Ethernet Interface, ESP32, and STM32 GPS Tracker */}
            {(project.slug === "high-speed-ethernet-interface" || project.slug === "esp32-dual-relay-wifi-smart-switch" || project.slug === "cellular-enabled-stm32-gps-asset-tracker") && (
              <motion.div
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 flex items-center gap-3">
                    <motion.span 
                      className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#00ff88]/20 to-[#00BFFF]/20 border border-[#00ff88]/40 text-2xl shadow-[0_0_20px_rgba(0,255,136,0.2)]"
                      whileHover={{ 
                        scale: 1.1, 
                        boxShadow: "0 0 30px rgba(0,255,136,0.4)",
                        rotate: 360 
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      🎨
                    </motion.span>
                    Interactive 3D Model
                  </h2>
                  <motion.p 
                    className="text-gray-400 text-lg ml-15"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    Explore the PCB design in full 3D - rotate, zoom, and inspect every detail
                  </motion.p>
                </div>
                <Model3DViewer modelPath="/assets/High_Speed_Ethernet_Interface.glb" />
              </motion.div>
            )}

            <div className="space-y-12 mb-8">
              {/* Concept & Schematics Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <motion.span 
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] text-xl"
                    whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(0,255,136,0.4)" }}
                  >
                    1
                  </motion.span>
                  Concept & Schematics
                </h2>
                
                <div className="space-y-6">
                  {project.concept.split('\n\n').map((paragraph, idx) => {
                    const isBoldSection = paragraph.match(/^\*\*(.+?)\*\*/);
                    
                    if (isBoldSection) {
                      const [title, ...content] = paragraph.split('**');
                      const cleanTitle = title.trim();
                      const cleanContent = content.join('').trim();
                      
                      return (
                        <motion.div 
                          key={idx} 
                          className="bg-[#111111] border border-[#00ff88]/10 rounded-xl p-6 hover:border-[#00ff88]/30 hover:shadow-[0_0_20px_rgba(0,255,136,0.1)] transition-all"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <h3 className="text-lg font-semibold text-[#00ff88] mb-3">
                            {cleanTitle}
                          </h3>
                          <p className="text-gray-400 leading-relaxed">{cleanContent}</p>
                        </motion.div>
                      );
                    }
                    
                    return (
                      <motion.p 
                        key={idx} 
                        className="text-gray-400 leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        {paragraph}
                      </motion.p>
                    );
                  })}
                </div>

                {project.schematicImage && (
                  <motion.div 
                    className="mt-6 rounded-xl overflow-hidden border border-[#00ff88]/20 shadow-[0_0_20px_rgba(0,255,136,0.1)] hover:shadow-[0_0_30px_rgba(0,255,136,0.2)] transition-all group"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={project.schematicImage}
                      alt="Schematic"
                      className="w-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </motion.div>
                )}
              </motion.div>

              {/* PCB Layout Strategy Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <motion.span 
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#0088ff]/10 border border-[#0088ff]/30 text-[#0088ff] text-xl"
                    whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(0,136,255,0.4)" }}
                  >
                    2
                  </motion.span>
                  PCB Layout Strategy
                </h2>
                
                <div className="space-y-6 mb-6">
                  {project.layoutStrategy.split('\n\n').map((paragraph, idx) => {
                    if (paragraph.includes('*') || paragraph.includes('•')) {
                      const items = paragraph.split(/[*•]/).filter(item => item.trim());
                      return (
                        <motion.div 
                          key={idx} 
                          className="bg-[#111111] border border-[#0088ff]/10 rounded-xl p-6 hover:border-[#0088ff]/30 hover:shadow-[0_0_20px_rgba(0,136,255,0.1)] transition-all"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <ul className="space-y-3">
                            {items.map((item, itemIdx) => (
                              <motion.li 
                                key={itemIdx} 
                                className="flex items-start gap-3 text-gray-400"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: itemIdx * 0.05 }}
                              >
                                <span className="text-[#0088ff] mt-1">▸</span>
                                <span className="leading-relaxed">{item.trim()}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      );
                    }
                    
                    return (
                      <motion.p 
                        key={idx} 
                        className="text-gray-400 leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        {paragraph}
                      </motion.p>
                    );
                  })}
                </div>

                {/* PCB Layout Images */}
                {project.pcbLayoutImages && project.pcbLayoutImages.length > 0 && (
                  <motion.div 
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <span className="text-[#0088ff]">📐</span>
                      PCB Layout Views
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.pcbLayoutImages.map((img, index) => (
                        <motion.div
                          key={index}
                          className="rounded-xl overflow-hidden border border-[#0088ff]/20 shadow-[0_0_20px_rgba(0,136,255,0.1)] hover:shadow-[0_0_30px_rgba(0,136,255,0.2)] transition-all group cursor-pointer"
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                        >
                          <img 
                            src={img} 
                            alt={`PCB Layout ${index + 1}`} 
                            className="w-full transition-transform duration-500 group-hover:scale-110" 
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 3D View Images */}
                {project.view3dImages && project.view3dImages.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <span className="text-[#0088ff]">🎨</span>
                      3D Rendered Views
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.view3dImages.map((img, index) => (
                        <motion.div
                          key={index}
                          className="rounded-xl overflow-hidden border border-[#0088ff]/20 shadow-[0_0_20px_rgba(0,136,255,0.1)] hover:shadow-[0_0_30px_rgba(0,136,255,0.2)] transition-all group cursor-pointer"
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                        >
                          <img 
                            src={img} 
                            alt={`3D View ${index + 1}`} 
                            className="w-full transition-transform duration-500 group-hover:scale-110" 
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Challenges & Solutions Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <motion.span 
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#ff0080]/10 border border-[#ff0080]/30 text-[#ff0080] text-xl"
                    whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(255,0,128,0.4)" }}
                  >
                    3
                  </motion.span>
                  Challenges & Solutions
                </h2>
                
                <div className="space-y-6">
                  {project.challenges.split('\n\n').map((paragraph, idx) => {
                    if (paragraph.includes('*') || paragraph.includes('•')) {
                      const items = paragraph.split(/[*•]/).filter(item => item.trim());
                      return (
                        <motion.div 
                          key={idx} 
                          className="bg-[#111111] border border-[#ff0080]/10 rounded-xl p-6 hover:border-[#ff0080]/30 hover:shadow-[0_0_20px_rgba(255,0,128,0.1)] transition-all"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <ul className="space-y-3">
                            {items.map((item, itemIdx) => (
                              <motion.li 
                                key={itemIdx} 
                                className="flex items-start gap-3 text-gray-400"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: itemIdx * 0.05 }}
                              >
                                <span className="text-[#ff0080] mt-1">▸</span>
                                <span className="leading-relaxed">{item.trim()}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      );
                    }
                    
                    return (
                      <motion.div 
                        key={idx} 
                        className="bg-[#111111] border border-[#ff0080]/10 rounded-xl p-6 hover:border-[#ff0080]/30 hover:shadow-[0_0_20px_rgba(255,0,128,0.1)] transition-all"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <p className="text-gray-400 leading-relaxed">{paragraph}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {project.githubUrl && (
                <motion.a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-[#111111] border border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88]/10 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all">
                    <Github className="mr-2" size={20} />
                    View on GitHub
                  </Button>
                </motion.a>
              )}
              {project.demoUrl && (
                <motion.a 
                  href={project.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-[#0088ff] text-white hover:bg-[#0088ff]/90 shadow-[0_0_20px_rgba(0,136,255,0.3)] hover:shadow-[0_0_30px_rgba(0,136,255,0.5)] transition-all">
                    <ExternalLink className="mr-2" size={20} />
                    Live Demo
                  </Button>
                </motion.a>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}