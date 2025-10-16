import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

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
          <Link to="/projects">
            <Button
              variant="ghost"
              className="mb-8 text-gray-400 hover:text-[#00ff88]"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Projects
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {project.title}
            </h1>

            <div className="relative h-96 rounded-2xl overflow-hidden mb-8 border border-[#00ff88]/20">
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-xl text-gray-300 mb-8">{project.summary}</p>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-3">
                Key Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-[#00ff88]/10 text-[#00ff88] text-sm rounded-lg border border-[#00ff88]/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-12 mb-8">
              {/* Concept & Schematics Section */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] text-xl">
                    1
                  </span>
                  Concept & Schematics
                </h2>
                
                <div className="space-y-6">
                  {project.concept.split('\n\n').map((paragraph, idx) => {
                    // Check if paragraph starts with a bold marker pattern
                    const isBoldSection = paragraph.match(/^\*\*(.+?)\*\*/);
                    
                    if (isBoldSection) {
                      const [title, ...content] = paragraph.split('**');
                      const cleanTitle = title.trim();
                      const cleanContent = content.join('').trim();
                      
                      return (
                        <div key={idx} className="bg-[#111111] border border-[#00ff88]/10 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-[#00ff88] mb-3">
                            {cleanTitle}
                          </h3>
                          <p className="text-gray-400 leading-relaxed">{cleanContent}</p>
                        </div>
                      );
                    }
                    
                    return (
                      <p key={idx} className="text-gray-400 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                {project.schematicImage && (
                  <div className="mt-6 rounded-xl overflow-hidden border border-[#00ff88]/20 shadow-[0_0_20px_rgba(0,255,136,0.1)]">
                    <img
                      src={project.schematicImage}
                      alt="Schematic"
                      className="w-full"
                    />
                  </div>
                )}
              </div>

              {/* PCB Layout Strategy Section */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#0088ff]/10 border border-[#0088ff]/30 text-[#0088ff] text-xl">
                    2
                  </span>
                  PCB Layout Strategy
                </h2>
                
                <div className="space-y-6 mb-6">
                  {project.layoutStrategy.split('\n\n').map((paragraph, idx) => {
                    if (paragraph.includes('*') || paragraph.includes('•')) {
                      const items = paragraph.split(/[*•]/).filter(item => item.trim());
                      return (
                        <div key={idx} className="bg-[#111111] border border-[#0088ff]/10 rounded-xl p-6">
                          <ul className="space-y-3">
                            {items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-3 text-gray-400">
                                <span className="text-[#0088ff] mt-1">▸</span>
                                <span className="leading-relaxed">{item.trim()}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }
                    
                    return (
                      <p key={idx} className="text-gray-400 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                {/* PCB Layout Images */}
                {project.pcbLayoutImages && project.pcbLayoutImages.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <span className="text-[#0088ff]">📐</span>
                      PCB Layout Views
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.pcbLayoutImages.map((img, index) => (
                        <div
                          key={index}
                          className="rounded-xl overflow-hidden border border-[#0088ff]/20 shadow-[0_0_20px_rgba(0,136,255,0.1)] hover:shadow-[0_0_30px_rgba(0,136,255,0.2)] transition-all group"
                        >
                          <img 
                            src={img} 
                            alt={`PCB Layout ${index + 1}`} 
                            className="w-full group-hover:scale-105 transition-transform duration-300" 
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3D View Images */}
                {project.view3dImages && project.view3dImages.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <span className="text-[#0088ff]">🎨</span>
                      3D Rendered Views
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.view3dImages.map((img, index) => (
                        <div
                          key={index}
                          className="rounded-xl overflow-hidden border border-[#0088ff]/20 shadow-[0_0_20px_rgba(0,136,255,0.1)] hover:shadow-[0_0_30px_rgba(0,136,255,0.2)] transition-all group"
                        >
                          <img 
                            src={img} 
                            alt={`3D View ${index + 1}`} 
                            className="w-full group-hover:scale-105 transition-transform duration-300" 
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Challenges & Solutions Section */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#ff0080]/10 border border-[#ff0080]/30 text-[#ff0080] text-xl">
                    3
                  </span>
                  Challenges & Solutions
                </h2>
                
                <div className="space-y-6">
                  {project.challenges.split('\n\n').map((paragraph, idx) => {
                    // Check for bullet points or list items
                    if (paragraph.includes('*') || paragraph.includes('•')) {
                      const items = paragraph.split(/[*•]/).filter(item => item.trim());
                      return (
                        <div key={idx} className="bg-[#111111] border border-[#ff0080]/10 rounded-xl p-6">
                          <ul className="space-y-3">
                            {items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-3 text-gray-400">
                                <span className="text-[#ff0080] mt-1">▸</span>
                                <span className="leading-relaxed">{item.trim()}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }
                    
                    return (
                      <div key={idx} className="bg-[#111111] border border-[#ff0080]/10 rounded-xl p-6">
                        <p className="text-gray-400 leading-relaxed">{paragraph}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-[#111111] border border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88]/10 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)]">
                    <Github className="mr-2" size={20} />
                    View on GitHub
                  </Button>
                </a>
              )}
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-[#0088ff] text-white hover:bg-[#0088ff]/90 shadow-[0_0_20px_rgba(0,136,255,0.3)]">
                    <ExternalLink className="mr-2" size={20} />
                    Live Demo
                  </Button>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}