import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProjectCarousel from "@/components/ProjectCarousel";
import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";

export default function Projects() {
  const projects = useQuery(api.projects.list);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-foreground mb-6">
              My <span className="text-primary">Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A showcase of my PCB design work, embedded systems projects, and
              hardware prototypes demonstrating technical expertise and
              problem-solving abilities. Drag to explore.
            </p>
          </motion.div>

          {!projects ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No projects yet. Check back soon!</p>
            </div>
          ) : (
            <ProjectCarousel projects={projects} />
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}