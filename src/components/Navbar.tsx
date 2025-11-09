import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Briefcase, User, Mail, FolderOpen } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.72)"]
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(20px)"]
  );

  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.18]);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const navLinks = [
    { name: "Work", path: "/projects", icon: FolderOpen },
    { name: "Services", path: "/services", icon: Briefcase },
    { name: "About", path: "/about", icon: User },
    { name: "Contact", path: "/contact", icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ 
        backgroundColor,
        backdropFilter: backdropBlur,
        WebkitBackdropFilter: backdropBlur,
        borderBottomColor: useTransform(borderOpacity, (o) => `rgba(0, 0, 0, ${o})`),
        boxShadow: useTransform(
          scrollY,
          [0, 100],
          ["0 0 0 0 rgba(0, 0, 0, 0)", "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"]
        ),
      }}
    >
      {/* Glassmorphism overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/40 pointer-events-none"
        style={{
          opacity: useTransform(scrollY, [0, 100], [0, 1]),
        }}
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-lg font-semibold tracking-tight relative z-10">
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Saiesh Sasane
            </motion.span>
          </Link>

          <div className="hidden md:flex items-center gap-1 relative z-10">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.path} to={link.path}>
                  <Button
                    variant="ghost"
                    className={`relative flex items-center gap-2 transition-all duration-200 ${
                      isActive(link.path)
                        ? "text-foreground bg-secondary/50"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                    }`}
                  >
                    <Icon size={16} className="opacity-70" />
                    {link.name}
                    {isActive(link.path) && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-px bg-foreground"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="md:hidden relative z-10">
            <Button variant="ghost" size="sm">
              Menu
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground origin-left"
        style={{
          scaleX: useTransform(scrollY, [0, 1000], [0, 1]),
        }}
      />
    </motion.nav>
  );
}