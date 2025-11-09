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
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <Link to={`/projects/${slug}`}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        whileHover={{ 
          z: 50,
          transition: { duration: 0.3 }
        }}
      >
        <Card className="bg-card border-border hover:border-foreground/20 hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer relative">
          {/* 3D Depth Layer - THIS IS THE 3D EFFECT */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              transform: "translateZ(20px)", // 3D depth effect
            }}
          />
          
          <div className="relative h-48 overflow-hidden">
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              style={{
                transform: "translateZ(30px)", // 3D image depth
              }}
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-70" />
            
            {/* Floating particles effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + i * 10}%`,
                  }}
                  animate={{
                    y: [-20, -60],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </div>
          
          <CardContent className="p-6 relative" style={{ transform: "translateZ(40px)" }}>
            <motion.h3 
              className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300"
              style={{ transform: "translateZ(50px)" }} // 3D text depth
            >
              {title}
            </motion.h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{summary}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {technologies.slice(0, 3).map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded border border-border"
                  style={{ transform: `translateZ(${60 + index * 5}px)` }} // 3D tag depth
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: "var(--accent)",
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
            
            <motion.div 
              className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all"
              style={{ transform: "translateZ(70px)" }}
            >
              View Details
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  repeatType: "loop" 
                }}
              >
                <ArrowRight size={16} className="ml-1" />
              </motion.div>
            </motion.div>
          </CardContent>

          {/* Glow effect on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{
              background: "radial-gradient(circle at center, var(--primary) 0%, transparent 70%)",
              opacity: 0.1,
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </Card>
      </motion.div>
    </Link>
  );
}