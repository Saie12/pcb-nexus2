import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";
import Shuffle from "@/components/Shuffle";
import ProjectCarousel from "@/components/ProjectCarousel";

export default function FeaturedProjectsSection() {
  const featuredProjects = useQuery(api.projects.getFeatured);

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
          <Shuffle text="Featured Projects" />
        </h2>
        <motion.p 
          className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Explore my latest work in PCB design, embedded systems, and hardware
          prototyping. Drag to browse through the projects.
        </motion.p>

        {!featuredProjects ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-foreground" />
          </div>
        ) : featuredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No featured projects yet. Check back soon!</p>
          </div>
        ) : (
          <ProjectCarousel projects={featuredProjects} />
        )}
      </div>
    </motion.section>
  );
}