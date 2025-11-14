import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import GooeyNav from "@/components/GooeyNav";

export default function Navbar() {
  const location = useLocation();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"]
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

  const navItems = [
    { label: "Work", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const getActiveIndex = () => {
    const index = navItems.findIndex(item => item.href === location.pathname);
    return index >= 0 ? index : 0;
  };

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
        className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/3 to-transparent pointer-events-none"
        style={{
          opacity: useTransform(scrollY, [0, 100], [0, 1]),
        }}
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-lg font-semibold tracking-tight relative z-10 text-white">
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Saiesh Sasane
            </motion.span>
          </Link>

          <div className="hidden md:flex items-center relative z-10">
            <GooeyNav
              items={navItems}
              particleCount={15}
              particleDistances={[90, 10]}
              particleR={100}
              initialActiveIndex={getActiveIndex()}
              animationTime={600}
              timeVariance={300}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
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