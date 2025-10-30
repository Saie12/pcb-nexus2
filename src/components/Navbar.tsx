import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
      setIsCollapsed(scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{
        y: 0,
        height: isCollapsed ? "56px" : "64px",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "navbar-glass border-b border-[#00ff88]/20" : "bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-[#00ff88]/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          animate={{
            height: isCollapsed ? "56px" : "64px",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex justify-between items-center"
        >
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              animate={{
                scale: isCollapsed ? 0.85 : 1,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              whileHover={{ scale: isCollapsed ? 0.9 : 1.05 }}
              className="w-10 h-10 bg-gradient-to-br from-[#00ff88] to-[#0088ff] rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(0,255,136,0.3)] group-hover:shadow-[0_0_30px_rgba(0,255,136,0.5)] transition-all relative overflow-hidden"
            >
              <span className="text-[#0a0a0a] font-bold text-xl relative z-10">S</span>
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-20"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              >
                <svg className="w-full h-full" viewBox="0 0 40 40">
                  <path d="M5,20 L15,20 M25,20 L35,20 M20,5 L20,15 M20,25 L20,35" stroke="#0a0a0a" strokeWidth="1" />
                </svg>
              </motion.div>
            </motion.div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl font-bold text-white overflow-hidden"
                >
                  Saiesh
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Desktop Navigation */}
          <motion.div
            animate={{
              gap: isCollapsed ? "0.125rem" : "0.25rem",
            }}
            transition={{ duration: 0.3 }}
            className="hidden md:flex items-center"
          >
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <motion.div
                  animate={{
                    scale: isCollapsed ? 0.9 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    variant="ghost"
                    size={isCollapsed ? "sm" : "default"}
                    className={`relative interactive-lift ${
                      isActive(link.path)
                        ? "text-[#00BFFF]"
                        : "text-gray-300 hover:text-[#00BFFF]"
                    }`}
                  >
                    {link.name}
                    {isActive(link.path) && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00BFFF] shadow-[0_0_10px_rgba(0,191,255,0.5)]"
                      />
                    )}
                  </Button>
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#111111] border-t border-[#00ff88]/20"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${
                      isActive(link.path)
                        ? "text-[#00BFFF] bg-[#00BFFF]/10"
                        : "text-gray-300"
                    }`}
                  >
                    {link.name}
                  </Button>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}