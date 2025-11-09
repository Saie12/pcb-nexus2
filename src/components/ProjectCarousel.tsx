import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ProjectCard from "@/components/ProjectCard";

interface Project {
  _id: string;
  title: string;
  summary: string;
  heroImage: string;
  slug: string;
  technologies: string[];
}

interface ProjectCarouselProps {
  projects: Project[];
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    if (containerRef.current) {
      const updateWidth = () => {
        if (containerRef.current) {
          setContainerWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
        }
      };
      updateWidth();
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }
  }, [projects]);

  const handleDragEnd = () => {
    const currentX = x.get();
    if (currentX > 0) {
      animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
    } else if (currentX < -containerWidth) {
      animate(x, -containerWidth, { type: "spring", stiffness: 300, damping: 30 });
    }
  };

  return (
    <div className="relative overflow-hidden">
      <motion.div
        ref={containerRef}
        className="flex gap-6 cursor-grab active:cursor-grabbing py-4"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -containerWidth, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
            className="min-w-[350px] md:min-w-[400px]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
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
      </motion.div>
      
      {/* Gradient overlays for visual cue */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </div>
  );
}
