import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  summary: string;
  image: string;
  slug: string;
  technologies: string[];
}

export default function ProjectCard({
  title,
  summary,
  image,
  slug,
  technologies,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/projects/${slug}`}>
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        <motion.div
          animate={{
            rotateX: isHovered ? -5 : 0,
            rotateY: isHovered ? 5 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <Card className="bg-[#1a1a1a] border-[#00ff88]/20 hover:border-[#00BFFF] hover:shadow-[0_0_25px_rgba(0,191,255,0.3)] transition-all duration-300 overflow-hidden group cursor-pointer relative">
            {/* 3D Depth Layer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/5 via-transparent to-[#00BFFF]/5 pointer-events-none"
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              style={{
                transform: "translateZ(20px)",
              }}
            />

            <div className="relative h-48 overflow-hidden">
              <motion.img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
                animate={{
                  scale: isHovered ? 1.15 : 1,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent opacity-60" />
              
              {/* Animated Grid Overlay */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-20"
                animate={{
                  opacity: isHovered ? 0.2 : 0,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  backgroundImage: `
                    linear-gradient(0deg, transparent 24%, rgba(0, 255, 136, 0.3) 25%, rgba(0, 255, 136, 0.3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 136, 0.3) 75%, rgba(0, 255, 136, 0.3) 76%, transparent 77%, transparent),
                    linear-gradient(90deg, transparent 24%, rgba(0, 255, 136, 0.3) 25%, rgba(0, 255, 136, 0.3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 136, 0.3) 75%, rgba(0, 255, 136, 0.3) 76%, transparent 77%, transparent)
                  `,
                  backgroundSize: "50px 50px",
                }}
              />
            </div>

            <CardContent className="p-6 relative" style={{ transform: "translateZ(30px)" }}>
              <motion.h3
                className="text-xl font-bold text-white mb-2 group-hover:text-[#00BFFF] transition-colors duration-300"
                animate={{
                  x: isHovered ? 5 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                {title}
              </motion.h3>
              
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{summary}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {technologies.slice(0, 3).map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="px-2 py-1 bg-[#00ff88]/10 text-[#00ff88] text-xs rounded border border-[#00ff88]/20 hover:bg-[#00ff88]/20 transition-colors"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
              
              <motion.div
                className="flex items-center text-[#00BFFF] text-sm font-medium"
                animate={{
                  x: isHovered ? 5 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                View Details
                <motion.div
                  animate={{
                    x: isHovered ? 5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight size={16} className="ml-1" />
                </motion.div>
              </motion.div>
            </CardContent>

            {/* Corner Accent */}
            <motion.div
              className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#00BFFF]/20 to-transparent pointer-events-none"
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.5,
              }}
              transition={{ duration: 0.3 }}
              style={{
                clipPath: "polygon(100% 0, 0 0, 100% 100%)",
              }}
            />
          </Card>
        </motion.div>
      </motion.div>
    </Link>
  );
}